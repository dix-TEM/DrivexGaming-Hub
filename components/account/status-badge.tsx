type StatusBadgeProps = {
  label: string;
};

export function StatusBadge({ label }: StatusBadgeProps) {
  const normalized = label.replaceAll("_", " ").toLowerCase();

  return (
    <span className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-100">
      {normalized}
    </span>
  );
}
