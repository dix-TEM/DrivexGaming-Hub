import { AdminPlaceholder } from "@/components/admin/admin-placeholder";
import { getAdminRouteCounts } from "@/server/services/admin-dashboard.service";

export default async function AdminResellersPage() {
  const counts = await getAdminRouteCounts();

  return (
    <AdminPlaceholder
      title="Reseller Management"
      description="This module will manage reseller accounts, tiers, wallet review context, reseller order activity, and role/status controls."
      nextStep="Reseller operational screens will be expanded after admin order/payment foundations are completed."
      countLabel="Total resellers"
      count={counts.resellers}
    />
  );
}
