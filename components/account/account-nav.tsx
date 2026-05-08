import Link from "next/link";

const links = [
  { href: "/account", label: "Overview" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/profile", label: "Profile" },
  { href: "/account/support", label: "Support" },
];

export function AccountNav() {
  return (
    <nav className="mb-8 grid gap-3 sm:grid-cols-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-100"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
