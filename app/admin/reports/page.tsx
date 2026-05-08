import { AdminPlaceholder } from "@/components/admin/admin-placeholder";

export default function AdminReportsPage() {
  return (
    <AdminPlaceholder
      title="Reports"
      description="This module will provide GMV, gross profit, product revenue, category revenue, payment method usage, reseller rankings, failed orders, refunds, wallet deposits, and CSV exports."
      nextStep="Step 15 will implement report filters, date ranges, Decimal-safe calculations, charts/tables, and CSV export."
    />
  );
}
