import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [], // populated only in the full auth.ts - middleware never calls provider.authorize()
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "SUPERUSER" | "ADMIN" | "HR";
        session.user.companyId = token.companyId as string | null;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;