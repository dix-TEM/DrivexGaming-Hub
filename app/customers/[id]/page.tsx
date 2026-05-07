import Link from "next/link";
import { ArchiveCustomerButton } from "@/components/reseller/customers/archive-customer-button";
import { getProductsForRepeatOrder, getResellerCustomerById } from "@/server/services/reseller-customer.service";

export default async function ResellerCustomerDetailPage({ params }: { params: { id: string } }) {
  const customer = await getResellerCustomerById(params.id);
  const products = await getProductsForRepeatOrder();

  const matchingProducts = products.filter((product) => {
    if (!customer.gameName) return true;
    return product.gameName?.toLowerCase().includes(customer.gameName.toLowerCase()) || product.name.toLowerCase().includes(customer.gameName.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/reseller/customers" className="text-sm text-cyan-300 hover:text-cyan-200">Back to customers</Link>
          <h1 className="mt-3 text-2xl font-bold text-white">{customer.name}</h1>
          <p className="text-slate-400">Customer profile and repeat order shortcuts.</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/reseller/customers/${customer.id}/edit`} className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900">Edit</Link>
          <ArchiveCustomerButton customerId={customer.id} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
          <h2 className="font-semibold text-white">Contact</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="text-slate-500">Phone</dt><dd className="text-slate-200">{customer.phone || "-"}</dd></div>
            <div><dt className="text-slate-500">Email</dt><dd className="text-slate-200">{customer.email || "-"}</dd></div>
          </dl>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
          <h2 className="font-semibold text-white">Game Details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="text-slate-500">Game</dt><dd className="text-slate-200">{customer.gameName || "-"}</dd></div>
            <div><dt className="text-slate-500">Game User ID</dt><dd className="text-slate-200">{customer.gameUserId || "-"}</dd></div>
            <div><dt className="text-slate-500">Server ID</dt><dd className="text-slate-200">{customer.gameServerId || "-"}</dd></div>
            <div><dt className="text-slate-500">Character</dt><dd className="text-slate-200">{customer.gameCharacterName || "-"}</dd></div>
          </dl>
        </div>
      </div>

      {customer.notes ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
          <h2 className="font-semibold text-white">Notes</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm text-slate-300">{customer.notes}</p>
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
        <h2 className="font-semibold text-white">Create repeat order</h2>
        <p className="mt-1 text-sm text-slate-400">Choose a product and continue to reseller order creation. Customer details can be copied into the order form.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {matchingProducts.slice(0, 9).map((product) => (
            <Link
              key={product.id}
              href={`/reseller/create-order?product=${product.slug}&customer=${customer.id}`}
              className="rounded-xl border border-slate-800 bg-slate-900 p-4 hover:border-cyan-500/60"
            >
              <div className="font-medium text-slate-100">{product.name}</div>
              <div className="mt-1 text-sm text-slate-400">{product.gameName}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
