"use client";

import { DeliveryMethod, StockStatus } from "@prisma/client";
import { useActionState } from "react";

import { createProductAction, updateProductAction } from "@/server/actions/admin-catalog.actions";

type ProductFormProps = {
  product?: {
    id: string;
    categoryId: string;
    name: string;
    slug: string;
    gameName: string | null;
    image: string | null;
    description: string | null;
    consumerPrice: { toString(): string };
    supplierCost: { toString(): string };
    stockStatus: StockStatus;
    deliveryMethod: DeliveryMethod;
    estimatedDeliveryTime: string | null;
    requiredFieldsJson: unknown;
    active: boolean;
    sortOrder: number;
  };
  categories: Array<{
    id: string;
    name: string;
    active: boolean;
  }>;
};

const initialState = { ok: true, message: "" };

const defaultRequiredFields = JSON.stringify(
  [
    { key: "gameUserId", label: "Game User ID", type: "text", required: true },
    { key: "gameServerId", label: "Server ID", type: "text", required: false },
  ],
  null,
  2,
);

function jsonValue(value: unknown) {
  if (!value) return defaultRequiredFields;
  return JSON.stringify(value, null, 2);
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const action = product ? updateProductAction.bind(null, product.id) : createProductAction;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
      {!state.ok && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {state.message}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Product name</span>
          <input name="name" required defaultValue={product?.name ?? ""} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/40 focus:ring-2" placeholder="MLBB 86 Diamonds" />
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Slug</span>
          <input name="slug" required defaultValue={product?.slug ?? ""} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/40 focus:ring-2" placeholder="mlbb-86-diamonds" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Category</span>
          <select name="categoryId" required defaultValue={product?.categoryId ?? ""} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/40 focus:ring-2">
            <option value="" disabled>Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}{category.active ? "" : " (inactive)"}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Game name</span>
          <input name="gameName" defaultValue={product?.gameName ?? ""} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/40 focus:ring-2" placeholder="Mobile Legends: Bang Bang" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Consumer price</span>
          <input name="consumerPrice" required inputMode="decimal" defaultValue={product?.consumerPrice.toString() ?? "0.00"} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/40 focus:ring-2" />
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Supplier cost</span>
          <input name="supplierCost" required inputMode="decimal" defaultValue={product?.supplierCost.toString() ?? "0.00"} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/40 focus:ring-2" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Stock status</span>
          <select name="stockStatus" defaultValue={product?.stockStatus ?? StockStatus.IN_STOCK} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/40 focus:ring-2">
            {Object.values(StockStatus).map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Delivery method</span>
          <select name="deliveryMethod" defaultValue={product?.deliveryMethod ?? DeliveryMethod.MANUAL} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/40 focus:ring-2">
            {Object.values(DeliveryMethod).map((method) => <option key={method} value={method}>{method}</option>)}
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Image URL</span>
          <input name="image" defaultValue={product?.image ?? ""} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/40 focus:ring-2" placeholder="/images/products/mlbb-86-diamonds.png" />
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Estimated delivery time</span>
          <input name="estimatedDeliveryTime" defaultValue={product?.estimatedDeliveryTime ?? ""} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/40 focus:ring-2" placeholder="5-15 minutes" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_160px]">
        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Description</span>
          <textarea name="description" rows={4} defaultValue={product?.description ?? ""} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/40 focus:ring-2" placeholder="Product description" />
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Sort order</span>
          <input name="sortOrder" type="number" min="0" defaultValue={product?.sortOrder ?? 0} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/40 focus:ring-2" />
        </label>
      </div>

      <label className="space-y-2 text-sm">
        <span className="text-slate-300">Required fields JSON</span>
        <textarea name="requiredFieldsJson" rows={9} defaultValue={jsonValue(product?.requiredFieldsJson)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-xs text-slate-100 outline-none ring-cyan-400/40 focus:ring-2" />
        <span className="text-xs text-slate-500">Must be a JSON array. Each field should include key, label, type, and required.</span>
      </label>

      <label className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
        <input name="active" type="checkbox" defaultChecked={product?.active ?? true} className="h-4 w-4 rounded border-slate-700" />
        Active product
      </label>

      <div className="flex items-center justify-end gap-3">
        <a href="/admin/products" className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800">Cancel</a>
        <button type="submit" disabled={pending} className="rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60">
          {pending ? "Saving..." : product ? "Update product" : "Create product"}
        </button>
      </div>
    </form>
  );
}
