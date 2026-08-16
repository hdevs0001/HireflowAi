import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

function homeFor(role?: string) {
  if (role === "HR") return "/hr/dashboard";
  if (role === "SUPERUSER") return "/superadmin/dashboard";
  return "/admin/dashboard"; // ADMIN
}

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const isLoggedIn = !!session?.user;
  const role = session?.user?.role;
  const companyId = session?.user?.companyId;

  const path = nextUrl.pathname;
  const isAdminRoute = path.startsWith("/admin");
  const isSuperAdminRoute = path.startsWith("/superadmin");
  const isHrRoute = path.startsWith("/hr");
  const isOnboardRoute = path.startsWith("/onboard");
  const isLoginRoute = path.startsWith("/login");

  // Not logged in - only /login is reachable
  if (!isLoggedIn) {
    if (isLoginRoute) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Logged in but sitting on /login - bounce to the right place
  if (isLoginRoute) {
    return NextResponse.redirect(
      new URL(companyId ? homeFor(role) : "/onboard", nextUrl)
    );
  }

  // Logged in, no company yet - force onboarding regardless of what they tried to open
  if (!companyId) {
    if (isOnboardRoute) return NextResponse.next();
    return NextResponse.redirect(new URL("/onboard", nextUrl));
  }

  // Logged in, has a company, but still on /onboard - nothing left to do there
  if (isOnboardRoute) {
    return NextResponse.redirect(new URL(homeFor(role), nextUrl));
  }

  // Role gating - each area is exclusive to its own role
  if (isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL(homeFor(role), nextUrl));
  }

  if (isSuperAdminRoute && role !== "SUPERUSER") {
    return NextResponse.redirect(new URL(homeFor(role), nextUrl));
  }

  if (isHrRoute && role !== "HR") {
    return NextResponse.redirect(new URL(homeFor(role), nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/superadmin/:path*", "/hr/:path*", "/onboard", "/login"],
};