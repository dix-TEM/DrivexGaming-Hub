import { ProductCard } from "@/components/storefront/product-card";
import { SectionHeading } from "@/components/storefront/section-heading";
import { getFeaturedProducts } from "@/server/services/storefront.service";

export const metadata = {
  title: "Products | GameTopUp Hub",
};

export default async function ProductsPage() {
  const products = await getFeaturedProducts(100);

  return (
    <section className="mx-auto min-h-[70vh] max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Products"
        title="All active products"
        description="A public product catalog for top-ups, wallet codes, and gift cards."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
