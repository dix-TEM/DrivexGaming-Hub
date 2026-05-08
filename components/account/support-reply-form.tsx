"use client";

import { useActionState } from "react";

import { replySupportTicketAction, type SupportActionState } from "@/server/actions/support.actions";

type SupportReplyFormProps = {
  ticketId: string;
  disabled?: boolean;
};

const initialState: SupportActionState = {
  ok: false,
  message: "",
};

export function SupportReplyForm({ ticketId, disabled }: SupportReplyFormProps) {
  const [state, formAction, pending] = useActionState(replySupportTicketAction, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <input type="hidden" name="ticketId" value={ticketId} />
      <label htmlFor="message" className="text-sm font-bold text-white">Reply</label>
      <textarea
        id="message"
        name="message"
        required
        minLength={2}
        maxLength={3000}
        rows={4}
        disabled={disabled}
        placeholder={disabled ? "This ticket is closed." : "Write your reply..."}
        className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
      />
      {state.message ? (
        <p className={state.ok ? "text-sm font-semibold text-emerald-300" : "text-sm font-semibold text-rose-300"}>{state.message}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending || disabled}
        className="rounded-2xl bg-cyan-300 px-5 py-3 font-black text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send reply"}
      </button>
    </form>
  );
}
