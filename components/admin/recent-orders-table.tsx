import Link from "next/link";

import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { formatMoney } from "@/lib/money";

type RecentOrder = {
  orderNumber: string;
  totalPrice: { toString(): string };
  paymentStatus: string;
  orderStatus: string;
  deliveryStatus: string;
  createdAt: Date;
  user: { name: string; email: string };
  reseller: { name: string; email: string } | null;
  product: { name: string; gameName: string | null };
};

export function RecentOrdersTable({ orders }: { orders: RecentOrder[] }) {
  if (!orders.length) {
    return <p className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-400">No orders yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="text-xs uppercase tracking-[0.16em] text-slate-500">
          <tr className="border-b border-white/10">
            <th className="py-3 pr-4">Order</th>
            <th className="py-3 pr-4">Product</th>
            <th className="py-3 pr-4">Customer</th>
            <th className="py-3 pr-4">Amount</th>
            <th className="py-3 pr-4">Status</th>
            <th className="py-3 pr-4">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {orders.map((order) => (
            <tr key={order.orderNumber} className="text-slate-300">
              <td className="py-4 pr-4">
                <Link href="/admin/orders" className="font-bold text-cyan-200 hover:text-cyan-100">
                  {order.orderNumber}
                </Link>
              </td>
              <td className="py-4 pr-4">
                <p className="font-semibold text-white">{order.product.name}</p>
                <p className="text-xs text-slate-500">{order.product.gameName ?? "Game product"}</p>
              </td>
              <td className="py-4 pr-4">
                <p className="font-semibold text-white">{order.reseller?.name ?? order.user.name}</p>
                <p className="text-xs text-slate-500">{order.reseller ? "Reseller order" : order.user.email}</p>
              </td>
              <td className="py-4 pr-4 font-bold text-white">{formatMoney(order.totalPrice.toString(), "MMK")}</td>
              <td className="space-y-2 py-4 pr-4">
                <AdminStatusBadge status={order.paymentStatus} />
                <AdminStatusBadge status={order.orderStatus} />
              </td>
              <td className="py-4 pr-4 text-slate-400">{order.createdAt.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
