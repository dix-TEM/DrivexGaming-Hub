const toneMap: Record<string, string> = {
  PAID: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  APPROVED: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  COMPLETED: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  PENDING: "border-amber-300/30 bg-amber-300/10 text-amber-200",
  PAYMENT_REVIEW: "border-amber-300/30 bg-amber-300/10 text-amber-200",
  PROCESSING: "border-cyan-300/30 bg-cyan-300/10 text-cyan-200",
  REJECTED: "border-rose-300/30 bg-rose-300/10 text-rose-200",
  FAILED: "border-rose-300/30 bg-rose-300/10 text-rose-200",
  CANCELLED: "border-slate-300/30 bg-slate-300/10 text-slate-200",
  REFUNDED: "border-fuchsia-300/30 bg-fuchsia-300/10 text-fuchsia-200",
};

export function AdminStatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${toneMap[status] ?? "border-white/10 bg-white/5 text-slate-200"}`}>
      {status.replaceAll("_", " ")}
    </span>
  );
}
