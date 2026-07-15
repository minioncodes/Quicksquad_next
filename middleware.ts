import { NextResponse, NextRequest } from "next/server";

// Define the shape we expect for req.geo.country (string or object with code)
type GeoCountry = string | { code?: string } | undefined;
const ADMIN_COOKIE_NAME = "qs_admin";

function isCountryObject(x: GeoCountry): x is { code?: string } {
  return typeof x === "object" && x !== null && "code" in x;
}

export function middleware(
  req: NextRequest & { geo?: { country?: string | { code?: string } } }
) {
  const url = req.nextUrl.clone();
  const { pathname } = url;
  const pathCountry =
    pathname.startsWith("/au") ? "AU" : pathname.startsWith("/us") ? "US" : null;

  // read into a local const so narrowing works predictably
  const countryField: GeoCountry = req.geo?.country;

  // Handle both shapes: "AU" or { code: "AU" }
  let geoCountry: string | undefined;
  if (typeof countryField === "string") {
    geoCountry = countryField;
  } else if (isCountryObject(countryField)) {
    geoCountry = countryField.code;
  }

  const country = pathCountry || geoCountry || "IN";

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isAdminLoginPage = pathname === "/admin/login";
  const isAdminLoginApi = pathname === "/api/admin/login";
  const isAdminLogoutApi = pathname === "/api/admin/logout";
  const adminCookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const adminEnabled = Boolean(process.env.ADMIN_PASSWORD);

  if (
    adminEnabled &&
    (isAdminPage || isAdminApi) &&
    !isAdminLoginPage &&
    !isAdminLoginApi &&
    !isAdminLogoutApi &&
    !adminCookie
  ) {
    if (isAdminApi) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // No rewriting — only continue
  const response = NextResponse.next();

  response.cookies.set("country", country, {
    path: "/",
    httpOnly: true,
  });

  response.headers.set("x-country", country);

  return response;
}

export const config = {
  matcher: ["/((?!_next|_static|_vercel|.*\\.\\w+$).*)"],
};
