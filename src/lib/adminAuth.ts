// src/lib/adminAuth.ts
export const COOKIE_NAME = "qs_admin";

/** Check request cookie header for admin cookie. Return true if present. */
type RequestLike = Request | { headers?: Headers | Record<string, string> };
type HeadersLike = Headers | Record<string, string>;

function isHeadersInstance(headers: HeadersLike | undefined): headers is Headers {
  return headers instanceof Headers || typeof headers?.get === "function";
}

export function isAdminRequest(req: RequestLike) {
  const headers = req.headers;
  // In Route Handlers, headers are a Headers instance: use req.headers.get
  if (isHeadersInstance(headers)) {
    const cookie = headers.get("cookie") || "";
    return cookie.split(";").some((c) => c.trim().startsWith(`${COOKIE_NAME}=`));
  }
  // fallback for plain object (tests)
  const cookieHeader =
    headers && !("get" in headers) ? headers.cookie || "" : "";
  return cookieHeader.split(";").some((c: string) => c.trim().startsWith(`${COOKIE_NAME}=`));
}
