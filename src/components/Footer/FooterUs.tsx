import Image from "next/image"
import Link from "next/link"
import SubscribeForm from "../SubscribeForm"

export default function FooterUs() {
  return (
    <footer className="bg-linear-to-b from-blue-500 to-blue-300 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">

        {/* Left Column */}
        <div>
          <Link href="/" className="">
          <Image
  src="/images/logo.png"
  alt="QuickSquad Logo"
  width={200}
  height={60}
  className="h-auto max-w-30 sm:max-w-37.5 lg:max-w-50"
  priority
/>
        </Link>
          <p className="text-sm mb-4">
            QuickSquad connects you with practical consultation across everyday
            needs, helping you make informed decisions quickly and confidently. (America)
          </p>

          <h3 className="font-semibold mb-2">Information America</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <ul className="space-y-1">
              <li><Link href="/services" className="hover:underline">Our Services</Link></li>
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
              <li><Link href="/faq-page" className="hover:underline">F.A.Q</Link></li>
              <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
            <ul className="space-y-1">
              <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link href="/terms-of-service" className="hover:underline">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        {/* Middle Column */}
        <div>
          <h3 className="font-semibold mb-4">Popular Posts</h3>
          <div className="space-y-6">
            <div>
              <p className="text-xs opacity-80">August 13, 2024</p>
              <Link href="/blog/slow-internet-issues" className="font-medium block hover:underline">
                How to Compare Financial Options Before You Commit
              </Link>
              <p className="text-sm opacity-80">
                A practical framework for comparing costs, tradeoffs, and risks
                before making an important money decision […]
              </p>
            </div>
            <div>
              <p className="text-xs opacity-80">July 11, 2024</p>
              <Link href="/blog/computer-problem" className="font-medium block hover:underline">
                Questions to Ask Before Booking Travel and Accommodation
              </Link>
              <p className="text-sm opacity-80">
                Use this checklist to compare routes, policies, lodging, and
                timing before you book […]
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <p className="text-sm mb-4">
            Our consultation team is here to help with everyday decisions
            across finance, travel, digital services, and more.
          </p>
<SubscribeForm />

        </div>
      </div>

      {/* Bottom footer */}
      <div className="mt-10 text-center text-xs opacity-80 space-y-1">
        <p>© {new Date().getFullYear()} QuickSquad.</p>
        <p>Owned and operated by A V TRADE CORPORATION.</p>
      </div>
    </footer>
  )
}
