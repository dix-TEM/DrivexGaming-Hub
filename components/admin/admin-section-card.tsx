import type { ReactNode } from "react";

export function AdminSectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-2xl shadow-black/20">
      <div className="mb-5">
        <h2 className="text-lg font-black text-white">{title}</h2>
        {description ? <p className="mt-1 text-sm text-slate-400">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
