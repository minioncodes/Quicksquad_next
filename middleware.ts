import { NextResponse, NextRequest } from "next/server";

// Define the shape we expect for req.geo.country (string or object with code)
type GeoCountry = string | { code?: string } | undefined;

function isCountryObject(x: GeoCountry): x is { code?: string } {
  return typeof x === "object" && x !== null && "code" in x;
}

export function middleware(
  req: NextRequest & { geo?: { country?: string | { code?: string } } }
) {
  const url = req.nextUrl.clone();
  const pathCountry =
    url.pathname.startsWith("/au") ? "AU" : url.pathname.startsWith("/us") ? "US" : null;

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
