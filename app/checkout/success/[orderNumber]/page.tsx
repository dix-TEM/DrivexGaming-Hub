import Link from "next/link";
import { notFound } from "next/navigation";

import { PublicOrderCard } from "@/components/storefront/public-order-card";
import { getPublicOrderByNumber } from "@/server/services/storefront.service";

export const metadata = {
  title: "Order Submitted | GameTopUp Hub",
};

export default async function CheckoutSuccessPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params;
  const order = await getPublicOrderByNumber(orderNumber);

  if (!order) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-8 text-center shadow-2xl shadow-black/30">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-200">Order submitted</p>
        <h1 className="mt-3 text-4xl font-black text-white">Your payment is being reviewed.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Keep your order number safe. We will process your order after the payment proof has been approved.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={`/track-order?orderNumber=${encodeURIComponent(order.orderNumber)}`} className="rounded-2xl bg-cyan-300 px-5 py-3 font-black text-slate-950 hover:bg-cyan-200">
            Track this order
          </Link>
          <Link href="/games" className="rounded-2xl border border-white/10 px-5 py-3 font-bold text-white hover:border-cyan-300/40">
            Continue shopping
          </Link>
        </div>
      </div>

      <PublicOrderCard order={order} />
    </section>
  );
}
