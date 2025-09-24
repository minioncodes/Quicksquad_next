import { notFound } from "next/navigation";
import blogs from "@/data/blog.json";
import Link from "next/link";
import Image from "next/image";

interface Blog {
  slug: string;
  title: string;
  image: string;
  date: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  readingTime: string;
  highlight: string;
  related: string[];
}

type RouteParams = { slug: string };

export default async function BlogPost({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;

  const blog = (blogs as Blog[]).find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  // Related posts
  const relatedPosts = (blogs as Blog[]).filter((b) =>
    blog.related.includes(b.slug)
  );

  return (
    <article className="max-w-4xl mx-auto px-6 py-10 text-black">
      {/* Blog Header */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
      <div className="flex items-center text-sm text-gray-500 space-x-4 mb-6">
        <span>{blog.date}</span>
        <span>·</span>
        <span>{blog.readingTime}</span>
        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
          {blog.category}
        </span>
      </div>

      {/* Image */}
      <Image
      width={1600}          // ← required
  height={720}
        src={blog.image}
        alt={blog.title}
        className="w-full h-72 object-cover rounded-lg shadow mb-8"
      />

      {/* Highlight Quote */}
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 mb-6">
        “{blog.highlight}”
      </blockquote>

      {/* Blog Content */}
      <div
        className="prose prose-lg max-w-none prose-headings:mb-4 prose-p:mb-4 prose-ul:mb-4 prose-li:mb-2 prose-blockquote:italic prose-blockquote:text-gray-600"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Tags */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="border-t pt-8">
          <h3 className="font-semibold text-lg mb-4">Related Posts</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {relatedPosts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="p-4 border rounded-lg hover:shadow transition"
              >
                <Image
                width={1600}          // ← required
  height={720}
                  src={post.image}
                  alt={post.title}
                  className="h-40 w-full object-cover rounded mb-3"
                />
                <h4 className="font-semibold">{post.title}</h4>
                <p className="text-sm text-gray-500">{post.date}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

// (optional) unchanged in Next 15:
export async function generateStaticParams() {
  return (blogs as Blog[]).map((b) => ({ slug: b.slug }));
}
