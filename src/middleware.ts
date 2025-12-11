// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "qs_admin";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect admin UI and admin API
  const isAdminPath = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (!isAdminPath && !isAdminApi) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (cookie) {
    return NextResponse.next();
  }

  // If request is for an API, return 401 JSON
  if (isAdminApi) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // For UI pages, redirect to login with a `from` param
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

// apply middleware to admin routes
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
