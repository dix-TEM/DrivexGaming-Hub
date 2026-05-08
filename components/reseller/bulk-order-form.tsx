"use client";

import { useActionState, useMemo, useState } from "react";

import { formatMoney } from "@/lib/money";
import { createResellerBulkOrdersAction, type BulkOrderActionState } from "@/server/actions/reseller-bulk-order.actions";
import type { BulkOrderProductOption } from "@/server/services/reseller-bulk-order.service";

type BulkOrderDraftRow = {
  productSlug: string;
  quantity: number;
  gameUserId: string;
  gameServerId: string;
  gameCharacterName: string;
  customerPhone: string;
  customerEmail: string;
  sellingPrice: string;
  note: string;
};

const initialState: BulkOrderActionState = { ok: false, message: "" };

const columns = ["productSlug", "quantity", "gameUserId", "gameServerId", "gameCharacterName", "customerPhone", "customerEmail", "sellingPrice", "note"] as const;

function blankRow(defaultProductSlug = ""): BulkOrderDraftRow {
  return {
    productSlug: defaultProductSlug,
    quantity: 1,
    gameUserId: "",
    gameServerId: "",
    gameCharacterName: "",
    customerPhone: "",
    customerEmail: "",
    sellingPrice: "",
    note: "",
  };
}

function parseCsvLine(line: string) {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current.trim());
  return result;
}

function parseCsv(text: string, defaultProductSlug: string) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) return [];

  const first = parseCsvLine(lines[0]).map((item) => item.trim());
  const hasHeader = first.some((item) => columns.includes(item as (typeof columns)[number]));
  const header = hasHeader ? first : [...columns];
  const dataLines = hasHeader ? lines.slice(1) : lines;

  return dataLines.map((line) => {
    const values = parseCsvLine(line);
    const row = blankRow(defaultProductSlug);

    header.forEach((key, index) => {
      if (!columns.includes(key as (typeof columns)[number])) return;
      const value = values[index] ?? "";
      if (key === "quantity") {
        row.quantity = Number(value) > 0 ? Number(value) : 1;
        return;
      }
      row[key as Exclude<(typeof columns)[number], "quantity">] = value;
    });

    return row;
  });
}

function getRowCost(row: BulkOrderDraftRow, productMap: Map<string, BulkOrderProductOption>) {
  const product = productMap.get(row.productSlug);
  if (!product) return 0;
  return Number(product.resellerPrice) * Number(row.quantity || 0);
}

