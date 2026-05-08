import { DeliveryStatus, OrderStatus, PaymentStatus } from "@prisma/client";

export function AdminOrderFilterBar({
  products,
  defaultQ,
  defaultOrderStatus,
  defaultPaymentStatus,
  defaultDeliveryStatus,
  defaultProductId,
}: {
  products: Array<{ id: string; name: string }>;
  defaultQ?: string;
  defaultOrderStatus?: string;
  defaultPaymentStatus?: string;
  defaultDeliveryStatus?: string;
  defaultProductId?: string;
}) {
  return (
    <form className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-6" action="/admin/orders">
      <input
        name="q"
        defaultValue={defaultQ}
        placeholder="Search order, game ID, email, phone"
        className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none md:col-span-2"
      />
      <select name="orderStatus" defaultValue={defaultOrderStatus ?? ""} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white">
        <option value="">All order statuses</option>
        {Object.values(OrderStatus).map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}
      </select>
      <select name="paymentStatus" defaultValue={defaultPaymentStatus ?? ""} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white">
        <option value="">All payment statuses</option>
        {Object.values(PaymentStatus).map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}
      </select>
      <select name="deliveryStatus" defaultValue={defaultDeliveryStatus ?? ""} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white">
        <option value="">All delivery statuses</option>
        {Object.values(DeliveryStatus).map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}
      </select>
      <select name="productId" defaultValue={defaultProductId ?? ""} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white">
        <option value="">All products</option>
        {products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
      </select>
      <button className="rounded-xl bg-cyan-400 px-4 py-3 text-sm font-black text-slate-950 hover:bg-cyan-300 md:col-start-6">Filter</button>
    </form>
  );
}
