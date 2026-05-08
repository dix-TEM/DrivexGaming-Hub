import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/storefront/product-card";
import { getProductsByCategorySlug } from "@/server/services/storefront.service";

export default async function GameCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getProductsByCategorySlug(slug);

  if (!category || !category.active) notFound();

  return (
    <section className="mx-auto min-h-[70vh] max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Link href="/games" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
            ← Back to games
          </Link>
          <h1 className="mt-4 text-4xl font-black text-white">{category.name}</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Active products in this category. Product prices and stock status are loaded from Prisma.
          </p>
        </div>
      </div>

      {category.products.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={{ ...product, category }} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center text-slate-400">
          No active products are available in this category yet.
        </div>
      )}
    </section>
  );
}
