"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaSearch,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import blogPosts from "@/data/blog.json";

export default function HeaderUs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  // Filtered search results
  const results = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  // Close sheets on route change
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile sheets are open
  useEffect(() => {
    const anyOpen = menuOpen || searchOpen;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-blue-500 text-white shadow-md">
      {/* TOP BAR */}
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6 h-16 relative">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="QuickSquad Logo"
            width={200}
            height={60}
            className="h-auto max-w-[150px] md:max-w-[200px]"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 relative">
          <Link href="/" className="hover:text-gray-200">
            HOME
          </Link>
          <Link href="/about" className="hover:text-gray-200">
            ABOUT
          </Link>
          <Link href="/blog" className="hover:text-gray-200">
            BLOG
          </Link>
          <Link href="/contact" className="hover:text-gray-200">
            CONTACT
          </Link>
          <Link href="/pricing" className="hover:text-gray-200">
            PRICING
          </Link>

          {/* Search */}
          <div className="relative">
            <button
              aria-label="Toggle search"
              className="p-2 rounded hover:bg-white/10"
              onClick={() => setSearchOpen((v) => !v)}
            >
              <FaSearch />
            </button>

            {/* Desktop Search Dropdown */}
            {searchOpen && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white text-black rounded shadow-lg p-3 z-50">
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
                    <p className="text-sm text-gray-500 px-2">
                      No blogs found
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 px-2">
                      Type to search…
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-white" />
              <a
                href="mailto:support@quicksquad.live"
                className="hover:underline"
              >
                support@quicksquad.live
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-white" />
              <a href="tel:(844) 587-5473" className="hover:underline">
                America
              </a>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </a>
          </div>
        </nav>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            aria-label="Toggle search"
            className="p-2 rounded-lg hover:bg-white/10"
            onClick={() => {
              setSearchOpen((v) => !v);
              if (menuOpen) setMenuOpen(false);
            }}
          >
            <FaSearch className="text-xl" />
          </button>

          {/* Hamburger */}
          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="w-11 h-11 grid place-items-center rounded-lg bg-white/15 hover:bg-white/25 active:scale-95 transition"
            onClick={() => {
              setMenuOpen((v) => !v);
              if (searchOpen) setSearchOpen(false);
            }}
          >
            <span className="sr-only">Open menu</span>
            <div className="space-y-1.5">
              <span
                className={`block w-6 h-0.5 bg-white transition ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search Sheet */}
      <div
        className={`md:hidden fixed z-50 inset-x-0 top-16 bg-white text-black shadow-xl transition-transform duration-200
        ${
          searchOpen
            ? "translate-y-0"
            : "-translate-y-3 pointer-events-none opacity-0"
        }`}
      >
        <div className="px-4 py-3">
          <input
            type="text"
            placeholder="Search blogs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="max-h-56 overflow-y-auto mt-2">
            {query && results.length > 0 ? (
              results.map((post, i) => (
                <Link
                  key={i}
                  href={`/blog/${post.slug}`}
                  className="block px-2 py-2 rounded hover:bg-gray-100"
                  onClick={() => {
                    setSearchOpen(false);
                    setQuery("");
                  }}
                >
                  {post.title}
                </Link>
              ))
            ) : query ? (
              <p className="text-sm text-gray-500 px-2 py-1">No blogs found</p>
            ) : (
              <p className="text-sm text-gray-400 px-2 py-1">Type to search…</p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      <nav
        className={`md:hidden fixed z-50 inset-x-0 top-16 bg-gray-100 text-black shadow-xl transition-transform duration-200
        ${
          menuOpen
            ? "translate-y-0"
            : "-translate-y-3 pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="px-6 py-5 space-y-5">
          <Link
            href="/"
            className="block text-base tracking-wide"
            onClick={() => setMenuOpen(false)}
          >
            HOME
          </Link>
          <Link
            href="/about"
            className="block text-base tracking-wide"
            onClick={() => setMenuOpen(false)}
          >
            ABOUT
          </Link>
          <Link
            href="/blog"
            className="block text-base tracking-wide"
            onClick={() => setMenuOpen(false)}
          >
            BLOG
          </Link>
          <Link
            href="/contact"
            className="block text-base tracking-wide"
            onClick={() => setMenuOpen(false)}
          >
            CONTACT
          </Link>
          <Link
            href="/pricing"
            className="block text-base tracking-wide"
            onClick={() => setMenuOpen(false)}
          >
            PRICING
          </Link>

          {/* Contact row */}
          <div className="pt-2 space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-gray-800" />
              <a href="mailto:support@quicksquad.live">
                support@quicksquad.live
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-gray-800" />
              <a href="tel:+18339215472">(844) 587-5473</a>
            </div>
          </div>

          {/* Socials row */}
          <div className="flex items-center gap-6 pt-1 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
