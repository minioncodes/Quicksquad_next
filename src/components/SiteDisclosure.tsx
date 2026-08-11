import Link from "next/link";

export default function SiteDisclosure() {
  return (
    <aside className="border-y border-blue-100 bg-blue-50 px-6 py-4 text-center text-sm leading-6 text-slate-700" aria-label="Business and service disclosure">
      <strong>Business transparency:</strong> QuickSquad is owned and operated by A V TRADE CORPORATION, a registered partnership firm. We provide general guidance and consultation, not banking, legal, medical, investment, or government services. <Link href="/disclaimer" className="font-semibold text-blue-700 underline underline-offset-2">Read our disclaimer</Link>.
    </aside>
  );
}
