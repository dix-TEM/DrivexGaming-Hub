import { z } from "zod";

export const productSchema = z.object({ name: z.string().min(1), slug: z.string().min(1), consumerPrice: z.string().min(1), supplierCost: z.string().min(1) });
