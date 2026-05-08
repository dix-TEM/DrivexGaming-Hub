import { AccountNav } from "@/components/account/account-nav";
import { OrderSummaryCard } from "@/components/account/order-summary-card";
import { getUserOrders, requireActiveUser } from "@/server/services/account.service";

export default async function AccountOrdersPage() {
  const user = await requireActiveUser();
  const orders = await getUserOrders(user.id);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AccountNav />
        <section className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-200">Order history</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Your orders</h1>
          <p className="mt-3 text-slate-400">Only orders owned by your account are shown here.</p>
        </section>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderSummaryCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
            <h2 className="text-xl font-black text-white">No orders found</h2>
            <p className="mt-2 text-slate-400">Your orders will appear here after checkout.</p>
          </div>
        )}
      </div>
    </main>
  );
}
