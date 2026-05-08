import Link from "next/link";

import { AdminMetricCard } from "@/components/admin/admin-metric-card";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { PendingPaymentsTable } from "@/components/admin/pending-payments-table";
import { RecentOrdersTable } from "@/components/admin/recent-orders-table";
import { RecentWalletDepositsTable } from "@/components/admin/recent-wallet-deposits-table";
import { TopProductsTable } from "@/components/admin/top-products-table";
import { TopResellersTable } from "@/components/admin/top-resellers-table";
import { formatMoney } from "@/lib/money";
import { getAdminDashboardOverview } from "@/server/services/admin-dashboard.service";

export default async function AdminDashboardPage() {
  const dashboard = await getAdminDashboardOverview();

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-cyan-950/30 to-fuchsia-950/30 p-6 shadow-2xl shadow-black/30 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">GameTopUp Hub Operations</p>
          <h1 className="mt-4 text-3xl font-black text-white sm:text-5xl">Admin Dashboard Foundation</h1>
          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
            Monitor GMV, revenue, gross profit, payment reviews, fulfillment queues, active resellers, and recent platform activity.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/admin/payments" className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 hover:bg-cyan-200">
            Review Payments
          </Link>
          <Link href="/admin/orders" className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">
            Manage Orders
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <AdminMetricCard title="Total GMV" value={formatMoney(dashboard.stats.gmv, "MMK")} description="Sum of valid non-cancelled orders." tone="cyan" />
        <AdminMetricCard title="Total Revenue" value={formatMoney(dashboard.stats.revenue, "MMK")} description="Paid order volume currently recognized." tone="success" />
        <AdminMetricCard title="Gross Profit" value={formatMoney(dashboard.stats.grossProfit, "MMK")} description="Total grossProfit from valid orders." tone="success" />
        <AdminMetricCard title="Orders Today" value={dashboard.stats.ordersToday} description="Orders created since local midnight." />
        <AdminMetricCard title="Pending Reviews" value={dashboard.stats.pendingPaymentReviews} description="Manual payment proofs waiting for admin review." tone="warning" />
        <AdminMetricCard title="Pending Fulfillment" value={dashboard.stats.pendingFulfillment} description="Paid orders that still need delivery processing." tone="warning" />
        <AdminMetricCard title="Completed Orders" value={dashboard.stats.completedOrders} description="Orders marked completed." tone="success" />
        <AdminMetricCard title="Failed Orders" value={dashboard.stats.failedOrders} description="Orders marked failed." tone="danger" />
        <AdminMetricCard title="Active Resellers" value={dashboard.stats.activeResellers} description="Approved active reseller accounts." />
        <AdminMetricCard title="New Users" value={dashboard.stats.newUsers} description="Accounts created in the last 7 days." />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <AdminSectionCard title="Recent Orders" description="Latest platform orders across consumers and resellers.">
          <RecentOrdersTable orders={dashboard.recentOrders} />
        </AdminSectionCard>

        <AdminSectionCard title="Pending Payments" description="Oldest pending manual payment proofs should be reviewed first.">
          <PendingPaymentsTable payments={dashboard.pendingPayments} />
        </AdminSectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <AdminSectionCard title="Top Products" description="Products ranked by valid order GMV.">
          <TopProductsTable products={dashboard.topProducts} />
        </AdminSectionCard>

        <AdminSectionCard title="Top Resellers" description="Reseller orders ranked by valid order GMV.">
          <TopResellersTable resellers={dashboard.topResellers} />
        </AdminSectionCard>

        <AdminSectionCard title="Wallet Deposits" description="Pending reseller wallet top-up requests.">
          <RecentWalletDepositsTable deposits={dashboard.recentWalletDeposits} />
        </AdminSectionCard>
      </section>
    </div>
  );
}
