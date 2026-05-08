import Link from "next/link";
import type { Category, Product } from "@prisma/client";

import { formatMoney } from "@/lib/money";
import { StatusPill } from "@/components/storefront/status-pill";

type ProductCardProps = {
  product: Product & { category?: Category | null };
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl shadow-black/30 transition hover:-translate-y-1 hover:border-cyan-300/50">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-950/40 to-fuchsia-950/40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.2),transparent_35%)]" />
          <span className="relative text-5xl">💎</span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">{product.gameName}</p>
            <h3 className="mt-2 text-lg font-bold leading-tight text-white">{product.name}</h3>
          </div>
          <StatusPill status={product.stockStatus} />
        </div>

        <p className="text-sm text-slate-400">Delivery: {product.estimatedDeliveryTime ?? "Manual review"}</p>

        <div className="mt-auto pt-5">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500">Starting from</p>
              <p className="text-2xl font-black text-white">{formatMoney(product.consumerPrice.toString(), "MMK")}</p>
            </div>
          </div>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </article>
  );
}
