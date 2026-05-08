import { ProductForm } from "@/components/admin/catalog/product-form";
import { getCategoryOptions } from "@/server/services/admin-catalog.service";

export default async function NewProductPage() {
  const categories = await getCategoryOptions();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">Catalog</p>
        <h1 className="mt-2 text-3xl font-black text-white">Create product</h1>
        <p className="mt-2 text-sm text-slate-400">Add a new top-up, gift card, voucher, or wallet product.</p>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}
