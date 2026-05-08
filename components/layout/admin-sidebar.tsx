import Link from "next/link";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/orders", label: "Orders", icon: "🧾" },
  { href: "/admin/payments", label: "Payments", icon: "💳" },
  { href: "/admin/wallet-deposits", label: "Wallet Deposits", icon: "👛" },
  { href: "/admin/products", label: "Products", icon: "🎮" },
  { href: "/admin/categories", label: "Categories", icon: "🗂️" },
  { href: "/admin/users", label: "Users", icon: "👥" },
  { href: "/admin/resellers", label: "Resellers", icon: "🏪" },
  { href: "/admin/reports", label: "Reports", icon: "📈" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export function AdminSidebar() {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-white/10 bg-slate-950/95 p-5 lg:block">
      <Link href="/admin" className="mb-8 flex items-center gap-3 text-white">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300 text-lg font-black text-slate-950">G</span>
        <div>
          <p className="text-base font-black leading-none">GameTopUp Hub</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Admin</p>
        </div>
      </Link>

      <nav className="space-y-1">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <span className="text-base" aria-hidden="true">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm text-cyan-100">
        <p className="font-bold text-white">Manual operations mode</p>
        <p className="mt-2 text-xs leading-5 text-cyan-100/80">
          Supplier API automation is intentionally disabled for MVP. Review payments and fulfillment manually.
        </p>
      </div>
    </aside>
  );
}
