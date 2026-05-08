import { StockStatus } from "@prisma/client";

export function ProductFilterBar({
  categories,
  defaultQ,
  defaultCategoryId,
  defaultActive,
  defaultStockStatus,
}: {
  categories: Array<{ id: string; name: string }>;
  defaultQ?: string;
  defaultCategoryId?: string;
  defaultActive?: string;
  defaultStockStatus?: string;
}) {
  return (
    <form className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:grid-cols-[1fr_180px_150px_170px_auto]" action="/admin/products">
      <input
        name="q"
        defaultValue={defaultQ ?? ""}
        placeholder="Search product, slug, game..."
        className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none ring-cyan-400/40 focus:ring-2"
      />

      <select
        name="categoryId"
        defaultValue={defaultCategoryId ?? ""}
        className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none ring-cyan-400/40 focus:ring-2"
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>

      <select
        name="active"
        defaultValue={defaultActive ?? ""}
        className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none ring-cyan-400/40 focus:ring-2"
      >
        <option value="">Any status</option>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>

      <select
        name="stockStatus"
        defaultValue={defaultStockStatus ?? ""}
        className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none ring-cyan-400/40 focus:ring-2"
      >
        <option value="">Any stock</option>
        {Object.values(StockStatus).map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>

      <button className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-white" type="submit">
        Filter
      </button>
    </form>
  );
}
