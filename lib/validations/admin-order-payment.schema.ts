import { DeliveryStatus, OrderStatus, PaymentReviewStatus, PaymentStatus } from "@prisma/client";
import { z } from "zod";

const optionalText = z
  .string()
  .trim()
  .max(2000, "Text must be 2000 characters or fewer.")
  .optional()
  .transform((value) => (value && value.length > 0 ? value : undefined));

export const rejectPaymentSchema = z.object({
  paymentId: z.string().min(1, "Payment ID is required."),
  rejectionReason: z
    .string()
    .trim()
    .min(3, "Rejection reason is required.")
    .max(1000, "Rejection reason must be 1000 characters or fewer."),
});

export const approvePaymentSchema = z.object({
  paymentId: z.string().min(1, "Payment ID is required."),
});

export const updateOrderNotesSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required."),
  customerNote: optionalText,
  internalNote: optionalText,
});

export const completeOrderSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required."),
  proofOfDelivery: optionalText,
  customerNote: optionalText,
});

export const failOrderSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required."),
  failureReason: z
    .string()
    .trim()
    .min(3, "Failure reason is required.")
    .max(1000, "Failure reason must be 1000 characters or fewer."),
});

export const cancelOrderSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required."),
  cancelReason: z
    .string()
    .trim()
    .min(3, "Cancellation reason is required.")
    .max(1000, "Cancellation reason must be 1000 characters or fewer."),
});

export const refundOrderSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required."),
  refundReason: z
    .string()
    .trim()
    .min(3, "Refund reason is required.")
    .max(1000, "Refund reason must be 1000 characters or fewer."),
});

export const adminOrderFilterSchema = z.object({
  q: z.string().trim().optional(),
  orderStatus: z.nativeEnum(OrderStatus).optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  deliveryStatus: z.nativeEnum(DeliveryStatus).optional(),
  productId: z.string().optional(),
});

export const adminPaymentFilterSchema = z.object({
  q: z.string().trim().optional(),
  status: z.nativeEnum(PaymentReviewStatus).optional(),
});
