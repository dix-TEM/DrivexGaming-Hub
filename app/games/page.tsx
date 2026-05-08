import { CategoryCard } from "@/components/storefront/category-card";
import { SectionHeading } from "@/components/storefront/section-heading";
import { getActiveCategories } from "@/server/services/storefront.service";

export const metadata = {
  title: "Games | GameTopUp Hub",
};

export default async function GamesPage() {
  const categories = await getActiveCategories();

  return (
    <section className="mx-auto min-h-[70vh] max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Games"
        title="Browse supported games and voucher categories"
        description="Choose a category to view active top-up products from the database. Checkout will be connected in the next step."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
