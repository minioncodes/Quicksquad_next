// src/app/api/blogs/[slug]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";
import { canUseMongoBlogs, findLocalBlogBySlug, stripAliases } from "@/lib/localBlogs";

export async function GET(req: Request) {
  try {
    // Extract slug from the request URL instead of using the second arg.
    // Example request.url: https://yourdomain.com/api/blogs/some-slug
    const url = new URL(req.url);
    const parts = url.pathname.split("/").filter(Boolean); // ['api','blogs','some-slug']
    const slug = parts[parts.length - 1];

    if (!slug) {
      return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
    }

    if (!canUseMongoBlogs()) {
      const localBlog = findLocalBlogBySlug(slug);
      if (!localBlog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(stripAliases(localBlog));
    }

    await connectDB();

    const blog = await Blog.findOne({ slug }).lean();
    if (!blog) {
      const localBlog = findLocalBlogBySlug(slug);
      if (localBlog) {
        return NextResponse.json(stripAliases(localBlog));
      }
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (err) {
    console.error("GET /api/blogs/[slug] error:", err);
    const url = new URL(req.url);
    const slug = url.pathname.split("/").filter(Boolean).pop();
    if (slug) {
      const localBlog = findLocalBlogBySlug(slug);
      if (localBlog) {
        return NextResponse.json(stripAliases(localBlog));
      }
    }
    return NextResponse.json({ error: "Server error while fetching blog" }, { status: 500 });
  }
}
