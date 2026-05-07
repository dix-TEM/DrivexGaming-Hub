import Link from "next/link";
import { CustomerSearch } from "@/components/reseller/customers/customer-search";
import { CustomerTable } from "@/components/reseller/customers/customer-table";
import { getResellerCustomers } from "@/server/services/reseller-customer.service";

export default async function ResellerCustomersPage({ searchParams }: { searchParams?: { q?: string } }) {
  const query = searchParams?.q ?? "";
  const customers = await getResellerCustomers({ query });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Customers</h1>
          <p className="text-slate-400">Save repeat customer game IDs and create repeat orders faster.</p>
        </div>
        <Link href="/reseller/customers/new" className="rounded-xl bg-cyan-400 px-5 py-2 font-semibold text-slate-950 hover:bg-cyan-300">
          Add customer
        </Link>
      </div>
      <CustomerSearch query={query} />
      <CustomerTable customers={customers} />
    </div>
  );
}
