import { z } from "zod";

const optionalText = z
  .string()
  .trim()
  .max(255, "Must be 255 characters or fewer")
  .optional()
  .or(z.literal(""));

export const resellerCustomerSchema = z.object({
  name: z.string().trim().min(1, "Customer name is required").max(120),
  phone: optionalText,
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  gameName: optionalText,
  gameUserId: optionalText,
  gameServerId: optionalText,
  gameCharacterName: optionalText,
  notes: z.string().trim().max(2000, "Notes must be 2000 characters or fewer").optional().or(z.literal("")),
});

export type ResellerCustomerInput = z.infer<typeof resellerCustomerSchema>;
