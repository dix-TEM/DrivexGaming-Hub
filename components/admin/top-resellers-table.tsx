import { formatMoney } from "@/lib/money";

type TopReseller = {
  resellerId: string;
  name: string;
  email: string;
  orderCount: number;
  gmv: number;
  grossProfit: number;
};

export function TopResellersTable({ resellers }: { resellers: TopReseller[] }) {
  if (!resellers.length) {
    return <p className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-400">No reseller orders yet.</p>;
  }

  return (
    <div className="space-y-3">
      {resellers.map((reseller, index) => (
        <div key={reseller.resellerId || index} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-fuchsia-300/10 text-sm font-black text-fuchsia-200">#{index + 1}</span>
            <div>
              <p className="font-bold text-white">{reseller.name}</p>
              <p className="text-xs text-slate-500">{reseller.email || "No email"} · {reseller.orderCount} orders</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-black text-white">{formatMoney(reseller.gmv, "MMK")}</p>
            <p className="text-xs text-emerald-300">Profit {formatMoney(reseller.grossProfit, "MMK")}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
