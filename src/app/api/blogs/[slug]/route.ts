import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";

interface RouteParams {
  params: {
    slug: string;
  };
}

export async function GET(req: Request, { params }: RouteParams) {
  await connectDB();

  const blog = await Blog.findOne({ slug: params.slug });

  if (!blog) {
    return NextResponse.json(
      { error: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(blog);
}
