import Link from "next/link";

import { LogoutButton } from "@/components/auth/logout-button";
import { auth } from "@/lib/auth";

const publicLinks = [
  { href: "/games", label: "Games" },
  { href: "/track-order", label: "Track" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export async function SiteHeader() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-lg font-black text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950">G</span>
          <span className="hidden sm:inline">GameTopUp Hub</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-slate-300 md:flex">
          {publicLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-cyan-200">
              {link.label}
            </Link>
          ))}
          {user?.role === "ADMIN" ? <Link href="/admin" className="hover:text-cyan-200">Admin</Link> : null}
          {user?.role === "RESELLER" ? <Link href="/reseller" className="hover:text-cyan-200">Reseller</Link> : null}
        </nav>

        <div className="flex items-center gap-2 text-sm">
          {user ? (
            <>
              <Link href="/account" className="rounded-2xl border border-white/10 px-3 py-2 font-semibold text-white hover:bg-white/10">
                Account
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/auth/login" className="rounded-2xl border border-white/10 px-3 py-2 font-semibold text-white hover:bg-white/10">
                Sign in
              </Link>
              <Link href="/auth/register" className="hidden rounded-2xl bg-cyan-300 px-3 py-2 font-black text-slate-950 hover:bg-cyan-200 sm:inline-flex">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
