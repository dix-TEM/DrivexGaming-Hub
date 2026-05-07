import { archiveResellerCustomerAction } from "@/server/actions/reseller-customer.actions";

export function ArchiveCustomerButton({ customerId }: { customerId: string }) {
  return (
    <form action={archiveResellerCustomerAction.bind(null, customerId)}>
      <button className="rounded-xl border border-red-900/70 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-950/40" type="submit">
        Archive customer
      </button>
    </form>
  );
}
