import { blogs } from "../pages/blogdata"
import BlogCard from "../pages/Blogcard"

export default function BlogPage() {
  return (
    <main>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-blue-500 to-blue-300 text-center py-16 text-white">
        <h1 className="text-4xl font-bold mb-2">BLOGS</h1>
        <p className="text-blue-100">Our Latest Blog is here</p>
      </section>

      {/* Blog Listing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <BlogCard
                key={index}
                title={blog.title}
                image={blog.image}
                date={blog.date}
                url={blog.url}
                description={blog.description}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}