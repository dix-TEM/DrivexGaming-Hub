import { createResellerCustomerAction, updateResellerCustomerAction } from "@/server/actions/reseller-customer.actions";

type CustomerFormProps = {
  mode: "create" | "edit";
  customer?: {
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
    gameName: string | null;
    gameUserId: string | null;
    gameServerId: string | null;
    gameCharacterName: string | null;
    notes: string | null;
  };
};

export function CustomerForm({ mode, customer }: CustomerFormProps) {
  const action = mode === "edit" && customer ? updateResellerCustomerAction.bind(null, customer.id) : createResellerCustomerAction;

  return (
    <form action={action} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-xl shadow-black/20">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Customer name *</span>
          <input name="name" required defaultValue={customer?.name ?? ""} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400" />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Phone</span>
          <input name="phone" defaultValue={customer?.phone ?? ""} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400" />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Email</span>
          <input type="email" name="email" defaultValue={customer?.email ?? ""} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400" />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Game name</span>
          <input name="gameName" defaultValue={customer?.gameName ?? ""} placeholder="Mobile Legends, PUBG, Free Fire..." className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400" />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Game user ID</span>
          <input name="gameUserId" defaultValue={customer?.gameUserId ?? ""} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400" />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Server ID</span>
          <input name="gameServerId" defaultValue={customer?.gameServerId ?? ""} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400" />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-200">Character name</span>
          <input name="gameCharacterName" defaultValue={customer?.gameCharacterName ?? ""} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400" />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-200">Notes</span>
          <textarea name="notes" rows={5} defaultValue={customer?.notes ?? ""} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400" />
        </label>
      </div>

      <div className="mt-5 flex justify-end">
        <button className="rounded-xl bg-cyan-400 px-5 py-2 font-semibold text-slate-950 hover:bg-cyan-300" type="submit">
          {mode === "edit" ? "Save customer" : "Create customer"}
        </button>
      </div>
    </form>
  );
}
