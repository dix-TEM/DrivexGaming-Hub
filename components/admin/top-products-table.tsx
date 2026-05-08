import { formatMoney } from "@/lib/money";

type TopProduct = {
  productId: string;
  name: string;
  gameName: string;
  orderCount: number;
  gmv: number;
  grossProfit: number;
};

export function TopProductsTable({ products }: { products: TopProduct[] }) {
  if (!products.length) {
    return <p className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-400">No product sales yet.</p>;
  }

  return (
    <div className="space-y-3">
      {products.map((product, index) => (
        <div key={product.productId} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-300/10 text-sm font-black text-cyan-200">#{index + 1}</span>
            <div>
              <p className="font-bold text-white">{product.name}</p>
              <p className="text-xs text-slate-500">{product.gameName} · {product.orderCount} orders</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-black text-white">{formatMoney(product.gmv, "MMK")}</p>
            <p className="text-xs text-emerald-300">Profit {formatMoney(product.grossProfit, "MMK")}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
