import Image from "next/image";
import Link from "next/link";
import { PhoneCall } from "lucide-react";

const categories = ["Finance", "Technology", "Travel", "Healthcare", "Government Services", "Shopping", "Career", "Digital Accounts"];
const supportLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/contact", label: "Contact Us" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="QuickSquad home"><Image src="/images/logo.png" alt="QuickSquad" width={200} height={60} className="mb-5 h-auto w-40" /></Link>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">AI-powered Consultation Platform</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
            QuickSquad is a consumer-facing brand owned and operated by <strong className="text-white">A V TRADE CORPORATION</strong>, a registered partnership firm. All services, support, billing, subscriptions, marketing, and operations are managed by A V TRADE CORPORATION.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Business Categories</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-300">
            {categories.map((category) => <li key={category}>{category}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Support</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {supportLinks.map((link) => <li key={link.href}><Link className="text-slate-300 transition hover:text-white hover:underline" href={link.href}>{link.label}</Link></li>)}
          </ul>
          <a className="mt-5 flex items-center gap-2 text-lg font-bold text-white hover:text-blue-200" href="tel:+18443121044"><PhoneCall size={18} aria-hidden="true" /> (844) 312-1044</a>
          <a className="mt-5 inline-block text-sm font-medium text-blue-300 hover:text-blue-200" href="mailto:support@quicksquad.live">support@quicksquad.live</a>
        </div>
      </div>
      <div className="border-t border-slate-800 px-6 py-5 text-center text-xs text-slate-400">
        © 2026 QuickSquad. All Rights Reserved.
      </div>
    </footer>
  );
}
