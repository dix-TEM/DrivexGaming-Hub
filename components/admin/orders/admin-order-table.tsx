import Link from "next/link";

import { StatusBadge } from "@/components/admin/orders/status-badge";
import { formatMoney } from "@/lib/money";

export function AdminOrderTable({ orders }: { orders: any[] }) {
  if (orders.length === 0) {
    return <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-slate-400">No orders found.</div>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-white/[0.04] text-left text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Delivery</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {orders.map((order) => (
              <tr key={order.id} className="text-slate-200">
                <td className="px-4 py-4">
                  <Link href={`/admin/orders/${order.orderNumber}`} className="font-bold text-cyan-300 hover:text-cyan-200">
                    {order.orderNumber}
                  </Link>
                  <div className="mt-1 text-xs text-slate-500">{new Date(order.createdAt).toLocaleString()}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="font-medium text-white">{order.user.name}</div>
                  <div className="text-xs text-slate-400">{order.customerPhone ?? order.user.email}</div>
                  {order.reseller ? <div className="mt-1 text-xs text-amber-200">Reseller: {order.reseller.name}</div> : null}
                </td>
                <td className="px-4 py-4">
                  <div>{order.product.name}</div>
                  <div className="text-xs text-slate-500">{order.gameUserId ?? "No game ID"}</div>
                </td>
                <td className="px-4 py-4 font-bold text-white">{formatMoney(order.totalPrice.toString())}</td>
                <td className="px-4 py-4"><StatusBadge status={order.paymentStatus} /></td>
                <td className="px-4 py-4"><StatusBadge status={order.orderStatus} /></td>
                <td className="px-4 py-4"><StatusBadge status={order.deliveryStatus} /></td>
                <td className="px-4 py-4">
                  <Link href={`/admin/orders/${order.orderNumber}`} className="rounded-lg border border-cyan-400/30 px-3 py-2 text-xs font-bold text-cyan-200 hover:bg-cyan-400/10">
                    Manage
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
