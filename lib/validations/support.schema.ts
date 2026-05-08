import { z } from "zod";

export const createSupportTicketSchema = z.object({
  subject: z.string().trim().min(5, "Subject must be at least 5 characters.").max(160, "Subject is too long."),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(3000, "Message is too long."),
  orderId: z.string().trim().optional().or(z.literal("")),
});

export const replySupportTicketSchema = z.object({
  ticketId: z.string().trim().min(1, "Ticket ID is required."),
  message: z.string().trim().min(2, "Reply must be at least 2 characters.").max(3000, "Reply is too long."),
});

export type CreateSupportTicketInput = z.infer<typeof createSupportTicketSchema>;
export type ReplySupportTicketInput = z.infer<typeof replySupportTicketSchema>;
