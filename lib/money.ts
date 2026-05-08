export function formatMoney(amount: number | string, currency = "MMK") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(Number(amount));
}
