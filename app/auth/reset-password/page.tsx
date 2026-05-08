export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-950">Reset password</h1>
        <p className="mt-2 text-sm text-slate-600">
          Token-based password reset will be added in a later security hardening phase.
        </p>
      </section>
    </main>
  );
}
