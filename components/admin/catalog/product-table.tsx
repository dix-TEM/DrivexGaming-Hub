import Link from "next/link";

import { toggleProductActiveAction } from "@/server/actions/admin-catalog.actions";

type ProductTableProps = {
  products: Array<{
    id: string;
    name: string;
    slug: string;
    gameName: string | null;
    consumerPrice: { toString(): string };
    supplierCost: { toString(): string };
    stockStatus: string;
    deliveryMethod: string;
    active: boolean;
    sortOrder: number;
    category: { name: string; slug: string };
  }>;
};

export function ProductTable({ products }: ProductTableProps) {
  if (products.length === 0) {
    return <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center text-slate-400">No products match the current filters.</div>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800 text-sm">
          <thead className="bg-slate-950/60 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Cost</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Delivery</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {products.map((product) => (
              <tr key={product.id} className="text-slate-300">
                <td className="px-4 py-4">
                  <div className="font-semibold text-slate-100">{product.name}</div>
                  <div className="text-xs text-slate-500">{product.slug} · {product.gameName ?? "No game name"}</div>
                </td>
                <td className="px-4 py-4">{product.category.name}</td>
                <td className="px-4 py-4">{product.consumerPrice.toString()}</td>
                <td className="px-4 py-4">{product.supplierCost.toString()}</td>
                <td className="px-4 py-4">{product.stockStatus}</td>
                <td className="px-4 py-4">{product.deliveryMethod}</td>
                <td className="px-4 py-4">
                  <span className={product.active ? "rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300" : "rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300"}>
                    {product.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/products/${product.slug}`} className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800">
                      View
                    </Link>
                    <Link href={`/admin/products/${product.id}/edit`} className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800">
                      Edit
                    </Link>
                    <form action={toggleProductActiveAction.bind(null, product.id)}>
                      <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800" type="submit">
                        {product.active ? "Deactivate" : "Activate"}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
