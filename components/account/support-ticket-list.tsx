import Link from "next/link";

import { StatusBadge } from "@/components/account/status-badge";

type SupportTicketListProps = {
  tickets: Array<{
    id: string;
    subject: string;
    status: string;
    priority: string;
    createdAt: Date;
    updatedAt: Date;
    order: { orderNumber: string } | null;
    _count: { messages: number };
  }>;
};

export function SupportTicketList({ tickets }: SupportTicketListProps) {
  if (tickets.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center">
        <p className="font-bold text-white">No support tickets yet.</p>
        <p className="mt-2 text-sm text-slate-400">Create a ticket if you need help with an order or payment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tickets.map((ticket) => (
        <Link
          key={ticket.id}
          href={`/account/support/${ticket.id}`}
          className="block rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg font-black text-white">{ticket.subject}</h3>
              <p className="mt-1 text-sm text-slate-400">
                {ticket.order ? `Order ${ticket.order.orderNumber}` : "General support"} · {ticket._count.messages} messages
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge label={ticket.status} />
              <StatusBadge label={ticket.priority} />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">Updated {ticket.updatedAt.toLocaleString()}</p>
        </Link>
      ))}
    </div>
  );
}
