import Link from "next/link";

const navItems = [
  { href: "/reseller", label: "Dashboard" },
  { href: "/reseller/products", label: "Products" },
  { href: "/reseller/create-order", label: "Create Order" },
  { href: "/reseller/bulk-order", label: "Bulk Orders" },
  { href: "/reseller/orders", label: "Orders" },
  { href: "/reseller/wallet", label: "Wallet" },
  { href: "/reseller/customers", label: "Customers" },
  { href: "/reseller/reports", label: "Reports" },
  { href: "/reseller/settings", label: "Settings" },
];

export function ResellerSidebar() {
  return (
    <aside className="hidden min-h-screen w-72 border-r border-white/10 bg-slate-950/95 p-5 lg:block">
      <Link href="/reseller" className="block rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-4">
        <p className="text-lg font-black text-white">GameTopUp Hub</p>
        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Reseller Panel</p>
      </Link>

      <nav className="mt-6 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/[0.06] hover:text-white">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
