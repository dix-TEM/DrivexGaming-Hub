import Link from "next/link";

import { OrderManagementForms } from "@/components/admin/orders/order-management-forms";
import { OrderNotesForm } from "@/components/admin/orders/order-notes-form";
import { PaymentReviewTable } from "@/components/admin/orders/payment-review-table";
import { StatusBadge } from "@/components/admin/orders/status-badge";
import { formatMoney } from "@/lib/money";
import { getAdminOrderDetail } from "@/server/services/admin-order-payment.service";

function DetailItem({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
      <div className="text-xs uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-bold text-white">{value ?? "-"}</div>
    </div>
  );
}

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params;
  const order = await getAdminOrderDetail(orderNumber);
  const paymentsForTable = order.payments.map((payment) => ({
    ...payment,
    order: { ...order, product: order.product },
    user: order.user,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href="/admin/orders" className="text-sm font-bold text-cyan-300 hover:text-cyan-200">← Back to orders</Link>
          <h1 className="mt-3 text-3xl font-black text-white">Order {order.orderNumber}</h1>
          <p className="mt-2 text-sm text-slate-400">Created {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={order.paymentStatus} />
          <StatusBadge status={order.orderStatus} />
          <StatusBadge status={order.deliveryStatus} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <DetailItem label="Product" value={order.product.name} />
        <DetailItem label="Game" value={order.product.gameName} />
        <DetailItem label="Total amount" value={formatMoney(order.totalPrice.toString())} />
        <DetailItem label="Quantity" value={order.quantity} />
        <DetailItem label="Unit price" value={formatMoney(order.unitPrice.toString())} />
        <DetailItem label="Gross profit" value={formatMoney(order.grossProfit.toString())} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xl font-black text-white">Customer</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <DetailItem label="Account name" value={order.user.name} />
            <DetailItem label="Account email" value={order.user.email} />
            <DetailItem label="Customer email" value={order.customerEmail} />
            <DetailItem label="Customer phone" value={order.customerPhone ?? order.user.phone} />
          </div>
          {order.reseller ? <p className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-sm text-amber-100">Reseller order from {order.reseller.name} ({order.reseller.email})</p> : null}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xl font-black text-white">Game / Delivery Details</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <DetailItem label="Game user ID" value={order.gameUserId} />
            <DetailItem label="Game server ID" value={order.gameServerId} />
            <DetailItem label="Character name" value={order.gameCharacterName} />
            <DetailItem label="Proof of delivery" value={order.proofOfDelivery} />
          </div>
        </section>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-black text-white">Payment Records</h2>
          <p className="mt-1 text-sm text-slate-400">Approve or reject pending manual payments. Reviewed payments are locked from double review.</p>
        </div>
        <PaymentReviewTable payments={paymentsForTable} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black text-white">Fulfillment Actions</h2>
        <OrderManagementForms orderNumber={order.orderNumber} proofOfDelivery={order.proofOfDelivery} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black text-white">Notes</h2>
        <OrderNotesForm order={order} />
      </section>

      {order.supportTickets.length > 0 ? (
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xl font-black text-white">Related Support Tickets</h2>
          <div className="mt-4 space-y-3">
            {order.supportTickets.map((ticket) => (
              <div key={ticket.id} className="flex flex-col gap-2 rounded-xl border border-white/10 bg-slate-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-bold text-white">{ticket.subject}</div>
                  <div className="text-xs text-slate-500">{new Date(ticket.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex gap-2"><StatusBadge status={ticket.status} /><StatusBadge status={ticket.priority} /></div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
