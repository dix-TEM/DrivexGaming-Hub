import Link from "next/link";
import { notFound } from "next/navigation";
import { StockStatus } from "@prisma/client";

import { CheckoutForm } from "@/components/checkout/checkout-form";
import { StatusPill } from "@/components/storefront/status-pill";
import { formatMoney } from "@/lib/money";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "Checkout | GameTopUp Hub",
};

export default async function CheckoutProductPage({ params }: { params: Promise<{ productSlug: string }> }) {
  const { productSlug } = await params;

  const [product, paymentMethods] = await Promise.all([
    prisma.product.findUnique({
      where: { slug: productSlug },
      include: { category: true },
    }),
    prisma.paymentMethod.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    }),
  ]);

  if (!product || !product.active || !product.category.active) {
    notFound();
  }

  const canOrder = product.stockStatus === StockStatus.IN_STOCK || product.stockStatus === StockStatus.LIMITED;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href={`/products/${product.slug}`} className="text-sm font-bold text-cyan-300 hover:text-cyan-200">
          ← Back to product
        </Link>
        <h1 className="mt-4 text-4xl font-black text-white">Checkout</h1>
        <p className="mt-2 max-w-2xl text-slate-400">Submit your top-up details and upload payment proof. Your order will enter manual payment review.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="h-fit rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-black/30">
          <div className="relative mb-6 flex h-56 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-950/40 to-fuchsia-950/40">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.2),transparent_35%)]" />
            <span className="relative text-7xl">💎</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">{product.gameName}</p>
              <h2 className="mt-2 text-2xl font-black text-white">{product.name}</h2>
              <p className="mt-2 text-sm text-slate-400">{product.category.name}</p>
            </div>
            <StatusPill status={product.stockStatus} />
          </div>

          <dl className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm text-slate-400">Price</dt>
              <dd className="text-2xl font-black text-white">{formatMoney(product.consumerPrice.toString(), "MMK")}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm text-slate-400">Delivery</dt>
              <dd className="text-sm font-bold text-slate-200">{product.estimatedDeliveryTime ?? "Manual review"}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm text-slate-400">Payment</dt>
              <dd className="text-sm font-bold text-slate-200">Manual review</dd>
            </div>
          </dl>

          {!canOrder ? (
            <div className="mt-6 rounded-2xl border border-rose-300/20 bg-rose-300/10 p-4 text-sm text-rose-100">
              This product is currently not available for checkout.
            </div>
          ) : null}
        </aside>

        {canOrder ? (
          <CheckoutForm product={product} paymentMethods={paymentMethods} />
        ) : (
          <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-8 text-center text-slate-300">
            <h2 className="text-2xl font-black text-white">Checkout unavailable</h2>
            <p className="mt-3">Please choose another product or check back later.</p>
            <Link href="/games" className="mt-6 inline-flex rounded-2xl bg-cyan-300 px-5 py-3 font-black text-slate-950 hover:bg-cyan-200">
              Browse games
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
