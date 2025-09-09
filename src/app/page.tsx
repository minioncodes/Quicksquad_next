"use client"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-500 to-blue-300 text-white h-screen flex items-center">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 px-6">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your Go-To Guide for Everyday Queries!
          </h1>
          <p className="text-lg mb-6 text-gray-100 max-w-lg">
            We’re here to link you with skilled specialists who are ready 
            to tackle your problems, day or night.
          </p>
          <div className="space-x-4">
            <Link
              href="/contact"
              className="bg-blue-800 px-6 py-3 rounded hover:bg-blue-900 transition"
            >
              CONTACT US
            </Link>
            <Link
              href="/about"
              className="border border-white px-6 py-3 rounded hover:bg-white hover:text-blue-600 transition"
            >
              ABOUT US
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center items-center">
          <Image
            src="/images/hero.png"
            alt="Tech Support"
            width={1500}
            height={1400}
            className="rounded-lg shadow-lg object-cover"
            priority
          />
        </div>
      </div>
    </section>

      {/* Our Services */}
      <section className="py-16">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-2xl font-bold mb-2">OUR SERVICES</h2>
          <p className="text-gray-600 mb-8">
            Explore our wide range of tech support services and choose the one that best fits your needs.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {["Technology & Digital Services", "Financial Assistance", "Location & Navigation Assistance", "Legal Services", "Travel & Transportation"].map((service, i) => (
              <div key={i} className="border rounded-lg p-6 shadow hover:shadow-lg">
                <h3 className="font-semibold mb-3">{service}</h3>
                <p className="text-sm text-gray-600">Description of {service}...</p>
              </div>
            ))}
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded">View All</button>
        </div>
      </section>

      {/* Some Other Things */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 px-6 items-center">
          <div>
            <Image src="/images/hero-2.jpg" alt="Team working" width={500} height={400} className="rounded-lg" />
          </div>
          <div className="text-black">
            <h2 className="text-2xl font-bold mb-4">SOME OTHER THINGS WE REALLY LOVE & LIKE</h2>
            <ul className="space-y-3">
              <li>✔ We deliver the best solutions with the latest tech.</li>
              <li>✔ Swift problem-solving is our passion.</li>
              <li>✔ We stay ahead to provide top-tier support.</li>
              <li>✔ Our goal is to keep your tech running smoothly.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Smart Thinking */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-16">
        <div className="container mx-auto grid md:grid-cols-2 items-center gap-8 px-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              SMART THINKING MEETS INNOVATIVE TECH FOR SEAMLESS SOLUTIONS.
            </h2>
            <p className="mb-6">
              At QuickSquad, we merge smart strategies with the latest tech to deliver efficient, future-proof solutions.
            </p>
            <Link href="/about" className="bg-white text-blue-600 px-5 py-2 rounded hover:bg-gray-200">Learn More</Link>
          </div>
          <div>
            <Image src="/images/office.jpg" alt="Office teamwork" width={200} height={400} className="rounded-lg" />
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 px-6 items-center">
          <div>
            <Image src="/images/support.jpg" alt="Support team" width={200} height={400} className="rounded-lg" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">WHAT MAKES US DIFFERENT?</h2>
            <p className="mb-6">
              Our commitment to 24/7 expert support, personalized solutions, and proactive problem-solving sets us apart.
            </p>
            <Link href="/about" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-2xl font-bold mb-8">OUR LATEST UPDATES</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "How to Fix Slow Internet and Connectivity Issues", date: "Feb 10, 2025", img: "/images/blog1.jpg" },
              { title: "Common Computer Problems & How to Fix Them", date: "Feb 10, 2025", img: "/images/blog2.jpg" },
              { title: "Protecting Your Devices from Viruses & Malware", date: "Feb 10, 2025", img: "/images/blog3.jpg" },
            ].map((post, i) => (
              <div key={i} className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden">
                <Image src={post.img} alt={post.title} width={400} height={250} className="w-full" />
                <div className="p-4">
                  <p className="text-xs text-gray-500">{post.date}</p>
                  <h3 className="font-semibold mb-2">{post.title}</h3>
                  <Link href="#" className="text-blue-600 text-sm hover:underline">Read More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
