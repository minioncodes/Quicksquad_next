"use client"
import Image from "next/image"
import Link from "next/link"
import { FaRegClock } from "react-icons/fa"

interface BlogCardProps {
  title: string
  image: string
  date: string
  url: string
  description: string
}

export default function BlogCard({ title, image, date, url, description }: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl overflow-hidden transition">
      {/* Blog Image */}
      <div className="relative w-full h-56">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Blog Content */}
      <div className="p-5">
        <p className="flex items-center text-sm text-blue-600 mb-2">
          <FaRegClock className="mr-2" /> {date}
        </p>
        <h3 className="font-semibold text-gray-600 text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        <Link
          href={url}
          className="inline-block border border-gray-800  px-4 py-2 rounded text-gray-600 text-sm hover:bg-gray-800 hover:text-white transition"
        >
          Read More
        </Link>
      </div>
    </div>
  )
}
