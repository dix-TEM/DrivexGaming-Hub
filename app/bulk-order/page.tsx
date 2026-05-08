import { BulkOrderForm } from "@/components/reseller/bulk-order-form";
import { getBulkOrderProductOptions } from "@/server/services/reseller-bulk-order.service";
import { getResellerAccount, requireActiveReseller } from "@/server/services/reseller.service";

export default async function ResellerBulkOrderPage() {
  const reseller = await requireActiveReseller();
  const [account, products] = await Promise.all([
    getResellerAccount(reseller.id),
    getBulkOrderProductOptions(reseller.id),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-cyan-200">Bulk orders</p>
        <h1 className="mt-2 text-3xl font-black text-white">Create multiple reseller orders</h1>
        <p className="mt-2 max-w-3xl text-slate-400">
          Upload CSV rows or add orders manually. Invalid rows block the whole batch, and wallet deduction happens atomically after server-side validation.
        </p>
      </div>

      <BulkOrderForm products={products} walletBalance={account.walletBalance.toString()} />
    </div>
  );
}
