import { z } from "zod";

export const resellerBulkOrderRowSchema = z.object({
  productSlug: z.string().trim().min(1, "Product slug is required."),
  quantity: z.coerce.number().int().positive("Quantity must be at least 1.").max(100, "Quantity is too large."),
  gameUserId: z.string().trim().max(120).optional().or(z.literal("")),
  gameServerId: z.string().trim().max(120).optional().or(z.literal("")),
  gameCharacterName: z.string().trim().max(120).optional().or(z.literal("")),
  customerPhone: z.string().trim().max(80).optional().or(z.literal("")),
  customerEmail: z.string().trim().email("Invalid customer email.").optional().or(z.literal("")),
  sellingPrice: z.coerce.number().nonnegative("Selling price cannot be negative.").optional().or(z.literal("")),
  note: z.string().trim().max(500, "Note is too long.").optional().or(z.literal("")),
});

export const resellerBulkOrderRowsSchema = z.array(resellerBulkOrderRowSchema).min(1, "Add at least one order row.").max(200, "Bulk orders are limited to 200 rows per batch.");

export const resellerBulkOrderFormSchema = z.object({
  rowsJson: z.string().min(2, "Bulk order rows are required."),
});

export type ResellerBulkOrderRowInput = z.infer<typeof resellerBulkOrderRowSchema>;
