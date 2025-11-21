import { NextResponse, NextRequest } from "next/server";

// Set a country cookie for every request so layout can pick the right header/footer
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathCountry =
    url.pathname.startsWith("/au") ? "AU" : url.pathname.startsWith("/us") ? "US" : null;

  // In dev, req.geo can be empty. Prefer explicit path hint if present.
  const country = pathCountry || req.geo?.country || "IN"; // fallback if geo unavailable

  const onHome = url.pathname === "/";

  const response = onHome
    ? NextResponse.rewrite(
        country === "AU"
          ? new URL("/au", req.url)
          : country === "US"
          ? new URL("/us", req.url)
          : new URL("/", req.url)
      )
    : NextResponse.next();

  response.cookies.set("country", country, {
    path: "/",
    httpOnly: true,
  });
  response.headers.set("x-country", country); // also pass via header for SSR

  return response;
}

// Run on all routes except Next internals/assets so AU/US pages also receive the cookie
export const config = {
  matcher: ["/((?!_next|_static|_vercel|.*\\.\\w+$).*)"],
};
