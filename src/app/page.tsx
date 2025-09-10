"use client"
import Image from "next/image"
import Link from "next/link"
import services from "./pages/services.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopCode,
  faHandHoldingDollar,
  faLocationDot,
  faScaleUnbalancedFlip,
  faRoute,
  faCartShopping,
  faStaffSnake,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  "fa-solid fa-laptop-code": faLaptopCode,
  "fa-solid fa-hand-holding-dollar": faHandHoldingDollar,
  "fa-solid fa-location-dot": faLocationDot,
  "fa-solid fa-scale-unbalanced-flip": faScaleUnbalancedFlip,
  "fa-solid fa-route": faRoute,
  "fa-solid fa-cart-shopping": faCartShopping,
  "fa-solid fa-staff-snake": faStaffSnake,
  "fa-solid fa-user-graduate": faUserGraduate,
};

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
      <div className="container text-gray-700 mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-2">OUR SERVICES</h2>
        <p className="text-gray-800 text-center mb-8">
          Explore our wide range of support services and choose the one that best fits your needs.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="border rounded-lg p-6 shadow hover:shadow-lg transition bg-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <FontAwesomeIcon
  icon={iconMap[service.icon as keyof typeof iconMap]}
  className="text-blue-600 text-2xl"
/>

                <h3 className="font-semibold text-lg">{service.title}</h3>
              </div>
              <p className="text-sm text-gray-700 mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="px-2 py-1 text-xs bg-gray-200 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Some Other Things */}
      <section className="py-16">
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
      <section className="py-16">
        <div className="container mx-auto grid md:grid-cols-2 items-center gap-8 text-black px-6">
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
            <Image src="/images/hero-4.jpg" alt="Office teamwork" width={500} height={400} className="rounded-lg" />
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 px-6 items-center text-gray-700">
          <div>
            <Image src="/images/hero-3.jpeg" alt="Support team" width={500} height={400} className="rounded-lg" />
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
      <section className="py-16">
        <div className="text-black container mx-auto px-6">
          <h2 className="text-center text-2xl font-bold mb-8">OUR LATEST UPDATES</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "How to Fix Slow Internet and Connectivity Issues", date: "Feb 10, 2025", img: "/images/1.jpg" },
              { title: "Common Computer Problems & How to Fix Them", date: "Feb 10, 2025", img: "/images/2.jpg" },
              { title: "Protecting Your Devices from Viruses & Malware", date: "Feb 10, 2025", img: "/images/3.jpg" },
            ].map((post, i) => (
              <div key={i} className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden">
                <Image src={post.img} alt={post.title} width={500} height={250} className="w-full" />
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
