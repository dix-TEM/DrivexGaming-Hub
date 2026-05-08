const items = [
  ["Fast delivery", "Manual fulfillment queues keep top-up requests organized and visible."],
  ["Secure payment review", "Every payment proof is reviewed before order processing."],
  ["Trusted reseller system", "Wholesale pricing and wallet-based ordering are ready for reseller phases."],
  ["Order tracking", "Customers can track status by order number without seeing private admin notes."],
  ["Local payment support", "Bank transfer, mobile wallet, USDT, and manual payment methods are supported."],
];

export function TrustGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map(([title, description]) => (
        <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200">✓</div>
          <h3 className="font-bold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
        </div>
      ))}
    </div>
  );
}
