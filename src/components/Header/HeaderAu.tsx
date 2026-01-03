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

export default function HeaderAu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Blog[]>([]);
  const pathname = usePathname();

  /* ---------------- SEARCH (DEBOUNCED) ---------------- */
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/blogs/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.blogs || []);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(t);
  }, [query]);

  /* ---------------- CLOSE ON ROUTE CHANGE ---------------- */
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  /* ---------------- BODY SCROLL LOCK ---------------- */
  useEffect(() => {
    document.body.style.overflow =
      menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  /* ---------------- ESC KEY ---------------- */
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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 relative">
        {/* LOGO */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="QuickSquad Logo"
            width={200}
            height={60}
            priority
            className="h-auto max-w-[120px] sm:max-w-[150px] lg:max-w-[200px]"
          />
        </Link>

        {/* DESKTOP NAV (lg+) */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/" className="hover:text-gray-200">HOME</Link>
          <Link href="/about" className="hover:text-gray-200">ABOUT</Link>
          <Link href="/blog" className="hover:text-gray-200">BLOG</Link>
          <Link href="/contact" className="hover:text-gray-200">CONTACT</Link>
          <Link href="/pricing" className="hover:text-gray-200">PRICING</Link>

          {/* SEARCH */}
          <button
            aria-label="Search"
            className="p-2 rounded hover:bg-white/10"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <FaSearch />
          </button>

          {/* CONTACT (xl+) */}
          <div className="hidden xl:flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FaEnvelope />
              <Link href="mailto:support@quicksquad.live">
                support@quicksquad.live
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt />
              <Link href="tel:(888)907-4097">(888) 907-4097</Link>
            </div>
          </div>

          {/* SOCIALS */}
          <div className="hidden xl:flex items-center gap-4">
            <Link href="https://facebook.com" target="_blank"><FaFacebookF /></Link>
            <Link href="https://instagram.com" target="_blank"><FaInstagram /></Link>
            <Link href="https://x.com" target="_blank"><FaXTwitter /></Link>
          </div>
        </nav>

        {/* TABLET NAV (md–lg) */}
        <nav className="hidden md:flex lg:hidden items-center gap-6">
          <Link href="/">HOME</Link>
          <Link href="/about">ABOUT</Link>
          <Link href="/blog">BLOG</Link>
          <Link href="/contact">CONTACT</Link>
          <button
            aria-label="Search"
            className="p-2 rounded hover:bg-white/10"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <FaSearch />
          </button>
        </nav>

        {/* MOBILE ACTIONS */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            aria-label="Search"
            className="p-2 rounded hover:bg-white/10"
            onClick={() => {
              setSearchOpen((v) => !v);
              setMenuOpen(false);
            }}
          >
            <FaSearch className="text-xl" />
          </button>

          <button
            aria-label="Menu"
            className="w-11 h-11 grid place-items-center rounded-lg bg-white/15 hover:bg-white/25"
            onClick={() => {
              setMenuOpen((v) => !v);
              setSearchOpen(false);
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

      {/* SEARCH SHEET */}
      {searchOpen && (
        <div className="fixed inset-x-0 top-16 z-50 bg-white text-black shadow-xl">
          <div className="max-w-3xl mx-auto p-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blogs..."
              className="w-full border rounded px-3 py-2"
            />
            <div className="mt-2 max-h-60 overflow-y-auto">
              {results.length ? results.map((b) => (
                <Link
                  key={b._id}
                  href={`/blog/${b.slug}`}
                  className="block px-2 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setSearchOpen(false);
                    setQuery("");
                  }}
                >
                  {b.title}
                </Link>
              )) : query && (
                <p className="text-sm text-gray-500 px-2">No blogs found</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      <nav
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-gray-100 text-black transition-all ${
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-6 space-y-5">
<div className="flex flex-col divide-y divide-gray-200">
  {[
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/pricing", label: "Pricing" },
  ].map((item) => (
    <Link
      key={item.href}
      href={item.href}
      onClick={() => setMenuOpen(false)}
      className="
        block py-2
        text-base font-medium
        text-gray-900
        tracking-wide
        hover:bg-gray-200
        active:bg-gray-300
        transition
      "
    >
      {item.label}
    </Link>
  ))}
</div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <FaEnvelope /> support@quicksquad.live
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt /> (888) 907-4097
            </div>
          </div>

          <div className="flex gap-6 text-xl pt-4">
            <FaFacebookF />
            <FaInstagram />
            <FaXTwitter />
          </div>
        </div>
      </nav>
    </header>
  );
}
