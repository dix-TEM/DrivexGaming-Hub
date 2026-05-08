import { AccountNav } from "@/components/account/account-nav";
import { SupportTicketForm } from "@/components/account/support-ticket-form";
import { SupportTicketList } from "@/components/account/support-ticket-list";
import { getSupportOrderOptions, getSupportTickets, requireActiveUser } from "@/server/services/account.service";

export default async function AccountSupportPage() {
  const user = await requireActiveUser();
  const [tickets, orders] = await Promise.all([
    getSupportTickets(user.id),
    getSupportOrderOptions(user.id),
  ]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AccountNav />
        <section className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-200">Support</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Support tickets</h1>
          <p className="mt-3 max-w-2xl text-slate-400">Ask for help with an order, payment proof, delivery status, or account question.</p>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <section>
            <h2 className="mb-4 text-2xl font-black">Your tickets</h2>
            <SupportTicketList tickets={tickets} />
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-black">Create ticket</h2>
            <SupportTicketForm orders={orders} />
          </section>
        </div>
      </div>
    </main>
  );
}
