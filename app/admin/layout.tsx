import type { ReactNode } from "react";

import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { requireAdminUser } from "@/server/services/admin-dashboard.service";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const admin = await requireAdminUser();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="min-w-0 flex-1">
          <AdminTopbar adminName={admin.name ?? "Admin"} />
          <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
