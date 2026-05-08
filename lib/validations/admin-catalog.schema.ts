import { DeliveryMethod, StockStatus } from "@prisma/client";
import { z } from "zod";

const nullableOptionalString = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value && value.length > 0 ? value : null));

export const categoryFormSchema = z.object({
  name: z.string().trim().min(2, "Category name is required."),
  slug: z
    .string()
    .trim()
    .min(2, "Slug is required.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only."),
  image: nullableOptionalString,
  active: z.coerce.boolean().default(false),
  sortOrder: z.coerce.number().int().min(0, "Sort order cannot be negative."),
});

export const productFormSchema = z.object({
  categoryId: z.string().trim().min(1, "Category is required."),
  name: z.string().trim().min(2, "Product name is required."),
  slug: z
    .string()
    .trim()
    .min(2, "Slug is required.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only."),
  gameName: nullableOptionalString,
  image: nullableOptionalString,
  description: nullableOptionalString,
  consumerPrice: z
    .string()
    .trim()
    .regex(/^\d+(\.\d{1,2})?$/, "Consumer price must be a positive money value."),
  supplierCost: z
    .string()
    .trim()
    .regex(/^\d+(\.\d{1,2})?$/, "Supplier cost must be zero or a positive money value."),
  stockStatus: z.nativeEnum(StockStatus),
  deliveryMethod: z.nativeEnum(DeliveryMethod),
  estimatedDeliveryTime: nullableOptionalString,
  requiredFieldsJson: z.string().trim().optional().default("[]"),
  active: z.coerce.boolean().default(false),
  sortOrder: z.coerce.number().int().min(0, "Sort order cannot be negative."),
});

export type CategoryFormInput = z.infer<typeof categoryFormSchema>;
export type ProductFormInput = z.infer<typeof productFormSchema>;

export function parseRequiredFieldsJson(value: string | undefined) {
  const raw = value?.trim();

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      throw new Error("Required fields JSON must be an array.");
    }

    for (const field of parsed) {
      if (!field || typeof field !== "object" || Array.isArray(field)) {
        throw new Error("Each required field must be an object.");
      }

      const candidate = field as Record<string, unknown>;

      if (typeof candidate.key !== "string" || candidate.key.trim().length < 1) {
        throw new Error("Each field must include a key.");
      }

      if (typeof candidate.label !== "string" || candidate.label.trim().length < 1) {
        throw new Error("Each field must include a label.");
      }

      if (candidate.required !== undefined && typeof candidate.required !== "boolean") {
        throw new Error("The required property must be true or false.");
      }
    }

    return parsed;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Invalid required fields JSON.");
  }
}
