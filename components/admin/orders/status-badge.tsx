const toneByStatus: Record<string, string> = {
  PENDING: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  UNPAID: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  PENDING_PAYMENT: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  PAYMENT_REVIEW: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  PROCESSING: "border-blue-400/30 bg-blue-400/10 text-blue-200",
  APPROVED: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  PAID: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  COMPLETED: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  DELIVERED: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  REJECTED: "border-red-400/30 bg-red-400/10 text-red-200",
  FAILED: "border-red-400/30 bg-red-400/10 text-red-200",
  CANCELLED: "border-slate-500/40 bg-slate-500/10 text-slate-300",
  REFUNDED: "border-purple-400/30 bg-purple-400/10 text-purple-200",
  NOT_STARTED: "border-slate-500/40 bg-slate-500/10 text-slate-300",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${toneByStatus[status] ?? "border-slate-500/40 bg-slate-500/10 text-slate-300"}`}>
      {status.replaceAll("_", " ")}
    </span>
  );
}
