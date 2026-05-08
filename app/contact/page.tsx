export const metadata = {
  title: "Contact | GameTopUp Hub",
};

export default function ContactPage() {
  return (
    <section className="mx-auto min-h-[70vh] max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Contact</p>
      <h1 className="mt-3 text-4xl font-black text-white">Need help with an order?</h1>
      <p className="mt-4 text-lg leading-8 text-slate-300">
        Support tickets are added in the account dashboard step. For now, this page is a clean public contact placeholder for support channels.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="font-bold text-white">Support email</h2>
          <p className="mt-2 text-slate-300">support@gametopuphub.com</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="font-bold text-white">Business hours</h2>
          <p className="mt-2 text-slate-300">Daily, manual review queue</p>
        </div>
      </div>
    </section>
  );
}
