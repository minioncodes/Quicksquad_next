// src/lib/adminAuth.ts
export const COOKIE_NAME = "qs_admin";

/** Check request cookie header for admin cookie. Return true if present. */
export function isAdminRequest(req: Request | { headers?: Record<string, string> } ) {
  const headers = (req as any).headers;
  // In Route Handlers, headers are a Headers instance: use req.headers.get
  if (typeof (req as Request).headers?.get === "function") {
    const cookie = (req as Request).headers.get("cookie") || "";
    return cookie.split(";").some((c) => c.trim().startsWith(`${COOKIE_NAME}=`));
  }
  // fallback for plain object (tests)
  const cookieHeader = headers?.cookie || "";
  return cookieHeader.split(";").some((c: string) => c.trim().startsWith(`${COOKIE_NAME}=`));
}
