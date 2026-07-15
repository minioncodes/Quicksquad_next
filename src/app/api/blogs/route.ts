import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";
import { canUseMongoBlogs, getLocalBlogs, stripAliases } from "@/lib/localBlogs";

export async function GET() {
  if (!canUseMongoBlogs()) {
    return NextResponse.json(getLocalBlogs().map(stripAliases));
  }

  try {
    await connectDB();
    const blogs = await Blog.find().sort({ date: -1 }).lean();
    return NextResponse.json(blogs);
  } catch (err) {
    console.error("GET /api/blogs error:", err);
    return NextResponse.json(getLocalBlogs().map(stripAliases));
  }
}
