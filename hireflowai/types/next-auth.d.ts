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

// import { DefaultSession } from "next-auth";
// import { UserTypeEnum } from "@prisma/client";

// declare module "next-auth" {
//   interface User {
//     id: string;

//     /*
//      * Optional because Candidates don't have
//      * a dashboard role.
//      */
//     role?: UserTypeEnum;

//     /*
//      * Optional because Candidates don't have
//      * a dashboard companyId in the session yet.
//      */
//     companyId?: string | null;
//   }

//   interface Session {
//     user: {
//       id: string;
//       role?: UserTypeEnum;
//       companyId?: string | null;
//     } & DefaultSession["user"];
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id?: string;
//     role?: UserTypeEnum;
//     companyId?: string | null;
//   }
// }
