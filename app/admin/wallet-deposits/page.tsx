import { AdminPlaceholder } from "@/components/admin/admin-placeholder";
import { getAdminRouteCounts } from "@/server/services/admin-dashboard.service";

export default async function AdminWalletDepositsPage() {
  const counts = await getAdminRouteCounts();

  return (
    <AdminPlaceholder
      title="Wallet Deposit Review"
      description="This page is reserved for reseller wallet deposit requests. Admins will review proof images before crediting wallet balance."
      nextStep="Step 11 will implement wallet deposit approval/rejection with database transactions, notifications, and double-approval protection."
      countLabel="Pending wallet deposits"
      count={counts.pendingWalletDeposits}
    />
  );
}
