// app/blog/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  _id?: string;
  title: string;
  image: string;
  date: string;
  content: string;
  slug: string;
  category?: string;
  excerpt?: string;
}

function toErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  try {
    return String(err);
  } catch {
    return "Unknown error";
  }
}

export default function BlogDetailPageClient() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params?.slug) ? params?.slug[0] : params?.slug;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [recommended, setRecommended] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    let canceled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Blog not found");
            return;
          }
          throw new Error(`Server error (${res.status})`);
        }
        const data: Blog = await res.json();
        if (canceled) return;
        setBlog(data);

        // get all blogs so we can pick recommended ones
        const listRes = await fetch(`/api/blogs`);
        if (!listRes.ok) return;
        const all: Blog[] = await listRes.json();
        const recs = all
          .filter((b) => b.slug !== data.slug && (b.category === data.category || !b.category))
          .slice(0, 3);
        setRecommended(recs);
      } catch (err: unknown) {
        console.error("Error loading blog:", err);
        if (!canceled) setError(toErrorMessage(err));
      } finally {
        if (!canceled) setLoading(false);
      }
    })();

    return () => {
      canceled = true;
    };
  }, [slug, router]);

  if (!slug) return <div className="p-8 text-center text-gray-700">Invalid blog URL.</div>;

  if (loading) {
    return (
      <main className="px-6 py-12 max-w-3xl mx-auto text-black">
        <div className="animate-pulse space-y-4">
          <div className="w-full h-64 bg-gray-200 rounded-lg" />
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
          <div className="space-y-2 mt-6">
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-5/6 bg-gray-200 rounded" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="px-6 py-12 max-w-3xl mx-auto text-black">
        <p className="text-center text-red-600">{error}</p>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="px-6 py-12 max-w-3xl mx-auto text-black">
        <p className="text-center text-gray-700">No blog data available.</p>
      </main>
    );
  }

  return (
    <main className="px-6 py-12 max-w-3xl mx-auto text-black">
      <div className="w-full rounded-xl mb-8 overflow-hidden shadow-sm">
        <Image src={blog.image} alt={blog.title} width={1200} height={700} className="w-full h-auto object-cover rounded-lg" />
      </div>

      <h1 className="text-4xl font-bold leading-snug mb-2 text-black">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-8">{blog.date}</p>

      <article
        className="
          max-w-none text-gray-700 leading-8
      
          [&>p]:mb-6
          [&>p]:text-gray-700
      
          [&>h2]:text-2xl
          [&>h2]:font-semibold
          [&>h2]:text-black
          [&>h2]:mt-12
          [&>h2]:mb-4
      
          [&>ul]:my-6
          [&>ul]:pl-6
          [&>ul]:list-disc
      
          [&>ul>li]:mb-3
      
          [&_strong]:text-black
          [&_strong]:font-semibold
        "
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <div className="mt-12 bg-gradient-to-r from-blue-50 to-white border border-gray-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-black">Found this helpful?</h3>
          <p className="text-gray-500">If you need help, our experts are available 24/7.</p>
        </div>
        <div>
          <Link href="/contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700">
            Contact Support
          </Link>
        </div>
      </div>

      {recommended.length > 0 && (
        <section className="mt-10">
          <h3 className="text-2xl font-semibold text-black mb-4">Recommended for you</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recommended.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="relative w-full h-40">
                  <Image src={r.image} alt={r.title} width={600} height={360} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 mb-1">{r.date}</p>
                  <h4 className="text-sm font-medium text-black">{r.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
