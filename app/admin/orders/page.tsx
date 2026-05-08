import { AdminOrderFilterBar } from "@/components/admin/orders/admin-order-filter-bar";
import { AdminOrderTable } from "@/components/admin/orders/admin-order-table";
import { getAdminOrderProducts, getAdminOrders } from "@/server/services/admin-order-payment.service";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    orderStatus?: string;
    paymentStatus?: string;
    deliveryStatus?: string;
    productId?: string;
  }>;
}) {
  const filters = await searchParams;
  const [orders, products] = await Promise.all([
    getAdminOrders(filters),
    getAdminOrderProducts(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">Operations</p>
        <h1 className="mt-2 text-3xl font-black text-white">Order Management</h1>
        <p className="mt-2 text-sm text-slate-400">Search orders, review customer details, update fulfillment status, and manage customer-visible or internal notes.</p>
      </div>

      <AdminOrderFilterBar
        products={products}
        defaultQ={filters.q}
        defaultOrderStatus={filters.orderStatus}
        defaultPaymentStatus={filters.paymentStatus}
        defaultDeliveryStatus={filters.deliveryStatus}
        defaultProductId={filters.productId}
      />

      <AdminOrderTable orders={orders} />
    </div>
  );
}
