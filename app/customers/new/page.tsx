import Link from "next/link";
import { CustomerForm } from "@/components/reseller/customers/customer-form";
import { requireResellerUser } from "@/server/services/reseller-customer.service";

export default async function NewResellerCustomerPage() {
  await requireResellerUser();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/reseller/customers" className="text-sm text-cyan-300 hover:text-cyan-200">Back to customers</Link>
        <h1 className="mt-3 text-2xl font-bold text-white">Add Customer</h1>
        <p className="text-slate-400">Store customer contact and game details for repeat orders.</p>
      </div>
      <CustomerForm mode="create" />
    </div>
  );
}
