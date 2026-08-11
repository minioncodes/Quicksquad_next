"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/faq-page", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-blue-500 text-white shadow-md">
      <div className="bg-slate-700 px-4 py-1.5 text-center text-xs font-medium text-white">
        QuickSquad is owned and operated by A V TRADE CORPORATION.
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="QuickSquad home">
          <Image
            src="/images/logo.png"
            alt="QuickSquad"
            width={200}
            height={60}
            priority
            className="h-auto w-32 sm:w-40"
          />
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-white-700 transition hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-lg bg-slate-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Start Consultation
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          className="rounded-lg p-2 text-slate-800 transition hover:bg-slate-100 lg:hidden"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-slate-200 bg-white px-4 py-3 shadow-lg lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-7xl flex-col">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-700"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white"
            >
              Start Consultation
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
