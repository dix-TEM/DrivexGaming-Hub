import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

const authRoutes = ["/auth/login", "/auth/register"];

function isAuthRoute(pathname: string) {
  return authRoutes.some((route) => pathname.startsWith(route));
}

export default auth((request) => {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;
  const user = request.auth?.user;

  if (isAuthRoute(pathname) && user) {
    if (user.role === "ADMIN") return NextResponse.redirect(new URL("/admin", nextUrl));
    if (user.role === "RESELLER") return NextResponse.redirect(new URL("/reseller", nextUrl));
    return NextResponse.redirect(new URL("/account", nextUrl));
  }

  const protectedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/reseller") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/orders") ||
    pathname.startsWith("/checkout");

  if (!protectedRoute) {
    return NextResponse.next();
  }

  if (!user) {
    const loginUrl = new URL("/auth/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", `${nextUrl.pathname}${nextUrl.search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/account", nextUrl));
  }

  if (pathname.startsWith("/reseller") && user.role !== "RESELLER" && user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/account", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/reseller/:path*",
    "/account/:path*",
    "/orders/:path*",
    "/checkout/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
