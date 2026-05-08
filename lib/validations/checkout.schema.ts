import { z } from "zod";

export const checkoutSchema = z.object({
  productSlug: z.string().min(1, "Product slug is required."),
  quantity: z.coerce.number().int().positive("Quantity must be at least 1.").max(99, "Quantity is too large."),
  paymentMethodId: z.string().min(1, "Payment method is required."),
  customerNote: z.string().max(500, "Customer note is too long.").optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
