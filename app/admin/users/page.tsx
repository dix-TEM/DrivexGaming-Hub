import { AdminPlaceholder } from "@/components/admin/admin-placeholder";
import { getAdminRouteCounts } from "@/server/services/admin-dashboard.service";

export default async function AdminUsersPage() {
  const counts = await getAdminRouteCounts();

  return (
    <AdminPlaceholder
      title="User Management"
      description="This module will manage consumer accounts, account status, support visibility, and security-sensitive user review workflows."
      nextStep="A later admin user-management step will add user search, suspension/ban actions, profile review, and audit logging."
      countLabel="Total users"
      count={counts.users}
    />
  );
}
