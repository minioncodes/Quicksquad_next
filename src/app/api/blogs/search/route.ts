import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  await connectDB();

  const blogs = await Blog.find(
    { title: { $regex: q, $options: "i" } },
    { title: 1, slug: 1 }
  ).limit(10);

  return NextResponse.json({ blogs });
}
