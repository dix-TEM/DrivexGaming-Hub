import { PublicOrderCard } from "@/components/storefront/public-order-card";
import { getPublicOrderByNumber } from "@/server/services/storefront.service";

export const metadata = {
  title: "Track Order | GameTopUp Hub",
};

export default async function TrackOrderPage({ searchParams }: { searchParams: Promise<{ orderNumber?: string }> }) {
  const params = await searchParams;
  const orderNumber = params.orderNumber?.trim();
  const order = orderNumber ? await getPublicOrderByNumber(orderNumber) : null;

  return (
    <section className="mx-auto min-h-[70vh] max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Track order</p>
        <h1 className="mt-3 text-4xl font-black text-white">Check your order status</h1>
        <p className="mt-4 text-slate-300">
          Enter your order number to view public status details. Internal admin notes and supplier costs are never shown here.
        </p>
      </div>

      <form className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:flex sm:gap-3">
        <input
          name="orderNumber"
          defaultValue={orderNumber ?? ""}
          placeholder="Example: GTH-20260501-ABC123"
          className="min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 text-white outline-none ring-cyan-300/40 placeholder:text-slate-500 focus:ring-4"
        />
        <button className="mt-3 min-h-12 rounded-2xl bg-cyan-300 px-6 font-black text-slate-950 hover:bg-cyan-200 sm:mt-0">
          Track
        </button>
      </form>

      {order ? <PublicOrderCard order={order} /> : null}

      {orderNumber && !order ? (
        <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-6 text-center text-rose-100">
          No public order was found for <span className="font-bold">{orderNumber}</span>. Please check the order number and try again.
        </div>
      ) : null}

      {!orderNumber ? (
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-center text-slate-400">
          After checkout, paste your order number here to view payment, order, and delivery status.
        </div>
      ) : null}
    </section>
  );
}
