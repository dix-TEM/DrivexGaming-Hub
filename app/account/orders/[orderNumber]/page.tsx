import Link from "next/link";

import { AccountNav } from "@/components/account/account-nav";
import { OrderDetailCard } from "@/components/account/order-detail-card";
import { getUserOrderByNumber, requireActiveUser } from "@/server/services/account.service";

type AccountOrderDetailPageProps = {
  params: Promise<{ orderNumber: string }>;
};

export default async function AccountOrderDetailPage({ params }: AccountOrderDetailPageProps) {
  const { orderNumber } = await params;
  const user = await requireActiveUser();
  const order = await getUserOrderByNumber(user.id, orderNumber);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AccountNav />
        <div className="mb-6">
          <Link href="/account/orders" className="text-sm font-bold text-cyan-200 hover:text-cyan-100">
            ← Back to orders
          </Link>
        </div>
        <OrderDetailCard order={order} />
      </div>
    </main>
  );
}
