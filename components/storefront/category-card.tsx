import Link from "next/link";
import type { Category } from "@prisma/client";

type CategoryCardProps = {
  category: Pick<Category, "name" | "slug" | "image"> & { _count?: { products: number } };
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/games/${category.slug}`}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-cyan-950/20 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.07]"
    >
      <div className="flex h-24 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 via-fuchsia-500/10 to-violet-500/20 text-4xl">
        <span aria-hidden="true">🎮</span>
      </div>
      <div className="mt-5">
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-200">{category.name}</h3>
        <p className="mt-1 text-sm text-slate-400">
          {category._count?.products ?? 0} active products
        </p>
      </div>
    </Link>
  );
}
