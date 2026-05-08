"use client";

import { useActionState } from "react";

import { createCategoryAction, updateCategoryAction } from "@/server/actions/admin-catalog.actions";

type CategoryFormProps = {
  category?: {
    id: string;
    name: string;
    slug: string;
    image: string | null;
    active: boolean;
    sortOrder: number;
  };
};

const initialState = { ok: true, message: "" };

export function CategoryForm({ category }: CategoryFormProps) {
  const action = category ? updateCategoryAction.bind(null, category.id) : createCategoryAction;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
      {!state.ok && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {state.message}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Category name</span>
          <input
            name="name"
            required
            defaultValue={category?.name ?? ""}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/40 focus:ring-2"
            placeholder="Mobile Legends"
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Slug</span>
          <input
            name="slug"
            required
            defaultValue={category?.slug ?? ""}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/40 focus:ring-2"
            placeholder="mobile-legends"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Image URL</span>
          <input
            name="image"
            defaultValue={category?.image ?? ""}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/40 focus:ring-2"
            placeholder="/images/categories/mobile-legends.png"
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Sort order</span>
          <input
            name="sortOrder"
            type="number"
            min="0"
            defaultValue={category?.sortOrder ?? 0}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/40 focus:ring-2"
          />
        </label>
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
        <input name="active" type="checkbox" defaultChecked={category?.active ?? true} className="h-4 w-4 rounded border-slate-700" />
        Active category
      </label>

      <div className="flex items-center justify-end gap-3">
        <a href="/admin/categories" className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800">
          Cancel
        </a>
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving..." : category ? "Update category" : "Create category"}
        </button>
      </div>
    </form>
  );
}
