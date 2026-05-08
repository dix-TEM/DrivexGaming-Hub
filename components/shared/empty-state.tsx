export function EmptyState({ title = "No data yet" }: { title?: string }) {
  return <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">{title}</div>;
}
