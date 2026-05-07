import type { UserRole, UserStatus } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: UserRole;
    status: UserStatus;
    resellerTierId?: string | null;
    walletBalance?: string;
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
      status: UserStatus;
      resellerTierId?: string | null;
      walletBalance?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    status: UserStatus;
    resellerTierId?: string | null;
    walletBalance?: string;
  }
}
