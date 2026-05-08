import { formatMoney } from "@/lib/money";

type PublicOrderCardProps = {
  order: {
    orderNumber: string;
    totalPrice: unknown;
    paymentStatus: string;
    orderStatus: string;
    deliveryStatus: string;
    customerNote: string | null;
    createdAt: Date;
    gameUserId: string | null;
    gameServerId: string | null;
    gameCharacterName: string | null;
    product: {
      name: string;
      gameName: string | null;
      image: string | null;
    };
  };
};

export function PublicOrderCard({ order }: PublicOrderCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/30">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Order details</p>
          <h2 className="mt-2 text-2xl font-black text-white">{order.orderNumber}</h2>
          <p className="mt-1 text-slate-400">Created {order.createdAt.toLocaleDateString()}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Amount</p>
          <p className="mt-1 text-2xl font-black text-white">{formatMoney(String(order.totalPrice), "MMK")}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatusBox label="Payment" value={order.paymentStatus} />
        <StatusBox label="Order" value={order.orderStatus} />
        <StatusBox label="Delivery" value={order.deliveryStatus} />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h3 className="font-bold text-white">{order.product.name}</h3>
        <p className="mt-1 text-sm text-slate-400">{order.product.gameName}</p>
        <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
          <p>Game ID: {order.gameUserId ?? "-"}</p>
          <p>Server: {order.gameServerId ?? "-"}</p>
          <p>Character: {order.gameCharacterName ?? "-"}</p>
        </div>
      </div>

      {order.customerNote ? (
        <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-5 text-sm text-cyan-100">
          <p className="mb-1 font-bold text-cyan-50">Customer-visible note</p>
          <p>{order.customerNote}</p>
        </div>
      ) : null}
    </div>
  );
}

function StatusBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{label}</p>
      <p className="mt-2 font-bold text-white">{value.replaceAll("_", " ")}</p>
    </div>
  );
}
