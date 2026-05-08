import Link from "next/link";

import { ProductFilterBar } from "@/components/admin/catalog/product-filter-bar";
import { ProductTable } from "@/components/admin/catalog/product-table";
import { getAdminProducts, getCategoryOptions } from "@/server/services/admin-catalog.service";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoryId?: string; active?: string; stockStatus?: string }>;
}) {
  const filters = await searchParams;
  const [categories, products] = await Promise.all([
    getCategoryOptions(),
    getAdminProducts(filters),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">Catalog</p>
          <h1 className="mt-2 text-3xl font-black text-white">Products</h1>
          <p className="mt-2 text-sm text-slate-400">Manage product prices, stock status, delivery method, required fields, and storefront visibility.</p>
        </div>
        <Link href="/admin/products/new" className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300">
          New product
        </Link>
      </div>

      <ProductFilterBar
        categories={categories}
        defaultQ={filters.q}
        defaultCategoryId={filters.categoryId}
        defaultActive={filters.active}
        defaultStockStatus={filters.stockStatus}
      />

      <ProductTable products={products} />
    </div>
  );
}
