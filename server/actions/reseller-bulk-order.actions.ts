"use server";

import { DeliveryStatus, NotificationType, OrderStatus, PaymentStatus, Prisma, StockStatus, WalletTransactionStatus, WalletTransactionType, type Category, type Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { generateOrderNumber } from "@/lib/order-number";
import { resellerBulkOrderFormSchema, resellerBulkOrderRowsSchema, type ResellerBulkOrderRowInput } from "@/lib/validations/reseller-bulk-order.schema";
import { getRequiredFieldDefinitions } from "@/server/services/reseller-bulk-order.service";
import { getResellerProductPrice, requireActiveReseller, toAuditJson } from "@/server/services/reseller.service";

export type BulkOrderActionState = {
  ok: boolean;
  message: string;
  rowErrors?: string[];
};

const allowedStockStatuses = [StockStatus.IN_STOCK, StockStatus.LIMITED, StockStatus.PREORDER];

function formString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function normalizeOptionalString(value: unknown) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function createBulkReference() {
  return `BULK-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function parseRows(rowsJson: string) {
  let parsedJson: unknown;

  try {
    parsedJson = JSON.parse(rowsJson);
  } catch {
    throw new Error("Bulk order rows are not valid JSON. Please rebuild the preview and try again.");
  }

  const parsedRows = resellerBulkOrderRowsSchema.safeParse(parsedJson);

  if (!parsedRows.success) {
    const rowErrors = parsedRows.error.issues.map((issue) => {
      const path = issue.path.length ? issue.path.join(".") : "rows";
      return `${path}: ${issue.message}`;
    });

    const error = new Error("Please fix the invalid rows before confirming.") as Error & { rowErrors?: string[] };
    error.rowErrors = rowErrors;
    throw error;
  }

  return parsedRows.data;
}

type PreparedBulkOrder = {
  input: ResellerBulkOrderRowInput;
  product: Product & { category: Category };
  orderNumber: string;
  resellerUnitPrice: Prisma.Decimal;
  resellerTotalCost: Prisma.Decimal;
  supplierCostTotal: Prisma.Decimal;
  grossProfit: Prisma.Decimal;
  submittedFields: Record<string, string>;
  sellingPrice: Prisma.Decimal | null;
  resellerEstimatedProfit: Prisma.Decimal | null;
};

export async function createResellerBulkOrdersAction(_previousState: BulkOrderActionState, formData: FormData): Promise<BulkOrderActionState> {
  const reseller = await requireActiveReseller();

  const parsedForm = resellerBulkOrderFormSchema.safeParse({ rowsJson: formString(formData, "rowsJson") });

  if (!parsedForm.success) {
    return { ok: false, message: parsedForm.error.issues[0]?.message ?? "Bulk order rows are required." };
  }

  let rows: ResellerBulkOrderRowInput[];

  try {
    rows = parseRows(parsedForm.data.rowsJson);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Invalid bulk order rows.",
      rowErrors: error instanceof Error && "rowErrors" in error ? (error as Error & { rowErrors?: string[] }).rowErrors : undefined,
    };
  }

  const productSlugs = Array.from(new Set(rows.map((row) => row.productSlug)));
  const products = await prisma.product.findMany({
    where: { slug: { in: productSlugs } },
    include: { category: true },
  });

  const productMap = new Map(products.map((product) => [product.slug, product]));
  const rowErrors: string[] = [];
  const preparedOrders: PreparedBulkOrder[] = [];

  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    const rowNumber = index + 1;
    const product = productMap.get(row.productSlug);

    if (!product) {
      rowErrors.push(`Row ${rowNumber}: Product was not found for slug "${row.productSlug}".`);
      continue;
    }

    if (!product.active || !product.category.active) {
      rowErrors.push(`Row ${rowNumber}: Product "${product.name}" is inactive.`);
      continue;
    }

    if (!allowedStockStatuses.includes(product.stockStatus)) {
      rowErrors.push(`Row ${rowNumber}: Product "${product.name}" is not available for reseller orders.`);
      continue;
    }

    const definitions = getRequiredFieldDefinitions(product.requiredFieldsJson);
    const submittedFields: Record<string, string> = {};

    for (const definition of definitions) {
      const rowValue = normalizeOptionalString((row as Record<string, unknown>)[definition.key]);

      if (definition.required && !rowValue) {
        rowErrors.push(`Row ${rowNumber}: ${definition.label ?? definition.key} is required for ${product.name}.`);
      }

      if (rowValue) submittedFields[definition.key] = rowValue;
    }

    if (normalizeOptionalString(row.gameUserId)) submittedFields.gameUserId = normalizeOptionalString(row.gameUserId) as string;
    if (normalizeOptionalString(row.gameServerId)) submittedFields.gameServerId = normalizeOptionalString(row.gameServerId) as string;
    if (normalizeOptionalString(row.gameCharacterName)) submittedFields.gameCharacterName = normalizeOptionalString(row.gameCharacterName) as string;
    if (normalizeOptionalString(row.customerEmail)) submittedFields.customerEmail = normalizeOptionalString(row.customerEmail) as string;
    if (normalizeOptionalString(row.customerPhone)) submittedFields.customerPhone = normalizeOptionalString(row.customerPhone) as string;

    const resellerUnitPrice = await getResellerProductPrice(product.id, reseller.resellerTierId);
    const resellerTotalCost = resellerUnitPrice.mul(row.quantity);
    const supplierCostTotal = product.supplierCost.mul(row.quantity);
    const grossProfit = resellerTotalCost.sub(supplierCostTotal);
    const sellingPrice = row.sellingPrice !== undefined && row.sellingPrice !== "" ? new Prisma.Decimal(row.sellingPrice) : null;
    const resellerEstimatedProfit = sellingPrice ? sellingPrice.mul(row.quantity).sub(resellerTotalCost) : null;
    const orderNumber = await generateOrderNumber();

    preparedOrders.push({
      input: row,
      product,
      orderNumber,
      resellerUnitPrice,
      resellerTotalCost,
      supplierCostTotal,
      grossProfit,
      submittedFields,
      sellingPrice,
      resellerEstimatedProfit,
    });
  }

  if (rowErrors.length > 0) {
    return { ok: false, message: "Some rows are invalid. No orders were created.", rowErrors };
  }

  const totalCost = preparedOrders.reduce((total, order) => total.add(order.resellerTotalCost), new Prisma.Decimal(0));
  const bulkReference = createBulkReference();

  try {
    await prisma.$transaction(async (tx) => {
      const currentUser = await tx.user.findUnique({
        where: { id: reseller.id },
        select: { id: true, role: true, status: true, walletBalance: true },
      });

      if (!currentUser) throw new Error("Reseller account was not found.");
      if (currentUser.role !== "RESELLER" || currentUser.status !== "ACTIVE") throw new Error("Your reseller account is not active.");
      if (currentUser.walletBalance.lt(totalCost)) throw new Error("Insufficient wallet balance. Please deposit funds before confirming this bulk order.");

      const balanceBefore = currentUser.walletBalance;
      const balanceAfter = balanceBefore.sub(totalCost);
      const createdOrderNumbers: string[] = [];

      for (const prepared of preparedOrders) {
        const order = await tx.order.create({
          data: {
            orderNumber: prepared.orderNumber,
            userId: reseller.id,
            resellerId: reseller.id,
            productId: prepared.product.id,
            quantity: prepared.input.quantity,
            unitPrice: prepared.resellerUnitPrice,
            totalPrice: prepared.resellerTotalCost,
            supplierCost: prepared.supplierCostTotal,
            grossProfit: prepared.grossProfit,
            gameUserId: normalizeOptionalString(prepared.input.gameUserId),
            gameServerId: normalizeOptionalString(prepared.input.gameServerId),
            gameCharacterName: normalizeOptionalString(prepared.input.gameCharacterName),
            customerEmail: normalizeOptionalString(prepared.input.customerEmail),
            customerPhone: normalizeOptionalString(prepared.input.customerPhone),
            requiredFieldsJson: {
              productRequiredFields: prepared.product.requiredFieldsJson,
              submittedFields: prepared.submittedFields,
              resellerMeta: {
                bulkReference,
                resellerUnitPrice: prepared.resellerUnitPrice.toString(),
                resellerTotalCost: prepared.resellerTotalCost.toString(),
                suggestedSellingPrice: prepared.product.consumerPrice.toString(),
                resellerSellingPrice: prepared.sellingPrice?.toString() ?? null,
                resellerEstimatedProfit: prepared.resellerEstimatedProfit?.toString() ?? null,
              },
            },
            paymentStatus: PaymentStatus.PAID,
            orderStatus: OrderStatus.PROCESSING,
            deliveryStatus: DeliveryStatus.PROCESSING,
            customerNote: normalizeOptionalString(prepared.input.note) ?? null,
            internalNote: `Created from reseller bulk order batch ${bulkReference}`,
          },
        });

        createdOrderNumbers.push(order.orderNumber);
      }

      await tx.walletTransaction.create({
        data: {
          userId: reseller.id,
          type: WalletTransactionType.ORDER_DEDUCTION,
          amount: totalCost,
          balanceBefore,
          balanceAfter,
          status: WalletTransactionStatus.COMPLETED,
          reference: bulkReference,
          note: `Bulk reseller order deduction for ${createdOrderNumbers.length} orders: ${createdOrderNumbers.join(", ")}`,
        },
      });

      await tx.user.update({
        where: { id: reseller.id },
        data: { walletBalance: balanceAfter },
      });

      await tx.notification.create({
        data: {
          userId: reseller.id,
          type: NotificationType.ORDER,
          title: "Bulk orders created",
          message: `${createdOrderNumbers.length} reseller orders were created. ${totalCost.toString()} was deducted from your wallet.`,
        },
      });

      await tx.auditLog.create({
        data: {
          actorId: reseller.id,
          action: "RESELLER_BULK_ORDERS_CREATED",
          entityType: "WalletTransaction",
          entityId: bulkReference,
          newValueJson: toAuditJson({ bulkReference, orderNumbers: createdOrderNumbers, totalCost, balanceBefore, balanceAfter }),
        },
      });
    });

    revalidatePath("/reseller");
    revalidatePath("/reseller/orders");
    revalidatePath("/reseller/wallet");
    revalidatePath("/admin/orders");
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Bulk order creation failed. Please try again." };
  }

  redirect(`/reseller/orders?bulkReference=${encodeURIComponent(bulkReference)}`);
}
