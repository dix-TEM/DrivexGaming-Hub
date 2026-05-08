import { CategoryForm } from "@/components/admin/catalog/category-form";
import { requireAdmin } from "@/server/services/admin-catalog.service";

export default async function NewCategoryPage() {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">Catalog</p>
        <h1 className="mt-2 text-3xl font-black text-white">Create category</h1>
        <p className="mt-2 text-sm text-slate-400">Add a new public storefront category.</p>
      </div>
      <CategoryForm />
    </div>
  );
}
