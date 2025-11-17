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

  if (!blog) notFound();

  const relatedPosts = (blogs as Blog[]).filter((b) =>
    blog.related.includes(b.slug)
  );

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 text-neutral-900 animate-fadeIn">
      {/* Blog Header */}
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          {blog.title}
        </h1>

        <div className="flex items-center text-sm text-neutral-500 gap-3 flex-wrap">
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readingTime}</span>

          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg border border-blue-100">
            {blog.category}
          </span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="rounded-xl overflow-hidden shadow-lg mb-10 bg-neutral-100">
        <Image
          width={1600}
          height={720}
          src={blog.image}
          alt={blog.title}
          className="w-full h-80 md:h-[420px] object-cover transition-transform duration-500 hover:scale-[1.02]"
        />
      </div>

      {/* Highlight */}
      <blockquote className="border-l-4 border-blue-500 pl-5 italic text-neutral-700 bg-neutral-50 p-4 rounded-lg mb-10 shadow-sm">
        “{blog.highlight}”
      </blockquote>

      {/* Content */}
      <div
        className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-img:rounded-xl prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:italic prose-blockquote:text-neutral-600"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Tags */}
      <section className="mt-12">
        <h3 className="font-semibold text-xl mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-1.5 text-sm bg-neutral-100 text-neutral-700 rounded-full border hover:bg-neutral-200 transition"
            >
              #{tag}
            </span>
          ))}
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 border-t pt-10">
          <h3 className="font-bold text-2xl mb-6">Related Posts</h3>

          <div className="grid gap-6 md:grid-cols-2">
            {relatedPosts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="group border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white"
              >
                <Image
                  width={1600}
                  height={720}
                  src={post.image}
                  alt={post.title}
                  className="h-40 w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />

                <div className="p-4">
                  <h4 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition">
                    {post.title}
                  </h4>
                  <p className="text-sm text-neutral-500">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

// unchanged
export async function generateStaticParams() {
  return (blogs as Blog[]).map((b) => ({ slug: b.slug }));
}
