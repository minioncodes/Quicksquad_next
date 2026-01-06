import Image from "next/image"
import Link from "next/link"
import SubscribeForm from "../SubscribeForm"

export default function FooterAu() {
  return (
    <footer className="bg-gradient-to-b from-blue-500 to-blue-300 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">

        {/* Left Column */}
        <div>
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
          <p className="text-sm mb-4">
            Our website blends creativity, innovation, and functionality for a seamless
            experience, helping you find solutions quickly and efficiently.(Australia)
          </p>

          <h3 className="font-semibold mb-2">Information</h3>
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

          <Link href="/speedtest">
            <button className="mt-4 bg-blue-700 hover:bg-blue-800 px-6 py-2 rounded w-full md:w-auto">
              INTERNET SPEED
            </button>
          </Link>
        </div>

        {/* Middle Column */}
        <div>
          <h3 className="font-semibold mb-4">Popular Posts</h3>
          <div className="space-y-6">
            <div>
              <p className="text-xs opacity-80">August 13, 2024</p>
              <Link href="/blog/slow-internet-issues" className="font-medium block hover:underline">
                How to Fix Slow Internet and Connectivity Issues
              </Link>
              <p className="text-sm opacity-80">
                Slow internet can be frustrating! Learn how to troubleshoot your
                network, optimize router settings, and speed up […]
              </p>
            </div>
            <div>
              <p className="text-xs opacity-80">July 11, 2024</p>
              <Link href="/blog/computer-problem" className="font-medium block hover:underline">
                Common Computer Problems & How to Fix Them
              </Link>
              <p className="text-sm opacity-80">
                Facing issues like freezing, crashing, or blue screen errors?
                Here’s a step-by-step guide […]
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <p className="text-sm mb-4">
            Our 24/7 tech support team offers expert solutions. Contact us via form
            or call for fast, reliable assistance.
          </p>
          <SubscribeForm />
        </div>
      </div>

      {/* Bottom footer */}
      <div className="mt-10 text-center text-xs opacity-80">
        © {new Date().getFullYear()} QuickSquad. All Rights Reserved.
      </div>
    </footer>
  )
}
