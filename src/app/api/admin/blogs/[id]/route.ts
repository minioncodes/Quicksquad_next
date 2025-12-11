// src/app/api/admin/blogs/[id]/route.ts
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";
import mongoose from "mongoose";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

/* Minimal cookie interface matching what we call (.get(name)) */
interface SimpleCookie {
  name: string;
  value: string;
}
interface SimpleCookies {
  get(name: string): SimpleCookie | undefined;
}

/* Handler context: params may be sync or Promise (toolchain-dependent) */
type HandlerContext =
  | { params?: { id?: string } }
  | { params?: Promise<{ id?: string }> };

/* Generic Awaitable */
type Awaitable<T> = T | Promise<T>;

/* Narrow, safe promise detector without using `any` */
function isPromise<T>(v: Awaitable<T>): v is Promise<T> {
  // check typical duck-typed .then function
  // cast to unknown then to object-with-then to avoid `any`
  const maybe = v as unknown;
  return typeof (maybe as { then?: unknown }).then === "function";
}

async function isAuthorized(req: NextRequest): Promise<boolean> {
  if (!ADMIN_PASSWORD) {
    console.warn("ADMIN_PASSWORD not configured - rejecting admin requests.");
    return false;
  }

  // 1) Bearer token
  const auth = req.headers.get("authorization") || "";
  const [type, token] = auth.split(" ");
  if (type === "Bearer" && token === ADMIN_PASSWORD) return true;

  // 2) cookies() — handle both sync and Promise-returning shapes
  try {
    const maybeCookies = cookies() as Awaitable<SimpleCookies>;
    const rCookies = isPromise(maybeCookies) ? await maybeCookies : maybeCookies;

    const cookieNamesToCheck = ["qs_admin_session", "qs_admin", "qs_admin_token"];
    for (const name of cookieNamesToCheck) {
      const c = rCookies.get(name);
      if (!c) continue;
      if (c.value === ADMIN_PASSWORD) return true;
      if (c.value === "1") return true; // optional session marker
    }
  } catch (err) {
    console.warn("cookies() threw in isAuthorized fallback:", String(err));
  }

  // 3) Raw Cookie header parse fallback
  try {
    const raw = req.headers.get("cookie") || "";
    if (raw) {
      const parsed = Object.fromEntries(
        raw.split(";").map((s) => {
          const idx = s.indexOf("=");
          if (idx === -1) return [s.trim(), ""];
          const k = s.slice(0, idx).trim();
          const v = s.slice(idx + 1).trim();
          return [k, decodeURIComponent(v)];
        })
      ) as Record<string, string>;

      const cookieNamesToCheck = ["qs_admin_session", "qs_admin", "qs_admin_token"];
      for (const name of cookieNamesToCheck) {
        const v = parsed[name];
        if (!v) continue;
        if (v === ADMIN_PASSWORD) return true;
        if (v === "1") return true;
      }
    }
  } catch (err) {
    console.warn("raw cookie parse failed:", String(err));
  }

  return false;
}

function devResponse(data: unknown, status = 500) {
  return NextResponse.json(data, { status });
}
function extractErrorMessage(err: unknown): string {
  if (!err) return String(err);
  if (err instanceof Error) return err.message;
  try {
    return String(err);
  } catch {
    return "Unknown error";
  }
}

/** Robustly extract id param:
 * - Prefer `params?.id`
 * - Fallback to parsing the request URL path last segment
 */
function getIdFromRequest(req: Request, params?: { id?: string } | null): string | undefined {
  if (params && typeof params.id === "string" && params.id) return params.id;

  try {
    const u = new URL(req.url);
    const segments = u.pathname.split("/").filter(Boolean);
    if (segments.length > 0) {
      const possible = segments[segments.length - 1];
      return possible || undefined;
    }
  } catch {
    // ignore
  }

  return undefined;
}

/* -------------------- Handlers -------------------- */
/* Use context?: HandlerContext (no default {} so no implicit any) */
export async function GET(req: NextRequest, context?: HandlerContext) {
  try {
    const paramsResolved =
      context?.params && isPromise(context.params) ? await context.params : (context as { params?: { id?: string } })?.params;
    const id = getIdFromRequest(req, paramsResolved);
    if (!id) {
      console.warn("GET /api/admin/blogs/[id] called without params.id and fallback failed. req.url:", req.url);
      return NextResponse.json({ error: "Missing id param" }, { status: 400 });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    await connectDB();
    const blog = await Blog.findById(id).lean();
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (err: unknown) {
    console.error("GET /api/admin/blogs/[id] error:", err);
    return devResponse({ error: "Server error", details: extractErrorMessage(err) }, 500);
  }
}

export async function PUT(req: NextRequest, context?: HandlerContext) {
  try {
    if (!(await isAuthorized(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const paramsResolved =
      context?.params && isPromise(context.params) ? await context.params : (context as { params?: { id?: string } })?.params;
    const id = getIdFromRequest(req, paramsResolved);
    if (!id) {
      console.warn("PUT /api/admin/blogs/[id] called without params.id and fallback failed. req.url:", req.url);
      return NextResponse.json({ error: "Missing id param" }, { status: 400 });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const raw = await req.json().catch(() => null) as Record<string, unknown> | null;
    if (!raw) return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });

    const title = typeof raw.title === "string" ? raw.title.trim() : "";
    const slug = typeof raw.slug === "string" ? raw.slug.trim() : "";
    const image = typeof raw.image === "string" ? raw.image : undefined;
    const date = typeof raw.date === "string" ? raw.date : undefined;
    const category = typeof raw.category === "string" ? raw.category : undefined;
    const content = typeof raw.content === "string" ? raw.content : "";

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Missing required fields: title, slug, content" }, { status: 400 });
    }

    await connectDB();

    const conflict = await Blog.findOne({ slug }).lean();
    if (conflict && String(conflict._id) !== String(id)) {
      return NextResponse.json({ error: "Slug already used by another blog" }, { status: 409 });
    }

    const updated = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        image: image ?? "",
        date: date ?? new Date().toISOString(),
        category: category ?? "General",
        content,
      },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true, blog: updated });
  } catch (err: unknown) {
    console.error("PUT /api/admin/blogs/[id] error:", err);
    return devResponse({ error: "Server error while updating blog", details: extractErrorMessage(err) }, 500);
  }
}

export async function DELETE(req: NextRequest, context?: HandlerContext) {
  try {
    if (!(await isAuthorized(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const paramsResolved =
      context?.params && isPromise(context.params) ? await context.params : (context as { params?: { id?: string } })?.params;
    const id = getIdFromRequest(req, paramsResolved);
    if (!id) {
      console.warn("DELETE /api/admin/blogs/[id] called without params.id and fallback failed. req.url:", req.url);
      return NextResponse.json({ error: "Missing id param" }, { status: 400 });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    await connectDB();
    const deleted = await Blog.findByIdAndDelete(id).lean();
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("DELETE /api/admin/blogs/[id] error:", err);
    return devResponse({ error: "Server error while deleting blog", details: extractErrorMessage(err) }, 500);
  }
}
