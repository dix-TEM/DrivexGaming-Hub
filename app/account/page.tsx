import Link from "next/link";

import { AccountNav } from "@/components/account/account-nav";
import { DashboardStatCard } from "@/components/account/dashboard-stat-card";
import { OrderSummaryCard } from "@/components/account/order-summary-card";
import { getAccountOverview, requireActiveUser } from "@/server/services/account.service";

export default async function AccountPage() {
  const user = await requireActiveUser();
  const overview = await getAccountOverview(user.id);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AccountNav />

        <section className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-200">Account dashboard</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Welcome back, {user.name}</h1>
          <p className="mt-4 max-w-2xl text-slate-400">Track your orders, update your profile, and contact support from one secure account area.</p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardStatCard label="Total orders" value={overview.totalOrders} />
          <DashboardStatCard label="Pending orders" value={overview.pendingOrders} helper="Payment review or processing" />
          <DashboardStatCard label="Completed orders" value={overview.completedOrders} />
          <DashboardStatCard label="Support tickets" value={overview.supportTickets} />
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black">Recent orders</h2>
              <p className="mt-1 text-sm text-slate-400">Your latest GameTopUp Hub purchases.</p>
            </div>
            <Link href="/account/orders" className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-bold text-cyan-100 hover:bg-white/10">
              View all
            </Link>
          </div>

          {overview.recentOrders.length > 0 ? (
            <div className="space-y-4">
              {overview.recentOrders.map((order) => (
                <OrderSummaryCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
              <h3 className="text-xl font-black text-white">No orders yet</h3>
              <p className="mt-2 text-slate-400">Browse products and place your first order.</p>
              <Link href="/games" className="mt-5 inline-flex rounded-2xl bg-cyan-300 px-5 py-3 font-black text-slate-950 hover:bg-cyan-200">
                Browse games
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
