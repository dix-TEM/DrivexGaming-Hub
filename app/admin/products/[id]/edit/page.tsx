import { ProductForm } from "@/components/admin/catalog/product-form";
import { getCategoryOptions, getProductForEdit } from "@/server/services/admin-catalog.service";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductForEdit(id),
    getCategoryOptions(),
  ]);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">Catalog</p>
        <h1 className="mt-2 text-3xl font-black text-white">Edit product</h1>
        <p className="mt-2 text-sm text-slate-400">Update pricing, stock, delivery, and checkout field requirements.</p>
      </div>
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
