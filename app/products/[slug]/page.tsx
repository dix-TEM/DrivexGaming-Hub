import Link from "next/link";
import { notFound } from "next/navigation";

import { RequiredFieldsList } from "@/components/storefront/required-fields-list";
import { StatusPill } from "@/components/storefront/status-pill";
import { formatMoney } from "@/lib/money";
import { getProductBySlug } from "@/server/services/storefront.service";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || !product.active || !product.category.active) notFound();

  return (
    <section className="mx-auto min-h-[70vh] max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href={`/games/${product.category.slug}`} className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
        ← Back to {product.category.name}
      </Link>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-cyan-950/40 to-fuchsia-950/40 p-8 shadow-2xl shadow-black/30">
          <div className="flex aspect-square items-center justify-center rounded-[1.5rem] border border-white/10 bg-slate-950/70 text-8xl">
            💎
          </div>
        </div>

        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <StatusPill status={product.stockStatus} />
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
              {product.deliveryMethod.replaceAll("_", " ")}
            </span>
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">{product.gameName}</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            {product.description ?? "Secure manual top-up product with payment proof review and order tracking."}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <InfoBox label="Price" value={formatMoney(product.consumerPrice.toString(), "MMK")} />
            <InfoBox label="Delivery" value={product.estimatedDeliveryTime ?? "Manual review"} />
            <InfoBox label="Category" value={product.category.name} />
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-black text-white">Required checkout fields</h2>
            <p className="mt-2 text-sm text-slate-400">These fields will be rendered dynamically in the checkout step.</p>
            <div className="mt-5">
              <RequiredFieldsList value={product.requiredFieldsJson} />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/checkout/${product.slug}`}
              className="rounded-2xl bg-cyan-300 px-6 py-4 text-center font-black text-slate-950 hover:bg-cyan-200"
            >
              Buy Now
            </Link>
            <Link
              href="/track-order"
              className="rounded-2xl border border-white/10 px-6 py-4 text-center font-bold text-white hover:bg-white/10"
            >
              Track an order
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{label}</p>
      <p className="mt-2 font-bold text-white">{value}</p>
    </div>
  );
}
