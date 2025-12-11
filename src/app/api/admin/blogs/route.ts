// src/app/api/admin/blogs/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";
import { isAdminRequest } from "@/lib/adminAuth"; // <- helper you created

type BodyCreate = {
  title?: string;
  slug?: string;
  image?: string;
  date?: string;
  category?: string;
  content?: string;
};

type BodyUpdate = {
  id?: string;
  slug?: string;
  fields?: Partial<BodyCreate>;
};

type BodyDelete = {
  id?: string;
  slug?: string;
};

/**
 * GET - list blogs (admin only)
 */
export async function GET(req: Request) {
  try {
    if (!isAdminRequest(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    // latest first
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .limit(1000)
      .lean();

    return NextResponse.json(blogs);
  } catch (err) {
    console.error("GET /api/admin/blogs error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/**
 * POST - create blog (admin only)
 */
export async function POST(req: Request) {
  try {
    if (!isAdminRequest(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: BodyCreate = (await req.json()) || {};

    const { title, slug, image, date, category, content } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Missing required fields: title, slug, content" },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await Blog.findOne({ slug }).lean();
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const created = await Blog.create({
      title,
      slug,
      image: image ?? "",
      date: date ?? new Date().toISOString(),
      category: category ?? "General",
      content,
    });

    // convert to plain object before returning
    const createdLean = created.toObject ? created.toObject() : created;

    return NextResponse.json({ ok: true, blog: createdLean }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/blogs error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/**
 * PUT - update blog (admin only)
 * Accepts body: { id?: string, slug?: string, fields: { title?, image?, content?, ... } }
 */
export async function PUT(req: Request) {
  try {
    if (!isAdminRequest(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: BodyUpdate = (await req.json()) || {};
    const { id, slug, fields } = body;

    if (!id && !slug) {
      return NextResponse.json({ error: "Provide id or slug to update" }, { status: 400 });
    }
    if (!fields || Object.keys(fields).length === 0) {
      return NextResponse.json({ error: "No fields provided to update" }, { status: 400 });
    }

    await connectDB();

    const filter = id ? { _id: id } : { slug };
    const updated = await Blog.findOneAndUpdate(filter, { $set: fields }, { new: true }).lean();

    if (!updated) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, blog: updated });
  } catch (err) {
    console.error("PUT /api/admin/blogs error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/**
 * DELETE - delete blog (admin only)
 * Accepts body: { id?: string, slug?: string }
 */
export async function DELETE(req: Request) {
  try {
    if (!isAdminRequest(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: BodyDelete = (await req.json()) || {};
    const { id, slug } = body;

    if (!id && !slug) {
      return NextResponse.json({ error: "Provide id or slug to delete" }, { status: 400 });
    }

    await connectDB();

    const filter = id ? { _id: id } : { slug };
    const deleted = await Blog.findOneAndDelete(filter).lean();

    if (!deleted) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, deleted });
  } catch (err) {
    console.error("DELETE /api/admin/blogs error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
