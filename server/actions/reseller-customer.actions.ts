"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { resellerCustomerSchema } from "@/lib/validations/reseller-customer.schema";
import { requireResellerUser } from "@/server/services/reseller-customer.service";

function clean(value: FormDataEntryValue | null) {
  const text = typeof value === "string" ? value.trim() : "";
  return text.length ? text : null;
}

export async function createResellerCustomerAction(formData: FormData) {
  const user = await requireResellerUser();

  const parsed = resellerCustomerSchema.safeParse({
    name: clean(formData.get("name")) ?? "",
    phone: clean(formData.get("phone")) ?? "",
    email: clean(formData.get("email")) ?? "",
    gameName: clean(formData.get("gameName")) ?? "",
    gameUserId: clean(formData.get("gameUserId")) ?? "",
    gameServerId: clean(formData.get("gameServerId")) ?? "",
    gameCharacterName: clean(formData.get("gameCharacterName")) ?? "",
    notes: clean(formData.get("notes")) ?? "",
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message ?? "Invalid customer data" };
  }

  const customer = await prisma.resellerCustomer.create({
    data: {
      resellerId: user.id,
      name: parsed.data.name,
      phone: parsed.data.phone || null,
      email: parsed.data.email || null,
      gameName: parsed.data.gameName || null,
      gameUserId: parsed.data.gameUserId || null,
      gameServerId: parsed.data.gameServerId || null,
      gameCharacterName: parsed.data.gameCharacterName || null,
      notes: parsed.data.notes || null,
    },
  });

  revalidatePath("/reseller/customers");
  redirect(`/reseller/customers/${customer.id}`);
}

export async function updateResellerCustomerAction(customerId: string, formData: FormData) {
  const user = await requireResellerUser();

  const existing = await prisma.resellerCustomer.findFirst({
    where: { id: customerId, resellerId: user.id },
    select: { id: true },
  });

  if (!existing) {
    return { ok: false, message: "Customer not found" };
  }

  const parsed = resellerCustomerSchema.safeParse({
    name: clean(formData.get("name")) ?? "",
    phone: clean(formData.get("phone")) ?? "",
    email: clean(formData.get("email")) ?? "",
    gameName: clean(formData.get("gameName")) ?? "",
    gameUserId: clean(formData.get("gameUserId")) ?? "",
    gameServerId: clean(formData.get("gameServerId")) ?? "",
    gameCharacterName: clean(formData.get("gameCharacterName")) ?? "",
    notes: clean(formData.get("notes")) ?? "",
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message ?? "Invalid customer data" };
  }

  await prisma.resellerCustomer.update({
    where: { id: customerId },
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone || null,
      email: parsed.data.email || null,
      gameName: parsed.data.gameName || null,
      gameUserId: parsed.data.gameUserId || null,
      gameServerId: parsed.data.gameServerId || null,
      gameCharacterName: parsed.data.gameCharacterName || null,
      notes: parsed.data.notes || null,
    },
  });

  revalidatePath("/reseller/customers");
  revalidatePath(`/reseller/customers/${customerId}`);
  redirect(`/reseller/customers/${customerId}`);
}

export async function archiveResellerCustomerAction(customerId: string) {
  const user = await requireResellerUser();

  const existing = await prisma.resellerCustomer.findFirst({
    where: { id: customerId, resellerId: user.id },
    select: { id: true },
  });

  if (!existing) {
    return { ok: false, message: "Customer not found" };
  }

  await prisma.resellerCustomer.update({
    where: { id: customerId },
    data: { archived: true },
  });

  revalidatePath("/reseller/customers");
  redirect("/reseller/customers");
}
