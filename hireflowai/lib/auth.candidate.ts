// lib/auth.candidate.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// ── Type augmentation — must be in a file TS definitely compiles ───────────
declare module "next-auth" {
  interface Session {
    candidate?: {
      googleSub: string;
      email: string;
      name?: string;
      image?: string;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    googleSub?: string;
  }
}
// ─────────────────────────────────────────────────────────────────────────
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CANDIDATE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CANDIDATE_SECRET_ID!,
    }),
  ],

  // This is what makes signIn()/callback URLs resolve to /api/candidate-auth/*
  // instead of the default /api/auth/* — the exact thing that keeps this
  // instance from colliding with your dashboard's Auth.js config.
  basePath: "/api/candidate-auth",

  // JWT strategy: no PrismaAdapter here, on purpose. Candidate identity gets
  // written to the DB manually in complete/page.tsx (the upsert), once we
  // also know companyId/jobId from the Redis session — Auth.js's own adapter
  // has no way to know those at sign-in time, so we skip it here entirely.
  session: { strategy: "jwt" },

  cookies: {
    sessionToken: {
      name: "hireflow-candidate.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  callbacks: {
    // Runs once, right after Google confirms identity. We just carry the
    // raw profile fields into the JWT — no DB writes happen here.
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.googleSub = profile.sub ?? undefined;
        token.email = profile.email;
        token.name = profile.name;
        token.picture = profile.picture;
      }
      return token;
    },

    // Shapes what auth() returns to server components (complete/page.tsx
    // reads session.candidate.email / .googleSub / .name from here).
    async session({ session, token }) {
      session.candidate = {
        googleSub: token.googleSub as string,
        email: token.email as string,
        name: token.name as string | undefined,
        image: token.picture as string | undefined,
      };
      return session;
    },
  },

  pages: {
    // Optional — only needed if you want a custom error page instead of
    // Auth.js's default; leave default for now, add later if useful.
  },
});
