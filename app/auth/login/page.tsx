import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { auth } from "@/lib/auth";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    if (session.user.role === "ADMIN") redirect("/admin");
    if (session.user.role === "RESELLER") redirect("/reseller");
    redirect("/account");
  }

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-md">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">GameTopUp Hub</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">Sign in</h1>
          <p className="mt-2 text-sm text-slate-600">Access your consumer, reseller, or admin account.</p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
