import Link from "next/link";

import { CategoryCard } from "@/components/storefront/category-card";
import { HeroSection } from "@/components/storefront/hero-section";
import { ProductCard } from "@/components/storefront/product-card";
import { SectionHeading } from "@/components/storefront/section-heading";
import { TrustGrid } from "@/components/storefront/trust-grid";
import { getActiveCategories, getFeaturedProducts } from "@/server/services/storefront.service";

export default async function HomePage() {
  const [categories, products] = await Promise.all([getActiveCategories(), getFeaturedProducts(8)]);

  return (
    <div className="bg-slate-950">
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Popular games" title="Choose your game" description="Browse active game categories powered by your Prisma catalog." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.slice(0, 6).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Featured products" title="Fast top-ups and vouchers" description="Only active products are shown on the public storefront." />
          </div>
          {products.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 text-center text-slate-400">
              No active products yet. Run the Prisma seed script or add products in admin later.
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/10 via-fuchsia-500/10 to-slate-900 p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Promotions</p>
          <h2 className="mt-3 text-3xl font-black text-white">Promo banners will appear here</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            This placeholder is ready for promo code campaigns, featured deals, seasonal banners, and reseller announcements in a later phase.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Why choose us" title="Built for secure manual operations first" />
        <TrustGrid />
      </section>

      <section className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Reseller CTA</p>
            <h2 className="mt-3 text-3xl font-black text-white">Want wholesale prices?</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Register now and ask the admin to approve reseller access. Wallet ordering and wholesale pricing are prepared for reseller phases.
            </p>
          </div>
          <Link href="/auth/register" className="rounded-2xl bg-cyan-300 px-6 py-4 font-black text-slate-950 hover:bg-cyan-200">
            Become a Reseller
          </Link>
        </div>
      </section>
    </div>
  );
}
