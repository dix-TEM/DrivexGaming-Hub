import { Prisma, StockStatus } from "@prisma/client";

import { prisma } from "@/lib/db";
import { getResellerAccount, getResellerProductPrice } from "@/server/services/reseller.service";

export type BulkOrderProductOption = {
  id: string;
  slug: string;
  name: string;
  gameName: string | null;
  consumerPrice: string;
  resellerPrice: string;
  estimatedDeliveryTime: string | null;
  stockStatus: string;
  requiredFieldsJson: unknown;
};

export type RequiredFieldDefinition = {
  key: string;
  label?: string;
  type?: string;
  required?: boolean;
};

export function getRequiredFieldDefinitions(requiredFieldsJson: unknown): RequiredFieldDefinition[] {
  if (!requiredFieldsJson || typeof requiredFieldsJson !== "object") return [];

  const value = requiredFieldsJson as { fields?: unknown };
  if (!Array.isArray(value.fields)) return [];

  return value.fields.filter((field): field is RequiredFieldDefinition => {
    return Boolean(field && typeof field === "object" && typeof (field as RequiredFieldDefinition).key === "string");
  });
}

export async function getBulkOrderProductOptions(userId: string): Promise<BulkOrderProductOption[]> {
  const reseller = await getResellerAccount(userId);

  const products = await prisma.product.findMany({
    where: {
      active: true,
      category: { active: true },
      stockStatus: { in: [StockStatus.IN_STOCK, StockStatus.LIMITED, StockStatus.PREORDER] },
    },
    include: { category: true },
    orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }, { name: "asc" }],
  });

  const rows: BulkOrderProductOption[] = [];

  for (const product of products) {
    const resellerPrice = await getResellerProductPrice(product.id, reseller.resellerTier?.id ?? null);

    rows.push({
      id: product.id,
      slug: product.slug,
      name: product.name,
      gameName: product.gameName,
      consumerPrice: product.consumerPrice.toString(),
      resellerPrice: resellerPrice.toString(),
      estimatedDeliveryTime: product.estimatedDeliveryTime,
      stockStatus: product.stockStatus,
      requiredFieldsJson: product.requiredFieldsJson,
    });
  }

  return rows;
}

export function decimalSum(values: Prisma.Decimal[]) {
  return values.reduce((total, value) => total.add(value), new Prisma.Decimal(0));
}
