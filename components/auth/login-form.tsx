"use client";

import { useActionState } from "react";
import Link from "next/link";

import { loginAction, type AuthActionState } from "@/server/actions/auth.actions";

const initialState: AuthActionState = {
  ok: false,
  message: "",
};

export function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="space-y-5 rounded-2xl border bg-white p-6 shadow-sm">
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
          placeholder="admin@gametopuphub.com"
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
          autoComplete="current-password"
          required
          className="w-full rounded-xl border px-3 py-2 outline-none ring-slate-900/10 focus:ring-4"
          placeholder="••••••••••"
        />
      </div>

      {state.message ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{state.message}</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-center text-sm text-slate-600">
        No account yet? {" "}
        <Link href="/auth/register" className="font-medium text-slate-950 underline underline-offset-4">
          Create one
        </Link>
      </p>
    </form>
  );
}
