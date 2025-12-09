// src/app/api/blogs/[slug]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";

type RouteParams = {
  params: {
    slug: string;
  };
};

export async function GET(_req: Request, { params }: RouteParams) {
  try {
    await connectDB();

    const slug = params?.slug;
    if (!slug) {
      return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
    }

    // Use lean() to return plain JS object (faster & smaller)
    const blog = await Blog.findOne({ slug }).lean();

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (err) {
    console.error("GET /api/blogs/[slug] error:", err);
    return NextResponse.json(
      { error: "Server error while fetching blog" },
      { status: 500 }
    );
  }
}
