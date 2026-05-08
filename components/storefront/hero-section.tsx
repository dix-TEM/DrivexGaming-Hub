import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.24),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.22),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0),rgb(2,6,23))]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <p className="mb-5 inline-flex w-fit rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200">
            Compliant top-ups, vouchers, reseller wallet ordering
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Fast Game Top-Ups for Players. Wholesale Prices for Resellers.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Buy MLBB Diamonds, PUBG UC, Free Fire Diamonds, Roblox gift cards, Steam Wallet, and gaming vouchers with secure manual payment review and transparent order tracking.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/games" className="rounded-2xl bg-cyan-300 px-6 py-4 text-center font-black text-slate-950 transition hover:bg-cyan-200">
              Buy Now
            </Link>
            <Link href="/auth/register" className="rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-center font-bold text-white transition hover:bg-white/15">
              Become a Reseller
            </Link>
            <Link href="/track-order" className="rounded-2xl border border-cyan-300/30 px-6 py-4 text-center font-bold text-cyan-200 transition hover:bg-cyan-300/10">
              Track Order
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur">
          <div className="rounded-[1.5rem] bg-slate-950/80 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["MLBB", "Diamonds", "5-15 min"],
                ["PUBG", "UC", "5-30 min"],
                ["Free Fire", "Diamonds", "5-15 min"],
                ["Steam", "Wallet", "10-60 min"],
              ].map(([game, item, time]) => (
                <div key={game} className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-5">
                  <p className="text-sm font-semibold text-cyan-200">{game}</p>
                  <p className="mt-2 text-2xl font-black text-white">{item}</p>
                  <p className="mt-3 text-sm text-slate-400">Estimated {time}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
              <p className="text-sm font-bold text-emerald-200">Trusted workflow</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Manual payment proof review today. Supplier API automation remains extensible for later phases.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
