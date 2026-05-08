"use client";

import { useActionState } from "react";
import Link from "next/link";

import { registerAction, type AuthActionState } from "@/server/actions/auth.actions";

const initialState: AuthActionState = {
  ok: false,
  message: "",
};

export function RegisterForm() {
  const [state, action, isPending] = useActionState(registerAction, initialState);

  return (
    <form action={action} className="space-y-5 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-slate-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="w-full rounded-xl border px-3 py-2 outline-none ring-slate-900/10 focus:ring-4"
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-xl border px-3 py-2 outline-none ring-slate-900/10 focus:ring-4"
          placeholder="user@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-slate-700">
          Phone optional
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="w-full rounded-xl border px-3 py-2 outline-none ring-slate-900/10 focus:ring-4"
          placeholder="+959..."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          className="w-full rounded-xl border px-3 py-2 outline-none ring-slate-900/10 focus:ring-4"
          placeholder="At least 10 characters"
        />
        <p className="text-xs text-slate-500">Use uppercase, lowercase, and at least one number.</p>
      </div>

      {state.message ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{state.message}</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-slate-600">
        Already have an account? {" "}
        <Link href="/auth/login" className="font-medium text-slate-950 underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </form>
  );
}
