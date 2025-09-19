"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import blogPosts from "@/data/blog.json"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <header className="bg-blue-500 text-white shadow-md relative z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="">
          <Image
            src="/images/logo.png"
            alt="QuickSquad Logo"
            width={200}
            height={60}
            className="h-auto max-w-[150px] md:max-w-[200px]"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="hover:text-gray-200">HOME</Link>
          <Link href="/about" className="hover:text-gray-200">ABOUT</Link>
          <Link href="/blog" className="hover:text-gray-200">BLOG</Link>
          <Link href="/contact" className="hover:text-gray-200">CONTACT</Link>
          <Link href="/pricing" className="hover:text-gray-200">PRICING</Link>

          {/* Search Icon (Desktop) */}
          <div className="relative">
            <FaSearch
              className="cursor-pointer hover:text-gray-200"
              onClick={() => setSearchOpen(!searchOpen)}
            />
          </div>

          {/* Socials */}
          <div className="flex items-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
          </div>
        </nav>

        {/* Mobile Buttons */}
        <div className="flex items-center space-x-4 md:hidden">
          {/* Search Icon (Mobile) */}
          <FaSearch
            className="cursor-pointer text-xl hover:text-gray-200"
            onClick={() => setSearchOpen(!searchOpen)}
          />

          {/* Hamburger */}
          <button
          title="Mob"
            className="flex flex-col space-y-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
        </div>
      </div>

      {/* Search Dropdown (Both Mobile + Desktop) */}
      {searchOpen && (
        <div className="absolute top-full right-6 w-72 bg-white text-black rounded shadow-lg p-3 z-50">
          <input
            type="text"
            placeholder="Search blogs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="max-h-48 overflow-y-auto">
            {query && results.length > 0 ? (
              results.map((post, i) => (
                <Link
                  key={i}
                  href={`/blog/${post.slug}`}
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                  onClick={() => {
                    setSearchOpen(false);
                    setQuery("");
                  }}
                >
                  {post.title}
                </Link>
              ))
            ) : query ? (
              <p className="text-sm text-gray-500 px-2">No blogs found</p>
            ) : (
              <p className="text-sm text-gray-400 px-2">Type to search...</p>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-blue-600 px-6 py-4 space-y-4 z-40 relative">
          <Link href="/" className="block">HOME</Link>
          <Link href="/about" className="block">ABOUT</Link>
          <Link href="/blog" className="block">BLOG</Link>
          <Link href="/contact" className="block">CONTACT</Link>
          <Link href="/pricing" className="block">PRICING</Link>
          <div className="flex space-x-4 mt-2">
            <FaFacebookF />
            <FaInstagram />
            <FaXTwitter />
          </div>
        </nav>
      )}
    </header>
  );
}
