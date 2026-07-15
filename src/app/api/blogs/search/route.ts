import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";
import { canUseMongoBlogs, searchLocalBlogs } from "@/lib/localBlogs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!canUseMongoBlogs()) {
    return NextResponse.json({ blogs: searchLocalBlogs(q) });
  }

  try {
    await connectDB();

    const blogs = await Blog.find(
      { title: { $regex: q, $options: "i" } },
      { title: 1, slug: 1 }
    )
      .limit(10)
      .lean();

    return NextResponse.json({ blogs });
  } catch (err) {
    console.error("GET /api/blogs/search error:", err);
    return NextResponse.json({ blogs: searchLocalBlogs(q) });
  }
}
