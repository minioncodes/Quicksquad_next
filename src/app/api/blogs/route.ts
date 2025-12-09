import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";

export async function GET() {
  await connectDB();
  const blogs = await Blog.find().sort({ date: -1 });
  return NextResponse.json(blogs);
}
