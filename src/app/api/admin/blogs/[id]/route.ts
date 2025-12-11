// src/app/api/admin/blogs/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";
import mongoose from "mongoose";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

/** Determine authorization from Bearer header or cookies.
 *  Returns true when authorized, false otherwise.
 */
async function isAuthorized(req: Request): Promise<boolean> {
  if (!ADMIN_PASSWORD) {
    console.warn("ADMIN_PASSWORD not configured - rejecting admin requests.");
    return false;
  }

  // 1) Bearer token
  const auth = req.headers.get("authorization") || "";
  const [type, token] = auth.split(" ");
  if (type === "Bearer" && token === ADMIN_PASSWORD) return true;

  // 2) Next cookies() API
  try {
    const rCookies = await cookies();
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
  // 1) direct params (recommended)
  if (params && typeof params.id === "string" && params.id) return params.id;

  // 2) fallback to parsing URL (works in many server contexts)
  try {
    const u = new URL(req.url);
    // split pathname and get last non-empty segment
    const segments = u.pathname.split("/").filter(Boolean);
    if (segments.length > 0) {
      const possible = segments[segments.length - 1];
      // If route uses [id], last segment usually is the id
      return possible || undefined;
    }
  } catch (err) {
    // ignore
  }

  return undefined;
}

/* -------------------- Handlers -------------------- */
export async function GET(req: Request, { params }: { params?: { id?: string } } = {}) {
  try {
    const id = getIdFromRequest(req, params);
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

export async function PUT(req: Request, { params }: { params?: { id?: string } } = {}) {
  try {
    if (!(await isAuthorized(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = getIdFromRequest(req, params);
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

    // check slug conflict but ignore same document
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

export async function DELETE(req: Request, { params }: { params?: { id?: string } } = {}) {
  try {
    if (!(await isAuthorized(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = getIdFromRequest(req, params);
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
