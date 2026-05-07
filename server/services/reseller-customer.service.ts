import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function requireResellerUser() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.status !== "ACTIVE") {
    redirect("/access-denied");
  }

  if (session.user.role !== UserRole.RESELLER && session.user.role !== UserRole.ADMIN) {
    redirect("/access-denied");
  }

  return session.user;
}

export async function getResellerCustomers(params?: { query?: string; includeArchived?: boolean }) {
  const user = await requireResellerUser();
  const query = params?.query?.trim();

  return prisma.resellerCustomer.findMany({
    where: {
      resellerId: user.id,
      archived: params?.includeArchived ? undefined : false,
      ...(query
        ? {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { phone: { contains: query, mode: "insensitive" } },
              { email: { contains: query, mode: "insensitive" } },
              { gameName: { contains: query, mode: "insensitive" } },
              { gameUserId: { contains: query, mode: "insensitive" } },
              { gameCharacterName: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getResellerCustomerById(id: string) {
  const user = await requireResellerUser();

  const customer = await prisma.resellerCustomer.findFirst({
    where: {
      id,
      resellerId: user.id,
    },
  });

  if (!customer) {
    redirect("/reseller/customers");
  }

  return customer;
}

export async function getProductsForRepeatOrder() {
  return prisma.product.findMany({
    where: { active: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      gameName: true,
      consumerPrice: true,
      stockStatus: true,
      active: true,
    },
  });
}
