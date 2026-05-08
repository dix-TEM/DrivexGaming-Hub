"use client";

import { useActionState } from "react";

import { createSupportTicketAction, type SupportActionState } from "@/server/actions/support.actions";

type SupportTicketFormProps = {
  orders: Array<{
    id: string;
    orderNumber: string;
    product: { name: string };
  }>;
};

const initialState: SupportActionState = {
  ok: false,
  message: "",
};

export function SupportTicketForm({ orders }: SupportTicketFormProps) {
  const [state, formAction, pending] = useActionState(createSupportTicketAction, initialState);

  return (
    <form action={formAction} className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <div>
        <label htmlFor="orderId" className="text-sm font-bold text-white">Related order</label>
        <select
          id="orderId"
          name="orderId"
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
        >
          <option value="">No related order</option>
          {orders.map((order) => (
            <option key={order.id} value={order.id}>
              {order.orderNumber} - {order.product.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="subject" className="text-sm font-bold text-white">Subject</label>
        <input
          id="subject"
          name="subject"
          required
          minLength={5}
          maxLength={160}
          placeholder="Example: Payment proof review question"
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-bold text-white">Message</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={5}
          placeholder="Describe what you need help with."
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
        />
      </div>

      {state.message ? <p className="text-sm font-semibold text-rose-300">{state.message}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-2xl bg-cyan-300 px-5 py-3 font-black text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Creating..." : "Create ticket"}
      </button>
    </form>
  );
}
