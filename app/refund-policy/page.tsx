export const metadata = {
  title: "Refund Policy | GameTopUp Hub",
};

export default function RefundPolicyPage() {
  return (
    <section className="mx-auto min-h-[70vh] max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Refund policy</p>
      <h1 className="mt-3 text-4xl font-black text-white">Refund and cancellation policy</h1>
      <div className="mt-8 space-y-5 leading-8 text-slate-300">
        <p>Pending orders may be cancelled before processing when payment is not approved or when admin review rejects the payment proof.</p>
        <p>Completed digital top-ups and delivered voucher codes are generally non-refundable unless there is a verified fulfillment error.</p>
        <p>If a customer enters incorrect game account details, server details, or delivery information, the order may not be refundable after processing.</p>
        <p>Refund handling and detailed support workflows will be expanded in the admin and support phases.</p>
      </div>
    </section>
  );
}
