import { prisma } from "@/lib/db";

const RANDOM_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomSuffix(length = 6) {
  let value = "";

  for (let index = 0; index < length; index += 1) {
    value += RANDOM_ALPHABET[Math.floor(Math.random() * RANDOM_ALPHABET.length)];
  }

  return value;
}

export async function generateOrderNumber() {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replaceAll("-", "");

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const orderNumber = `GTH-${datePart}-${randomSuffix()}`;
    const existingOrder = await prisma.order.findUnique({
      where: { orderNumber },
      select: { id: true },
    });

    if (!existingOrder) {
      return orderNumber;
    }
  }

  throw new Error("Unable to generate a unique order number. Please try again.");
}
