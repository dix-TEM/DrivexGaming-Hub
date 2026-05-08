import { updateOrderNotesAction } from "@/server/actions/admin-order-payment.actions";

export function OrderNotesForm({ order }: { order: { orderNumber: string; customerNote: string | null; internalNote: string | null } }) {
  return (
    <form action={updateOrderNotesAction} className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <input type="hidden" name="orderNumber" value={order.orderNumber} />
      <div>
        <label className="text-sm font-bold text-white">Customer-visible note</label>
        <p className="mb-2 text-xs text-slate-400">This note can appear on order tracking and account order detail pages.</p>
        <textarea name="customerNote" defaultValue={order.customerNote ?? ""} className="min-h-28 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none" />
      </div>
      <div>
        <label className="text-sm font-bold text-white">Internal admin note</label>
        <p className="mb-2 text-xs text-slate-400">Internal notes must never be shown to consumers or resellers.</p>
        <textarea name="internalNote" defaultValue={order.internalNote ?? ""} className="min-h-28 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none" />
      </div>
      <button className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 hover:bg-cyan-300">Save notes</button>
    </form>
  );
}
