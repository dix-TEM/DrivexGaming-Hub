import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const MAX_PAYMENT_PROOF_SIZE_BYTES = 5 * 1024 * 1024;

const ALLOWED_PAYMENT_PROOF_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export function validatePaymentProofFile(file: File) {
  if (!file || file.size === 0) {
    return "Payment proof image is required.";
  }

  if (file.size > MAX_PAYMENT_PROOF_SIZE_BYTES) {
    return "Payment proof image must be 5MB or smaller.";
  }

  if (!ALLOWED_PAYMENT_PROOF_TYPES.has(file.type)) {
    return "Payment proof must be a JPG, PNG, or WebP image.";
  }

  return null;
}

export async function savePaymentProofFile(file: File) {
  const validationError = validatePaymentProofFile(file);

  if (validationError) {
    throw new Error(validationError);
  }

  const extension = ALLOWED_PAYMENT_PROOF_TYPES.get(file.type);
  const safeFileName = `${randomUUID()}.${extension}`;
  const relativeDirectory = "/uploads/payment-proofs";
  const absoluteDirectory = path.join(process.cwd(), "public", "uploads", "payment-proofs");
  const absolutePath = path.join(absoluteDirectory, safeFileName);

  await mkdir(absoluteDirectory, { recursive: true });

  const bytes = await file.arrayBuffer();
  await writeFile(absolutePath, Buffer.from(bytes));

  return `${relativeDirectory}/${safeFileName}`;
}
