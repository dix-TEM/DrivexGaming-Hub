import Link from "next/link";
import { CustomerForm } from "@/components/reseller/customers/customer-form";
import { getResellerCustomerById } from "@/server/services/reseller-customer.service";

export default async function EditResellerCustomerPage({ params }: { params: { id: string } }) {
  const customer = await getResellerCustomerById(params.id);

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/reseller/customers/${customer.id}`} className="text-sm text-cyan-300 hover:text-cyan-200">Back to customer</Link>
        <h1 className="mt-3 text-2xl font-bold text-white">Edit Customer</h1>
        <p className="text-slate-400">Update saved customer and game details.</p>
      </div>
      <CustomerForm mode="edit" customer={customer} />
    </div>
  );
}
