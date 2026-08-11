import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bot, CheckCircle2, ShieldCheck, UsersRound } from "lucide-react";

export const metadata: Metadata = {
  title: "About QuickSquad",
  description: "Learn how QuickSquad, owned and operated by A V TRADE CORPORATION, combines AI-powered information assistance with thoughtful human support for everyday consumer questions.",
  openGraph: { title: "About QuickSquad | Owned by A V TRADE CORPORATION", description: "An AI-powered consumer consultation platform for everyday online tasks and questions." },
  twitter: { card: "summary_large_image", title: "About QuickSquad", description: "Everyday AI-powered consultation, operated by A V TRADE CORPORATION." },
  alternates: { canonical: "/about" },
};

const expectations = [
  "Clear, plain-language guidance for everyday questions and online tasks.",
  "AI-powered information assistance supported by careful human review when appropriate.",
  "Transparent ownership, accessible support, and clearly stated service boundaries.",
  "A practical next step—even when the right next step is consulting a qualified professional.",
];

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-800">
      <section className="bg-linear-to-br from-blue-800 via-blue-700 to-cyan-600 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-100">About QuickSquad</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Everyday questions deserve clear answers</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-blue-50">QuickSquad is an AI-powered consumer consultation platform owned and operated by A V TRADE CORPORATION, a registered partnership firm.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <div className="relative overflow-hidden rounded-2xl shadow-xl"><Image src="/images/team.png" alt="QuickSquad team collaborating" width={900} height={700} className="h-auto w-full object-cover" /></div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">Who we are</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">A consumer-first platform for practical guidance</h2>
          <p className="mt-5 leading-7 text-slate-600">QuickSquad helps people navigate the questions and online tasks that come up in everyday life—from technology and digital accounts to shopping, travel planning, career research, banking concepts, and public-service portals. We make information easier to understand and actions easier to take.</p>
          <p className="mt-4 leading-7 text-slate-600">The QuickSquad brand and all related customer support, billing, subscriptions, marketing, and operations are managed by <strong>A V TRADE CORPORATION</strong>. We believe that being clear about who runs a service is fundamental to earning trust.</p>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">How we help</p><h2 className="mt-3 text-3xl font-bold text-slate-900">AI speed, human-minded service</h2><p className="mt-4 leading-7 text-slate-600">AI helps us organize information, identify useful resources, and explain complex digital steps in clear language. Our customer-support approach keeps the experience grounded in the person and the task at hand.</p></div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { icon: Bot, title: "AI-powered assistance", text: "Fast, structured help for research, information, and everyday online tasks." },
              { icon: UsersRound, title: "Human-centered support", text: "Thoughtful communication that focuses on clarity, context, and useful next steps." },
              { icon: ShieldCheck, title: "Clear boundaries", text: "We state what we do and do not provide, especially where professional expertise is needed." },
            ].map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7"><Icon className="text-blue-700" size={28} aria-hidden="true" /><h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div><p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">Our mission</p><h2 className="mt-3 text-3xl font-bold text-slate-900">Make everyday digital life more manageable</h2><p className="mt-5 leading-7 text-slate-600">We want people to have a dependable place to begin: a place to ask, understand, compare, plan, and take the next online step with more confidence. We are building QuickSquad to be useful, transparent, and easy to reach.</p><p className="mt-4 leading-7 text-slate-600">QuickSquad does not act as a bank, law firm, medical provider, financial adviser, or government agency. Any information in regulated areas is general and educational; customers should consult qualified professionals when their circumstances require it.</p></div>
          <aside className="rounded-2xl bg-blue-700 p-8 text-white"><h2 className="text-2xl font-bold">What customers can expect</h2><ul className="mt-6 space-y-4">{expectations.map((item) => <li key={item} className="flex gap-3 text-sm leading-6"><CheckCircle2 className="mt-0.5 shrink-0 text-cyan-200" size={18} aria-hidden="true" />{item}</li>)}</ul></aside>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-16 text-center text-white"><h2 className="text-3xl font-bold">Start with a clearer next step</h2><p className="mx-auto mt-4 max-w-2xl text-slate-300">Tell us what you are trying to do, and we will help you find useful general guidance.</p><Link href="/contact" className="mt-7 inline-block rounded-lg bg-white px-5 py-3 font-bold text-blue-800 transition hover:bg-blue-50">Start Consultation</Link></section>
    </main>
  );
}
