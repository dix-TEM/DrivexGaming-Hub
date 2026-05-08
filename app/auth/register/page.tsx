import { redirect } from "next/navigation";

import { RegisterForm } from "@/components/auth/register-form";
import { auth } from "@/lib/auth";

export default async function RegisterPage() {
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
          <h1 className="mt-2 text-3xl font-bold text-slate-950">Create account</h1>
          <p className="mt-2 text-sm text-slate-600">Create a consumer account to buy compliant top-ups and vouchers.</p>
        </div>
        <RegisterForm />
      </section>
    </main>
  );
}
