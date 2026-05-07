import Link from "next/link";

export function CustomerTable({ customers }: { customers: Array<{ id: string; name: string; phone: string | null; email: string | null; gameName: string | null; gameUserId: string | null; gameServerId: string | null; createdAt: Date }> }) {
  if (customers.length === 0) {
    return <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-slate-400">No customers found yet.</div>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-slate-900 text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Game</th>
            <th className="px-4 py-3">Game ID</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {customers.map((customer) => (
            <tr key={customer.id} className="text-slate-200">
              <td className="px-4 py-3 font-medium">{customer.name}</td>
              <td className="px-4 py-3 text-slate-400">
                <div>{customer.phone || "-"}</div>
                <div>{customer.email || "-"}</div>
              </td>
              <td className="px-4 py-3">{customer.gameName || "-"}</td>
              <td className="px-4 py-3 text-slate-400">
                {customer.gameUserId || "-"}
                {customer.gameServerId ? ` / ${customer.gameServerId}` : ""}
              </td>
              <td className="px-4 py-3 text-slate-400">{customer.createdAt.toLocaleDateString()}</td>
              <td className="px-4 py-3 text-right">
                <Link href={`/reseller/customers/${customer.id}`} className="rounded-lg border border-slate-700 px-3 py-1 text-cyan-300 hover:bg-slate-900">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
