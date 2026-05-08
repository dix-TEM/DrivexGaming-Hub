export function AdminMetricCard({
  title,
  value,
  description,
  tone = "default",
}: {
  title: string;
  value: string | number;
  description: string;
  tone?: "default" | "success" | "warning" | "danger" | "cyan";
}) {
  const toneClass = {
    default: "border-white/10 bg-slate-950/80",
    success: "border-emerald-300/20 bg-emerald-300/10",
    warning: "border-amber-300/20 bg-amber-300/10",
    danger: "border-rose-300/20 bg-rose-300/10",
    cyan: "border-cyan-300/20 bg-cyan-300/10",
  }[tone];

  return (
    <article className={`rounded-3xl border p-5 shadow-2xl shadow-black/20 ${toneClass}`}>
      <p className="text-sm font-semibold text-slate-400">{title}</p>
      <p className="mt-3 text-2xl font-black text-white sm:text-3xl">{value}</p>
      <p className="mt-2 text-xs leading-5 text-slate-400">{description}</p>
    </article>
  );
}
