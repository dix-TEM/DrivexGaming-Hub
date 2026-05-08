import Image from "next/image";
import Link from "next/link";

import { StatusBadge } from "@/components/account/status-badge";
import { formatMoney } from "@/lib/money";

type OrderSummaryCardProps = {
  order: {
    orderNumber: string;
    totalPrice: { toString(): string };
    paymentStatus: string;
    orderStatus: string;
    deliveryStatus: string;
    createdAt: Date;
    product: {
      name: string;
      gameName: string | null;
      image: string | null;
    };
  };
};

export function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  return (
    <Link
      href={`/account/orders/${order.orderNumber}`}
      className="group grid gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 sm:grid-cols-[80px_1fr_auto]"
    >
      <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-slate-900">
        {order.product.image ? (
          <Image src={order.product.image} alt={order.product.name} fill className="object-cover" sizes="80px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xl font-black text-cyan-200">G</div>
        )}
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">{order.orderNumber}</p>
        <h3 className="mt-1 text-lg font-black text-white group-hover:text-cyan-100">{order.product.name}</h3>
        <p className="mt-1 text-sm text-slate-400">{order.product.gameName ?? "Game top-up"}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <StatusBadge label={order.paymentStatus} />
          <StatusBadge label={order.orderStatus} />
          <StatusBadge label={order.deliveryStatus} />
        </div>
      </div>

      <div className="text-left sm:text-right">
        <p className="text-lg font-black text-cyan-200">{formatMoney(order.totalPrice.toString())}</p>
        <p className="mt-1 text-xs text-slate-500">{order.createdAt.toLocaleString()}</p>
      </div>
    </Link>
  );
}
