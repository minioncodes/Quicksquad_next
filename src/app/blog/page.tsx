"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "../types/blog";
import { motion } from "framer-motion";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data: Blog[]) => setBlogs(data));
  }, []);

  /* Extract unique categories from blog list */
  const categories = ["All", ...new Set(blogs.map((b) => b.category || "General"))];

  /* FILTER + SEARCH + SORT */
  const filteredBlogs = useMemo(() => {
    let list = [...blogs];

    // Search
    if (search.trim()) {
      list = list.filter((b) =>
        b.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category !== "All") {
      list = list.filter((b) => b.category === category);
    }

    // Sort
    if (sort === "latest") list = list.reverse();
    return list;
  }, [blogs, search, category, sort]);

  return (
    <main className="px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">
        Explore Blogs
      </h1>

      {/* FILTER BAR */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white text-gray-500 shadow-md rounded-xl p-4 mb-10 flex flex-wrap gap-4 items-center justify-between"
      >
        {/* Search */}
        <input
          type="text"
          placeholder="Search blog..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* Category Filter */}
        <select
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Sort Filter */}
        <select
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        {/* Reset Button */}
        <button
          onClick={() => {
            setSearch("");
            setCategory("All");
            setSort("latest");
          }}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          Reset Filters
        </button>
      </motion.div>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {filteredBlogs.map((post, index) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.04 }}
            className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all cursor-pointer group"
          >
            <Link href={`/blog/${post.slug}`}>
              {/* IMAGE */}
              <div className="relative w-full h-44 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={500}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{post.date}</p>

                <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                  {post.title}
                </h2>

                <span className="text-blue-600 text-sm font-medium group-hover:underline">
                  Read More →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* NO RESULTS */}
      {filteredBlogs.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No blogs found matching your filters.
        </p>
      )}
    </main>
  );
}
