import Link from "next/link";

import { formatMoney } from "@/lib/money";

type PendingPayment = {
  id: string;
  amount: { toString(): string };
  proofImage: string | null;
  createdAt: Date;
  user: { name: string; email: string };
  paymentMethod: { name: string } | null;
  order: {
    orderNumber: string;
    product: { name: string };
  };
};

export function PendingPaymentsTable({ payments }: { payments: PendingPayment[] }) {
  if (!payments.length) {
    return <p className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-400">No pending payment reviews.</p>;
  }

  return (
    <div className="space-y-3">
      {payments.map((payment) => (
        <div key={payment.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link href="/admin/payments" className="font-bold text-cyan-200 hover:text-cyan-100">
                {payment.order.orderNumber}
              </Link>
              <p className="mt-1 text-sm text-white">{payment.order.product.name}</p>
              <p className="mt-1 text-xs text-slate-500">{payment.user.name} · {payment.paymentMethod?.name ?? "Manual payment"}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-lg font-black text-white">{formatMoney(payment.amount.toString(), "MMK")}</p>
              <p className="text-xs text-slate-500">Submitted {payment.createdAt.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
