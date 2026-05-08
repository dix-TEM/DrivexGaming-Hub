import {
  cancelOrderAction,
  completeOrderAction,
  failOrderAction,
  refundOrderAction,
} from "@/server/actions/admin-order-payment.actions";

export function OrderManagementForms({ orderNumber, proofOfDelivery }: { orderNumber: string; proofOfDelivery?: string | null }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <form action={completeOrderAction} className="space-y-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-5">
        <input type="hidden" name="orderNumber" value={orderNumber} />
        <h3 className="text-lg font-black text-white">Complete order</h3>
        <input
          name="proofOfDelivery"
          defaultValue={proofOfDelivery ?? ""}
          placeholder="Proof of delivery URL or note"
          className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
        />
        <textarea
          name="customerNote"
          placeholder="Optional customer-visible completion note"
          className="min-h-20 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
        />
        <button className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 hover:bg-emerald-300">Mark completed</button>
      </form>

      <form action={failOrderAction} className="space-y-3 rounded-2xl border border-red-400/20 bg-red-400/[0.04] p-5">
        <input type="hidden" name="orderNumber" value={orderNumber} />
        <h3 className="text-lg font-black text-white">Fail order</h3>
        <textarea
          name="failureReason"
          required
          placeholder="Internal failure reason"
          className="min-h-28 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
        />
        <button className="rounded-xl bg-red-400 px-5 py-3 text-sm font-black text-slate-950 hover:bg-red-300">Mark failed</button>
      </form>

      <form action={cancelOrderAction} className="space-y-3 rounded-2xl border border-slate-500/30 bg-white/[0.03] p-5">
        <input type="hidden" name="orderNumber" value={orderNumber} />
        <h3 className="text-lg font-black text-white">Cancel order</h3>
        <textarea
          name="cancelReason"
          required
          placeholder="Cancellation reason"
          className="min-h-24 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
        />
        <button className="rounded-xl border border-slate-400/30 px-5 py-3 text-sm font-black text-slate-200 hover:bg-white/10">Cancel order</button>
      </form>

      <form action={refundOrderAction} className="space-y-3 rounded-2xl border border-purple-400/20 bg-purple-400/[0.04] p-5">
        <input type="hidden" name="orderNumber" value={orderNumber} />
        <h3 className="text-lg font-black text-white">Manual refund marker</h3>
        <p className="text-xs text-slate-400">This marks the order as refunded. Actual money movement must be handled separately for MVP.</p>
        <textarea
          name="refundReason"
          required
          placeholder="Refund reason"
          className="min-h-20 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
        />
        <button className="rounded-xl bg-purple-400 px-5 py-3 text-sm font-black text-slate-950 hover:bg-purple-300">Mark refunded</button>
      </form>
    </div>
  );
}
