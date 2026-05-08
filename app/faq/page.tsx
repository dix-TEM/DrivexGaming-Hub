const faqs = [
  ["Do you sell game accounts?", "No. GameTopUp Hub only supports compliant digital top-ups, gift cards, wallet codes, and vouchers. We do not support account buying, selling, trading, or credential handling."],
  ["How fast is delivery?", "Estimated delivery time depends on the product. Product detail pages show the configured estimated delivery time from the database."],
  ["How does manual payment review work?", "After checkout is implemented, customers will upload payment proof. Admins review the proof before processing the order."],
  ["Can I become a reseller?", "Yes. Register an account and request reseller approval. Reseller wallet ordering and wholesale prices are handled in later reseller phases."],
];

export const metadata = {
  title: "FAQ | GameTopUp Hub",
};

export default function FAQPage() {
  return (
    <section className="mx-auto min-h-[70vh] max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">FAQ</p>
      <h1 className="mt-3 text-4xl font-black text-white">Frequently asked questions</h1>
      <div className="mt-8 grid gap-4">
        {faqs.map(([question, answer]) => (
          <div key={question} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-lg font-bold text-white">{question}</h2>
            <p className="mt-3 leading-7 text-slate-300">{answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
