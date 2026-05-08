export const metadata = {
  title: "Terms | GameTopUp Hub",
};

export default function TermsPage() {
  return (
    <section className="mx-auto min-h-[70vh] max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Terms</p>
      <h1 className="mt-3 text-4xl font-black text-white">Terms of service</h1>
      <div className="mt-8 space-y-5 leading-8 text-slate-300">
        <p>GameTopUp Hub provides compliant digital gaming top-ups, gift cards, wallet codes, and vouchers only.</p>
        <p>Customers are responsible for entering correct player IDs, server IDs, emails, phone numbers, and other product-specific checkout fields.</p>
        <p>GameTopUp Hub does not support game account buying, account selling, credential collection, boosting, cheats, exploits, or unauthorized account services.</p>
        <p>Orders may require manual payment review before processing. Fraudulent payment proof, duplicate submissions, or suspicious activity may lead to cancellation or account restriction.</p>
      </div>
    </section>
  );
}
