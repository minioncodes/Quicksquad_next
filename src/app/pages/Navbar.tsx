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

interface Blog {
  _id: string;
  title: string;
  slug: string;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Blog[]>([]);
  const pathname = usePathname();

  /* -------------------- SEARCH FETCH (Debounced) -------------------- */
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await fetch(`/api/blogs/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.blogs || []);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  /* -------------------- CLOSE ON ROUTE CHANGE -------------------- */
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  /* -------------------- BODY SCROLL LOCK -------------------- */
  useEffect(() => {
    const anyOpen = menuOpen || searchOpen;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  /* -------------------- ESC CLOSE -------------------- */
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
          <Link href="/" className="hover:text-gray-200">HOME</Link>
          <Link href="/about" className="hover:text-gray-200">ABOUT</Link>
          <Link href="/blog" className="hover:text-gray-200">BLOG</Link>
          <Link href="/contact" className="hover:text-gray-200">CONTACT</Link>
          <Link href="/pricing" className="hover:text-gray-200">PRICING</Link>

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
                    results.map((post) => (
                      <Link
                        key={post._id}
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
                    <p className="text-sm text-gray-400 px-2">Type to search…</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-white" />
              <Link href="mailto:support@quicksquad.live" className="hover:underline">
                support@quicksquad.live
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-white" />
              <Link href="tel:(888) 907-4097" className="hover:underline">
                (888) 907-4097
              </Link>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <Link href="https://facebook.com" target="_blank"><FaFacebookF /></Link>
            <Link href="https://instagram.com" target="_blank"><FaInstagram /></Link>
            <Link href="https://x.com" target="_blank"><FaXTwitter /></Link>
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

          {/* Hamburger Menu */}
          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="w-11 h-11 grid place-items-center rounded-lg bg-white/15 hover:bg-white/25 active:scale-95 transition"
            onClick={() => {
              setMenuOpen((v) => !v);
              if (searchOpen) setSearchOpen(false);
            }}
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-white transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search Sheet */}
      <div
        className={`md:hidden fixed z-50 inset-x-0 top-16 bg-white text-black shadow-xl transition-transform duration-200 ${
          searchOpen ? "translate-y-0" : "-translate-y-3 pointer-events-none opacity-0"
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
              results.map((post) => (
                <Link
                  key={post._id}
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
  className={`md:hidden fixed z-50 inset-x-0 top-16 bg-gray-100 text-black shadow-xl 
  transition-transform duration-200 ${
    menuOpen ? "translate-y-0" : "-translate-y-3 pointer-events-none opacity-0"
  }`}
>
  <div className="px-6 py-5 space-y-5">

    {/* Internal Links (use Next.js Link) */}
    <Link href="/" onClick={() => setMenuOpen(false)} className="block text-base">
      HOME
    </Link>
    <Link href="/about" onClick={() => setMenuOpen(false)} className="block text-base">
      ABOUT
    </Link>
    <Link href="/blog" onClick={() => setMenuOpen(false)} className="block text-base">
      BLOG
    </Link>
    <Link href="/contact" onClick={() => setMenuOpen(false)} className="block text-base">
      CONTACT
    </Link>
    <Link href="/pricing" onClick={() => setMenuOpen(false)} className="block text-base">
      PRICING
    </Link>

    {/* Contact Section */}
    <div className="pt-2 space-y-3 text-sm text-gray-700">

      <div className="flex items-center gap-2">
        <FaEnvelope />
        <a
          href="mailto:support@quicksquad.live"
          className="hover:underline"
        >
          support@quicksquad.live
        </a>
      </div>

      <div className="flex items-center gap-2">
        <FaPhoneAlt />
        <a
          href="tel:+18889074097"
          className="hover:underline"
        >
          (888) 907-4097
        </a>
      </div>

    </div>

    {/* Social Icons */}
    <div className="flex items-center gap-6 pt-3 text-xl">

      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="hover:text-blue-600"
      >
        <FaFacebookF />
      </a>

      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="hover:text-pink-500"
      >
        <FaInstagram />
      </a>

      <a
        href="https://x.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter / X"
        className="hover:text-black"
      >
        <FaXTwitter />
      </a>

    </div>
  </div>
</nav>

    </header>
  );
}
