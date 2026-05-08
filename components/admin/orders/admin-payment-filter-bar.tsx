import { PaymentReviewStatus } from "@prisma/client";

export function AdminPaymentFilterBar({ defaultQ, defaultStatus }: { defaultQ?: string; defaultStatus?: string }) {
  return (
    <form className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-4" action="/admin/payments">
      <input
        name="q"
        defaultValue={defaultQ}
        placeholder="Search order, customer name, email"
        className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none md:col-span-2"
      />
      <select name="status" defaultValue={defaultStatus ?? ""} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white">
        <option value="">All review statuses</option>
        {Object.values(PaymentReviewStatus).map((status) => <option key={status} value={status}>{status}</option>)}
      </select>
      <button className="rounded-xl bg-cyan-400 px-4 py-3 text-sm font-black text-slate-950 hover:bg-cyan-300">Filter</button>
    </form>
  );
}
