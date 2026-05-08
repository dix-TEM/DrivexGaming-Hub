import Link from "next/link";

import { LogoutButton } from "@/components/auth/logout-button";

export function AdminTopbar({ adminName }: { adminName: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Admin Console</p>
          <h1 className="mt-1 text-xl font-black text-white sm:text-2xl">Operations Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 sm:inline-flex"
          >
            View Store
          </Link>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-bold text-white">{adminName}</p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
