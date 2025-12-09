// app/blog/[slug]/page.tsx  (or wherever you keep it)
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Blog {
  _id?: string;
  title: string;
  image: string;
  date: string;
  content: string; // html
  slug: string;
  excerpt?: string;
  tags?: string[]; // optional
}

interface BlogPageProps {
  params: { slug: string };
}

export default function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = params;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [recommended, setRecommended] = useState<Blog[]>([]);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);

  // fetch single blog
  useEffect(() => {
    setBlog(null);
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        if (!res.ok) throw new Error("Failed to load blog");
        const data: Blog = await res.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBlog();
  }, [slug]);

  // fetch all blogs for recommendations (only once)
  useEffect(() => {
    async function fetchAll() {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to load blogs");
        const data: Blog[] = await res.json();
        setAllBlogs(data || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAll();
  }, []);

  // compute a lightweight similarity score between text A and B
  const textScore = (a: string, b: string) => {
    if (!a || !b) return 0;
    const norm = (s: string) =>
      s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter(Boolean);
    const wa = norm(a);
    const wb = new Set(norm(b));
    let score = 0;
    wa.forEach((w) => {
      if (wb.has(w)) score += 1;
    });
    return score;
  };

  // build recommended list when blog + allBlogs available
  useEffect(() => {
    if (!blog || allBlogs.length === 0) {
      setRecommended([]);
      return;
    }

    // exclude current
    const others = allBlogs.filter((b) => b.slug !== blog.slug);

    // If tags exist, prefer those sharing tags
    const scored = others.map((b) => {
      let score = 0;
      // tag overlap
      if (Array.isArray(blog.tags) && Array.isArray(b.tags)) {
        const aTags = new Set(blog.tags.map((t) => t.toLowerCase()));
        score += b.tags.reduce((acc, t) => acc + (aTags.has(t.toLowerCase()) ? 8 : 0), 0);
      }
      // title/content overlap
      score += textScore(blog.title + " " + (blog.excerpt || blog.content || ""), b.title + " " + (b.excerpt || b.content || "")) * 1;
      // small boost for more recent posts (optional — uses date string)
      try {
        const d = new Date(b.date).getTime() || 0;
        score += Math.min(3, Math.round((d / 1e10) % 4)); // tiny stable boost
      } catch {}

      return { blog: b, score };
    });

    // sort by score desc and pick top 3
    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, 3).map((s) => s.blog);

    // fallback: if none scored positive, pick 3 random
    if (top.length === 0 && others.length > 0) {
      const sample = others.slice(0, 3);
      setRecommended(sample);
    } else {
      setRecommended(top);
    }
  }, [blog, allBlogs]);

  if (!blog) return <p className="p-10 text-center text-gray-600">Loading...</p>;

  // utility: small excerpt from HTML content
  const excerptFromHtml = (html: string, max = 140) => {
    const txt = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return txt.length <= max ? txt : txt.slice(0, max).trim() + "…";
  };

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-12 max-w-4xl mx-auto text-black">
      {/* Hero */}
      <div className="mb-8">
        <div className="h-1 w-20 bg-blue-600 rounded-full mb-4" />
        <div className="w-full rounded-xl overflow-hidden shadow-lg mb-6">
          <Image
            src={blog.image}
            alt={blog.title}
            width={1200}
            height={600}
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-3 text-black">
          {blog.title}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {new Date(blog.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Content */}
      <article
        className="prose prose-lg max-w-none text-gray-800 prose-headings:text-black"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* CTA */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-white border border-gray-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-black">Found this helpful?</h3>
          <p className="text-gray-500">If you need help, our experts are available 24/7.</p>
        </div>
        <div>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
          >
            Contact Support
          </a>
        </div>
      </div>

      {/* Recommended */}
      {recommended.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-black mb-4">Recommended for you</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommended.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="group">
                <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
                  <div className="relative w-full h-40 sm:h-36">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">{new Date(r.date).toLocaleDateString()}</p>
                    <h3 className="text-sm font-semibold text-black mb-2 line-clamp-2">{r.title}</h3>
                    <p className="text-xs text-gray-500">{r.excerpt ?? excerptFromHtml(r.content || "", 100)}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
