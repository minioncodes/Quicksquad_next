"use client"
import { motion } from "framer-motion"
import blogs from "@/data/blog.json"
import BlogCard from "../pages/Blogcard"

export default function BlogPage() {

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.2 },
    }),
  }

  return (
    <main>
      {/* Page Header */}
      <div
        className="bg-gradient-to-b from-blue-500 to-blue-300 text-center py-16 text-white"
      >
        <h1 className="text-4xl font-bold mb-2">BLOGS</h1>
        <p className="text-blue-100">Our Latest Blogs are here</p>
      </div>

      {/* Blog Listing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="h-full" // make wrapper full height
              >
                <div className="h-full flex flex-col">
                  <BlogCard
                    title={blog.title}
                    image={blog.image}
                    date={blog.date}
                    url={`/blog/${blog.slug}`}
                    description={blog.description}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
