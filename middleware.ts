import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const country = req.geo?.country || "IN"; // fallback

  if (req.nextUrl.pathname === "/") {
    if (country === "AU") {
      return NextResponse.rewrite(new URL("/au", req.url));
    }
    if (country === "US") {
      return NextResponse.rewrite(new URL("/us", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
