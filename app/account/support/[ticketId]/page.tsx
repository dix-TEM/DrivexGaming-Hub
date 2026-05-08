import Link from "next/link";

import { AccountNav } from "@/components/account/account-nav";
import { StatusBadge } from "@/components/account/status-badge";
import { SupportReplyForm } from "@/components/account/support-reply-form";
import { getSupportTicketById, requireActiveUser } from "@/server/services/account.service";

type SupportTicketDetailPageProps = {
  params: Promise<{ ticketId: string }>;
};

export default async function SupportTicketDetailPage({ params }: SupportTicketDetailPageProps) {
  const { ticketId } = await params;
  const user = await requireActiveUser();
  const ticket = await getSupportTicketById(user.id, ticketId);
  const isClosed = ticket.status === "CLOSED" || ticket.status === "RESOLVED";

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <AccountNav />
        <div className="mb-6">
          <Link href="/account/support" className="text-sm font-bold text-cyan-200 hover:text-cyan-100">
            ← Back to support
          </Link>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">Support ticket</p>
              <h1 className="mt-2 text-3xl font-black text-white">{ticket.subject}</h1>
              {ticket.order ? (
                <p className="mt-2 text-sm text-slate-400">
                  Related order {ticket.order.orderNumber} · {ticket.order.product.name}
                </p>
              ) : (
                <p className="mt-2 text-sm text-slate-400">General support request</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge label={ticket.status} />
              <StatusBadge label={ticket.priority} />
            </div>
          </div>
        </section>

        <section className="mt-6 space-y-4">
          {ticket.messages.map((message) => {
            const isMine = message.sender.id === user.id;
            return (
              <div
                key={message.id}
                className={
                  isMine
                    ? "ml-auto max-w-3xl rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5"
                    : "max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                }
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-white">{message.sender.name} · {message.sender.role}</p>
                  <p className="text-xs text-slate-500">{message.createdAt.toLocaleString()}</p>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-100">{message.message}</p>
              </div>
            );
          })}
        </section>

        <section className="mt-6">
          <SupportReplyForm ticketId={ticket.id} disabled={isClosed} />
        </section>
      </div>
    </main>
  );
}
