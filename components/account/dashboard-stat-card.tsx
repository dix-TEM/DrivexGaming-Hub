type DashboardStatCardProps = {
  label: string;
  value: number | string;
  helper?: string;
};

export function DashboardStatCard({ label, value, helper }: DashboardStatCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
      <p className="text-sm font-semibold text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-black text-white">{value}</p>
      {helper ? <p className="mt-2 text-xs font-medium text-slate-500">{helper}</p> : null}
    </div>
  );
}
