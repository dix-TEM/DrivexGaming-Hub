import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(100, "Name is too long."),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long.")
    .optional()
    .or(z.literal("")),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
