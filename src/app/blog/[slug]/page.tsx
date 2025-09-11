import { notFound } from "next/navigation";
import blogs from "@/data/blog.json";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  slug: string;
  title: string;
  image: string;
  date: string;
  description: string;
  content: string;
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const blog = (blogs as Blog[]).find((b) => b.slug === params.slug);

  if (!blog) return notFound();

  return (
    <main className="py-12 px-6 md:px-20 text-black bg-gray-50">
      <article className="max-w-4xl mx-auto p-8">
        {/* Title + Date */}
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {blog.title}
          </h1>
          <p className="text-sm text-gray-800">{blog.date}</p>
        </header>

        {/* Image */}
        <div className="mb-6">
          <Image
            src={blog.image}
            alt={blog.title}
            width={900}
            height={500}
            className="rounded-lg w-full object-cover"
          />
        </div>

        {/* Content */}
        <div
          className="prose prose-blue max-w-none prose-lg"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Back Button */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            ← Back to Blogs
          </Link>
        </div>
      </article>
    </main>
  );
}
