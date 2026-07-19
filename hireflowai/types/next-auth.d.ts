import { DefaultSession } from "next-auth";
import { UserTypeEnum } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserTypeEnum;
      companyId: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: UserTypeEnum;
    companyId: string | null;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: UserTypeEnum;
    companyId: string | null;
  }
}