import { AdminPaymentFilterBar } from "@/components/admin/orders/admin-payment-filter-bar";
import { PaymentReviewTable } from "@/components/admin/orders/payment-review-table";
import { StatusBadge } from "@/components/admin/orders/status-badge";
import { getAdminPayments, getPaymentReviewCounts } from "@/server/services/admin-order-payment.service";

export default async function AdminPaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const filters = await searchParams;
  const [payments, counts] = await Promise.all([
    getAdminPayments(filters),
    getPaymentReviewCounts(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">Operations</p>
        <h1 className="mt-2 text-3xl font-black text-white">Payment Review</h1>
        <p className="mt-2 text-sm text-slate-400">Review manual payment proofs, approve valid payments, and reject invalid submissions with customer-visible reasons.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between"><span className="text-sm text-slate-400">Pending</span><StatusBadge status="PENDING" /></div>
          <div className="mt-3 text-3xl font-black text-white">{counts.pending}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between"><span className="text-sm text-slate-400">Approved</span><StatusBadge status="APPROVED" /></div>
          <div className="mt-3 text-3xl font-black text-white">{counts.approved}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between"><span className="text-sm text-slate-400">Rejected</span><StatusBadge status="REJECTED" /></div>
          <div className="mt-3 text-3xl font-black text-white">{counts.rejected}</div>
        </div>
      </div>

      <AdminPaymentFilterBar defaultQ={filters.q} defaultStatus={filters.status} />
      <PaymentReviewTable payments={payments} />
    </div>
  );
}