export function BulkOrderForm({ products, walletBalance }: { products: BulkOrderProductOption[]; walletBalance: string }) {
  const defaultProductSlug = products[0]?.slug ?? "";
  const [state, action, pending] = useActionState(createResellerBulkOrdersAction, initialState);
  const [rows, setRows] = useState<BulkOrderDraftRow[]>([blankRow(defaultProductSlug)]);
  const [csvText, setCsvText] = useState("");

  const productMap = useMemo(() => new Map(products.map((product) => [product.slug, product])), [products]);
  const rowsJson = useMemo(() => JSON.stringify(rows.map((row) => ({ ...row, quantity: Number(row.quantity || 1) }))), [rows]);
  const totalCost = useMemo(() => rows.reduce((total, row) => total + getRowCost(row, productMap), 0), [rows, productMap]);
  const walletAfter = Number(walletBalance) - totalCost;

  function updateRow(index: number, patch: Partial<BulkOrderDraftRow>) {
    setRows((current) => current.map((row, rowIndex) => (rowIndex === index ? { ...row, ...patch } : row)));
  }

  async function handleCsvFile(file: File | undefined) {
    if (!file) return;
    const text = await file.text();
    const parsedRows = parseCsv(text, defaultProductSlug);
    if (parsedRows.length > 0) {
      setRows(parsedRows);
      setCsvText(text);
    }
  }

  function importCsvText() {
    const parsedRows = parseCsv(csvText, defaultProductSlug);
    if (parsedRows.length > 0) setRows(parsedRows);
  }

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="rowsJson" value={rowsJson} />

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
          <p className="text-sm font-bold text-slate-400">Rows</p>
          <p className="mt-2 text-2xl font-black text-white">{rows.length}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
          <p className="text-sm font-bold text-slate-400">Wallet balance</p>
          <p className="mt-2 text-2xl font-black text-white">{formatMoney(walletBalance)}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
          <p className="text-sm font-bold text-slate-400">Bulk total</p>
          <p className="mt-2 text-2xl font-black text-cyan-200">{formatMoney(totalCost.toFixed(2))}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
          <p className="text-sm font-bold text-slate-400">After order</p>
          <p className={walletAfter >= 0 ? "mt-2 text-2xl font-black text-emerald-200" : "mt-2 text-2xl font-black text-rose-300"}>{formatMoney(walletAfter.toFixed(2))}</p>
        </div>
      </div>

      <section className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-black text-white">CSV import</h2>
            <p className="mt-1 text-sm text-slate-400">Upload or paste CSV rows. Header is supported.</p>
          </div>
          <a
            className="rounded-2xl border border-cyan-300/30 px-4 py-2 text-center text-sm font-black text-cyan-200 hover:bg-cyan-300/10"
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(columns.join(",") + "\nmlbb-86-diamonds,1,123456,1234,HeroName,09123456789,customer@example.com,2500,First bulk row")}`}
            download="gametopup-bulk-order-template.csv"
          >
            Download template
          </a>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div>
            <label className="text-sm font-bold text-slate-200">CSV file</label>
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={(event) => void handleCsvFile(event.target.files?.[0])}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-200 file:mr-4 file:rounded-xl file:border-0 file:bg-cyan-300 file:px-3 file:py-2 file:font-black file:text-slate-950"
            />
          </div>
          <div>
            <label htmlFor="csvText" className="text-sm font-bold text-slate-200">Paste CSV</label>
            <textarea id="csvText" value={csvText} onChange={(event) => setCsvText(event.target.value)} rows={4} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300" />
            <button type="button" onClick={importCsvText} className="mt-2 rounded-2xl bg-white/10 px-4 py-2 text-sm font-black text-white hover:bg-white/15">Import pasted CSV</button>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-black text-white">Manual rows</h2>
            <p className="mt-1 text-sm text-slate-400">All prices are recalculated server-side at confirmation.</p>
          </div>
          <button type="button" onClick={() => setRows((current) => [...current, blankRow(defaultProductSlug)])} className="rounded-2xl bg-cyan-300 px-4 py-2 text-sm font-black text-slate-950 hover:bg-cyan-200">Add row</button>
        </div>

        <div className="mt-5 space-y-4">
          {rows.map((row, index) => {
            const product = productMap.get(row.productSlug);
            const rowCost = getRowCost(row, productMap);

            return (
              <div key={index} className="rounded-3xl border border-white/10 bg-slate-900/70 p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="font-black text-white">Row {index + 1}</p>
                  <button type="button" disabled={rows.length === 1} onClick={() => setRows((current) => current.filter((_, rowIndex) => rowIndex !== index))} className="rounded-xl border border-rose-300/30 px-3 py-1 text-xs font-black text-rose-200 disabled:cursor-not-allowed disabled:opacity-40">Remove</button>
                </div>

                <div className="grid gap-3 lg:grid-cols-4">
                  <div className="lg:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-slate-400">Product</label>
                    <select value={row.productSlug} onChange={(event) => updateRow(index, { productSlug: event.target.value })} className="mt-1 w-full rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300">
                      {products.map((item) => (
                        <option key={item.id} value={item.slug}>{item.name} - {formatMoney(item.resellerPrice)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-slate-400">Quantity</label>
                    <input type="number" min="1" max="100" value={row.quantity} onChange={(event) => updateRow(index, { quantity: Number(event.target.value) })} className="mt-1 w-full rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-slate-400">Row cost</label>
                    <p className="mt-1 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm font-black text-cyan-100">{formatMoney(rowCost.toFixed(2))}</p>
                  </div>
                </div>

                <div className="mt-3 grid gap-3 lg:grid-cols-4">
                  <input placeholder="Game User ID" value={row.gameUserId} onChange={(event) => updateRow(index, { gameUserId: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300" />
                  <input placeholder="Server ID" value={row.gameServerId} onChange={(event) => updateRow(index, { gameServerId: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300" />
                  <input placeholder="Character name" value={row.gameCharacterName} onChange={(event) => updateRow(index, { gameCharacterName: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300" />
                  <input placeholder="Customer phone" value={row.customerPhone} onChange={(event) => updateRow(index, { customerPhone: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300" />
                  <input placeholder="Customer email" type="email" value={row.customerEmail} onChange={(event) => updateRow(index, { customerEmail: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300" />
                  <input placeholder="Selling price" type="number" min="0" step="0.01" value={row.sellingPrice} onChange={(event) => updateRow(index, { sellingPrice: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300" />
                  <input placeholder="Note" value={row.note} onChange={(event) => updateRow(index, { note: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300 lg:col-span-2" />
                </div>

                {product ? (
                  <p className="mt-3 text-xs text-slate-500">
                    {product.gameName ?? "Game"} - estimated delivery {product.estimatedDeliveryTime ?? "manual review"}. Required fields are validated again on the server.
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      {state.message ? <p className={state.ok ? "rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-4 text-sm font-bold text-emerald-200" : "rounded-2xl border border-rose-300/30 bg-rose-300/10 p-4 text-sm font-bold text-rose-200"}>{state.message}</p> : null}

      {state.rowErrors?.length ? (
        <div className="rounded-3xl border border-rose-300/30 bg-rose-300/10 p-5">
          <p className="font-black text-rose-100">Validation errors</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-rose-200">
            {state.rowErrors.map((error) => <li key={error}>{error}</li>)}
          </ul>
        </div>
      ) : null}

      <button type="submit" disabled={pending || products.length === 0 || walletAfter < 0} className="w-full rounded-2xl bg-cyan-300 px-5 py-4 font-black text-slate-950 hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50">
        {pending ? "Creating bulk orders..." : "Confirm bulk orders and deduct wallet"}
      </button>
    </form>
  );
}
