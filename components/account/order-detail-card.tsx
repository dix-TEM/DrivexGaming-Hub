import Image from "next/image";
import Link from "next/link";

import { StatusBadge } from "@/components/account/status-badge";
import { formatMoney } from "@/lib/money";

type OrderDetailCardProps = {
  order: {
    orderNumber: string;
    quantity: number;
    unitPrice: { toString(): string };
    totalPrice: { toString(): string };
    gameUserId: string | null;
    gameServerId: string | null;
    gameCharacterName: string | null;
    customerEmail: string | null;
    customerPhone: string | null;
    paymentStatus: string;
    orderStatus: string;
    deliveryStatus: string;
    customerNote: string | null;
    proofOfDelivery: string | null;
    createdAt: Date;
    updatedAt: Date;
    product: {
      name: string;
      slug: string;
      image: string | null;
      gameName: string | null;
      estimatedDeliveryTime: string | null;
    };
    payments: Array<{
      amount: { toString(): string };
      status: string;
      rejectionReason: string | null;
      createdAt: Date;
      reviewedAt: Date | null;
      paymentMethod: { name: string } | null;
    }>;
  };
};

function DetailRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 font-semibold text-white">{value}</p>
    </div>
  );
}

export function OrderDetailCard({ order }: OrderDetailCardProps) {
  const timeline = [
    { label: "Order created", value: order.createdAt.toLocaleString() },
    {
      label: `Payment: ${order.paymentStatus}`,
      value: order.payments[0]?.reviewedAt?.toLocaleString() ?? order.payments[0]?.createdAt?.toLocaleString(),
    },
    { label: `Order: ${order.orderStatus}`, value: order.updatedAt.toLocaleString() },
    { label: `Delivery: ${order.deliveryStatus}`, value: order.updatedAt.toLocaleString() },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
        <div className="grid gap-5 lg:grid-cols-[180px_1fr]">
          <div className="relative h-44 overflow-hidden rounded-3xl bg-slate-900">
            {order.product.image ? (
              <Image src={order.product.image} alt={order.product.name} fill className="object-cover" sizes="180px" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl font-black text-cyan-200">G</div>
            )}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">{order.orderNumber}</p>
            <h1 className="mt-2 text-3xl font-black text-white">{order.product.name}</h1>
            <p className="mt-2 text-slate-400">{order.product.gameName ?? "Game top-up"}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <StatusBadge label={order.paymentStatus} />
              <StatusBadge label={order.orderStatus} />
              <StatusBadge label={order.deliveryStatus} />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <DetailRow label="Unit price" value={formatMoney(order.unitPrice.toString())} />
              <DetailRow label="Quantity" value={String(order.quantity)} />
              <DetailRow label="Total" value={formatMoney(order.totalPrice.toString())} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <DetailRow label="Game User ID" value={order.gameUserId} />
        <DetailRow label="Game Server ID" value={order.gameServerId} />
        <DetailRow label="Character Name" value={order.gameCharacterName} />
        <DetailRow label="Customer Email" value={order.customerEmail} />
        <DetailRow label="Customer Phone" value={order.customerPhone} />
        <DetailRow label="Estimated Delivery" value={order.product.estimatedDeliveryTime} />
      </section>

      {order.customerNote ? (
        <section className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">Customer note</p>
          <p className="mt-2 text-sm leading-6 text-slate-100">{order.customerNote}</p>
        </section>
      ) : null}

      {order.proofOfDelivery ? (
        <section className="rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100">Proof of delivery</p>
          <Link href={order.proofOfDelivery} target="_blank" className="mt-2 inline-flex font-bold text-emerald-100 underline">
            View delivery proof
          </Link>
        </section>
      ) : null}

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-xl font-black text-white">Order timeline</h2>
        <div className="mt-5 space-y-3">
          {timeline.map((item) => (
            <div key={item.label} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <span className="mt-1 h-3 w-3 rounded-full bg-cyan-300" />
              <div>
                <p className="font-bold text-white">{item.label}</p>
                {item.value ? <p className="text-sm text-slate-400">{item.value}</p> : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
