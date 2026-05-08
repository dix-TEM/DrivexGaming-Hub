"use client";

import { useActionState } from "react";

import { updateProfileAction, type AccountActionState } from "@/server/actions/account.actions";

type ProfileFormProps = {
  user: {
    name: string;
    email: string;
    phone: string | null;
  };
};

const initialState: AccountActionState = {
  ok: false,
  message: "",
};

export function ProfileForm({ user }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(updateProfileAction, initialState);

  return (
    <form action={formAction} className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <div>
        <label htmlFor="name" className="text-sm font-bold text-white">Name</label>
        <input
          id="name"
          name="name"
          defaultValue={user.name}
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-bold text-white">Email</label>
        <input
          id="email"
          value={user.email}
          disabled
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-slate-400 outline-none"
        />
        <p className="mt-2 text-xs text-slate-500">Email changes are disabled for this MVP.</p>
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-bold text-white">Phone</label>
        <input
          id="phone"
          name="phone"
          defaultValue={user.phone ?? ""}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
        />
      </div>

      {state.message ? (
        <p className={state.ok ? "text-sm font-semibold text-emerald-300" : "text-sm font-semibold text-rose-300"}>{state.message}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-2xl bg-cyan-300 px-5 py-3 font-black text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}
