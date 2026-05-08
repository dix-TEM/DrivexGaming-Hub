import Link from "next/link";

import { toggleCategoryActiveAction } from "@/server/actions/admin-catalog.actions";

type CategoryTableProps = {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    image: string | null;
    active: boolean;
    sortOrder: number;
    _count: { products: number };
  }>;
};

export function CategoryTable({ categories }: CategoryTableProps) {
  if (categories.length === 0) {
    return <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center text-slate-400">No categories yet.</div>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800 text-sm">
          <thead className="bg-slate-950/60 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Products</th>
              <th className="px-4 py-3">Sort</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {categories.map((category) => (
              <tr key={category.id} className="text-slate-300">
                <td className="px-4 py-4 font-semibold text-slate-100">{category.name}</td>
                <td className="px-4 py-4 text-slate-400">{category.slug}</td>
                <td className="px-4 py-4">{category._count.products}</td>
                <td className="px-4 py-4">{category.sortOrder}</td>
                <td className="px-4 py-4">
                  <span className={category.active ? "rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300" : "rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300"}>
                    {category.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/categories/${category.id}/edit`} className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800">
                      Edit
                    </Link>
                    <form action={toggleCategoryActiveAction.bind(null, category.id)}>
                      <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800" type="submit">
                        {category.active ? "Deactivate" : "Activate"}
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
