import Link from "next/link";

export function AdminPlaceholder({
  title,
  description,
  nextStep,
  countLabel,
  count,
}: {
  title: string;
  description: string;
  nextStep: string;
  countLabel?: string;
  count?: number;
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/30 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">Admin module</p>
        <h1 className="mt-3 text-3xl font-black text-white">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>

        {typeof count === "number" && countLabel ? (
          <div className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
            <p className="text-sm font-semibold text-cyan-100">{countLabel}</p>
            <p className="mt-2 text-4xl font-black text-white">{count}</p>
          </div>
        ) : null}

        <div className="mt-8 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-5">
          <p className="font-bold text-amber-100">Next implementation</p>
          <p className="mt-2 text-sm leading-6 text-amber-100/80">{nextStep}</p>
        </div>

        <Link href="/admin" className="mt-8 inline-flex rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 hover:bg-cyan-200">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
