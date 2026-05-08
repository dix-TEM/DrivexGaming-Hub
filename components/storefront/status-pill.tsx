import { StockStatus } from "@prisma/client";

const statusLabel: Record<StockStatus, string> = {
  IN_STOCK: "In stock",
  OUT_OF_STOCK: "Out of stock",
  LIMITED: "Limited",
  PREORDER: "Pre-order",
  DISABLED: "Disabled",
};

export function StatusPill({ status }: { status: StockStatus }) {
  const isAvailable = status === "IN_STOCK" || status === "LIMITED" || status === "PREORDER";

  return (
    <span
      className={
        isAvailable
          ? "inline-flex rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200"
          : "inline-flex rounded-full border border-rose-400/40 bg-rose-400/10 px-3 py-1 text-xs font-semibold text-rose-200"
      }
    >
      {statusLabel[status]}
    </span>
  );
}
