import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-xl font-black text-white">GameTopUp Hub</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            A compliant game top-up consumer store and reseller panel for digital gaming products. No game account buying or selling.
          </p>
        </div>
        <div>
          <p className="font-bold text-white">Store</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            <Link href="/games" className="hover:text-cyan-200">Games</Link>
            <Link href="/track-order" className="hover:text-cyan-200">Track Order</Link>
            <Link href="/faq" className="hover:text-cyan-200">FAQ</Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-white">Policy</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            <Link href="/terms" className="hover:text-cyan-200">Terms</Link>
            <Link href="/refund-policy" className="hover:text-cyan-200">Refund Policy</Link>
            <Link href="/contact" className="hover:text-cyan-200">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
