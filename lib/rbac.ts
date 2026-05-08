import { UserRole } from "@prisma/client";

import { auth } from "@/lib/auth";

export function canAccessRole(userRole: UserRole, allowedRoles: UserRole[]) {
  return allowedRoles.includes(userRole);
}

export function assertRole(userRole: UserRole | undefined, allowedRoles: UserRole[]) {
  if (!userRole || !allowedRoles.includes(userRole)) {
    throw new Error("Unauthorized");
  }
}

export async function requireAuth() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Authentication required");
  }

  return session.user;
}

export async function requireRole(allowedRoles: UserRole[]) {
  const user = await requireAuth();

  if (!allowedRoles.includes(user.role)) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function requireAdmin() {
  return requireRole([UserRole.ADMIN]);
}

export async function requireReseller() {
  return requireRole([UserRole.RESELLER]);
}
