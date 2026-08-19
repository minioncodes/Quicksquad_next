import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  HeartPulse,
  Landmark,
  Laptop,
  Plane,
  ShoppingBag,
  UserRoundCog,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services | Everyday AI-Powered Guidance",
  description: "Explore QuickSquad's general consultation categories: banking guidance, technology, finance, government tasks, shopping, travel, healthcare information, careers, and digital accounts.",
  openGraph: { title: "QuickSquad Services | Everyday AI-Powered Guidance", description: "General consultation and practical guidance for everyday questions and online tasks." },
  twitter: { card: "summary_large_image", title: "QuickSquad Services", description: "Explore everyday consumer guidance and consultation categories." },
  alternates: { canonical: "/services" },
};

const services = [
  { title: "Banking", icon: Landmark, description: "Understand common banking terms, compare account features, and navigate online banking tasks with confidence.", examples: "General information only; QuickSquad is not a bank." },
  { title: "Technology", icon: Laptop, description: "Get clear help with devices, software, internet access, online safety, and common digital tasks.", examples: "Practical computer and internet guidance." },
  { title: "Finance", icon: BadgeDollarSign, description: "Organize financial questions, learn everyday concepts, and research options before speaking with a qualified adviser.", examples: "Educational information only; not investment advice." },
  { title: "Government", icon: Building2, description: "Find official resources and understand common online forms, public-service portals, and application steps.", examples: "QuickSquad is not a government agency." },
  { title: "Shopping", icon: ShoppingBag, description: "Compare products, understand subscriptions, and make online purchases with more clarity.", examples: "Consumer research and digital shopping help." },
  { title: "Travel", icon: Plane, description: "Research routes, compare travel options, organize itineraries, and handle online booking tasks.", examples: "Planning guidance for more confident trips." },
  { title: "Healthcare", icon: HeartPulse, description: "Find reliable health information and help navigating online appointment or provider-search tasks.", examples: "General information only; not medical advice." },
  { title: "Career", icon: BriefcaseBusiness, description: "Explore roles, improve digital job-search materials, and organize career-related online tasks.", examples: "Practical job-search and career guidance." },
  { title: "Digital Accounts", icon: UserRoundCog, description: "Set up, understand, and manage email, online profiles, passwords, and other digital accounts.", examples: "Guidance for everyday online account tasks." },
];

export default function ServicesPage() {
  return (
    <main className="bg-slate-50">
      <section className="bg-linear-to-br from-blue-800 via-blue-700 to-cyan-600 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-100">QuickSquad services</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Everyday guidance, all in one place</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-blue-50">QuickSquad helps consumers research questions, navigate online tasks, and move forward with practical general consultation.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900">Choose a consultation category</h2>
          <p className="mt-3 leading-7 text-slate-600">Our AI-powered platform helps turn everyday questions into clear, useful next steps. Where an issue needs regulated professional advice, we will direct you to an appropriately qualified professional.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, icon: Icon, description, examples }) => (
            <article key={title} className="group flex min-h-72 flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-700"><Icon size={25} aria-hidden="true" /></div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              <p className="mt-3 text-xs font-medium leading-5 text-slate-500">{examples}</p>
              <Link href={`/contact?category=${encodeURIComponent(title)}`} className="mt-auto pt-6 text-sm font-bold text-blue-700 transition group-hover:text-blue-900">Start consultation <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
