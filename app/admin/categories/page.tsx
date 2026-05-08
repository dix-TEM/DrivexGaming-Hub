import Link from "next/link";

import { CategoryTable } from "@/components/admin/catalog/category-table";
import { getAdminCategories } from "@/server/services/admin-catalog.service";

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">Catalog</p>
          <h1 className="mt-2 text-3xl font-black text-white">Categories</h1>
          <p className="mt-2 text-sm text-slate-400">Manage storefront game categories, image URLs, active status, and sort order.</p>
        </div>
        <Link href="/admin/categories/new" className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300">
          New category
        </Link>
      </div>

      <CategoryTable categories={categories} />
    </div>
  );
}
