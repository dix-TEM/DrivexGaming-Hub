import Link from "next/link";

import { formatMoney } from "@/lib/money";
import { approvePaymentAction, rejectPaymentAction } from "@/server/actions/admin-order-payment.actions";
import { StatusBadge } from "@/components/admin/orders/status-badge";

export function PaymentReviewTable({ payments }: { payments: any[] }) {
  if (payments.length === 0) {
    return <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-slate-400">No payments found.</div>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-white/[0.04] text-left text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Proof</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {payments.map((payment) => (
              <tr key={payment.id} className="align-top text-slate-200">
                <td className="px-4 py-4">
                  <Link href={`/admin/orders/${payment.order.orderNumber}`} className="font-bold text-cyan-300 hover:text-cyan-200">
                    {payment.order.orderNumber}
                  </Link>
                  <div className="mt-1 text-xs text-slate-500">{new Date(payment.createdAt).toLocaleString()}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="font-medium text-white">{payment.user.name}</div>
                  <div className="text-xs text-slate-400">{payment.user.email}</div>
                </td>
                <td className="px-4 py-4">
                  <div>{payment.order.product.name}</div>
                  <div className="text-xs text-slate-500">{payment.paymentMethod?.name ?? "No method"}</div>
                </td>
                <td className="px-4 py-4 font-bold text-white">{formatMoney(payment.amount.toString())}</td>
                <td className="px-4 py-4">
                  {payment.proofImage ? (
                    <a href={payment.proofImage} target="_blank" rel="noreferrer" className="text-cyan-300 underline underline-offset-4">View proof</a>
                  ) : (
                    <span className="text-slate-500">No proof</span>
                  )}
                </td>
                <td className="px-4 py-4"><StatusBadge status={payment.status} /></td>
                <td className="min-w-72 px-4 py-4">
                  {payment.status === "PENDING" ? (
                    <div className="space-y-3">
                      <form action={approvePaymentAction.bind(null, payment.id)}>
                        <button className="rounded-lg bg-emerald-400 px-3 py-2 text-xs font-black text-slate-950 hover:bg-emerald-300">
                          Approve payment
                        </button>
                      </form>
                      <form action={rejectPaymentAction} className="space-y-2">
                        <input type="hidden" name="paymentId" value={payment.id} />
                        <textarea
                          name="rejectionReason"
                          required
                          placeholder="Rejection reason"
                          className="min-h-20 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white outline-none"
                        />
                        <button className="rounded-lg bg-red-400 px-3 py-2 text-xs font-black text-slate-950 hover:bg-red-300">
                          Reject payment
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400">
                      Reviewed {payment.reviewedAt ? new Date(payment.reviewedAt).toLocaleString() : ""}
                      {payment.rejectionReason ? <div className="mt-2 text-red-200">{payment.rejectionReason}</div> : null}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
