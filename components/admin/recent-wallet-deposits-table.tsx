import { formatMoney } from "@/lib/money";

type WalletDeposit = {
  id: string;
  amount: { toString(): string };
  status: string;
  reference: string | null;
  createdAt: Date;
  user: { name: string; email: string };
};

export function RecentWalletDepositsTable({ deposits }: { deposits: WalletDeposit[] }) {
  if (!deposits.length) {
    return <p className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-400">No pending wallet deposits.</p>;
  }

  return (
    <div className="space-y-3">
      {deposits.map((deposit) => (
        <div key={deposit.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-white">{deposit.user.name}</p>
              <p className="text-xs text-slate-500">{deposit.user.email}</p>
              {deposit.reference ? <p className="mt-1 text-xs text-slate-500">Ref: {deposit.reference}</p> : null}
            </div>
            <div className="text-right">
              <p className="font-black text-white">{formatMoney(deposit.amount.toString(), "MMK")}</p>
              <p className="text-xs text-amber-300">Pending review</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
