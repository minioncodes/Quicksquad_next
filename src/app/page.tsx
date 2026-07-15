"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import services from "./pages/services.js";
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

const posts = [
  {
    title: "How to Fix Slow Internet and Connectivity Issues",
    date: "Feb 10, 2025",
    img: "/images/1.jpg",
    slug: "slow-internet-issues",
  },
  {
    title: "Common Computer Problems & How to Fix Them",
    date: "Feb 10, 2025",
    img: "/images/2.jpg",
    slug: "common-computer-problems",
  },
  {
    title: "Protecting Your Devices from Viruses & Malware",
    date: "Feb 10, 2025",
    img: "/images/3.jpg",
    slug: "protecting-devices-malware",
  },
];

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
<section className="bg-gradient-to-b from-blue-500 to-blue-300 text-white min-h-[100vh] flex items-center">
  <div className="container mx-auto grid md:grid-cols-2 gap-10 px-6">

    {/* Left Content */}
    <motion.div
      className="flex flex-col justify-center"
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight font-[Poppins]">
        Your Go-To Guide for Everyday Queries!
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl mb-6 text-gray-100 max-w-2xl font-[Inter]">
        We’re here to link you with skilled specialists who are ready to tackle
        your problems, day or night.
      </p>

      <div className="space-x-4">
        {/* Gradient Button */}
        <Link
          href="/contact"
          className="px-6 py-3 rounded-lg text-base sm:text-lg font-semibold 
          bg-blue-600 
          hover:opacity-90 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]
          transition-all duration-300"
        >
          CONTACT US
        </Link>

        {/* Outline Button */}
        <Link
          href="/about"
          className="px-6 py-3 rounded-lg text-base sm:text-lg font-semibold 
          border border-white/90 
          hover:bg-white hover:text-blue-600 
          transition-all duration-300"
        >
          ABOUT US
        </Link>
      </div>
    </motion.div>

    {/* Right Image */}
    <motion.div
      className="flex justify-center items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full max-w-xl sm:max-w-2xl">
        <Image
          src="/images/hero.png"
          alt="Tech Support"
          width={1800}
          height={1600}
          className="rounded-xl shadow-2xl object-cover w-full h-auto"
          priority
        />
      </div>
    </motion.div>

  </div>
</section>



      {/* Our Services */}
      <section className="py-16">
        <div className="container text-gray-700 mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-2">OUR SERVICES</h2>
          <p className="text-gray-800 text-center mb-8">
            Explore our wide range of support services and choose the one that
            best fits your needs.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="border rounded-lg p-6 shadow hover:shadow-lg transition bg-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <FontAwesomeIcon
                    icon={iconMap[service.icon as keyof typeof iconMap]}
                    className="text-blue-600 text-2xl"
                  />
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  {service.description}
                </p>
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Some Other Things */}
      <section className="py-16">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 px-6 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/hero-2.jpg"
              alt="Team working"
              width={500}
              height={400}
              className="rounded-lg"
            />
          </motion.div>
          <motion.div
            className="text-black"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-4">
              SOME OTHER THINGS WE REALLY LOVE & LIKE
            </h2>
            <ul className="space-y-3">
              <li>✔ We deliver the best solutions with the latest tech.</li>
              <li>✔ Swift problem-solving is our passion.</li>
              <li>✔ We stay ahead to provide top-tier support.</li>
              <li>✔ Our goal is to keep your tech running smoothly.</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Smart Thinking */}
      <section className="py-16">
        <div className="container mx-auto grid md:grid-cols-2 items-center gap-8 text-black px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-4">
              SMART THINKING MEETS INNOVATIVE TECH FOR SEAMLESS SOLUTIONS.
            </h2>
            <p className="mb-6">
              At QuickSquad, we merge smart strategies with the latest tech to
              deliver efficient, future-proof solutions.
            </p>
            <Link
              href="/about"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              Learn More
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/images/hero-4.jpg"
              alt="Office teamwork"
              width={500}
              height={400}
              className="rounded-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 px-6 items-center text-gray-700">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/hero-3.jpeg"
              alt="Support team"
              width={500}
              height={400}
              className="rounded-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-4">WHAT MAKES US DIFFERENT?</h2>
            <p className="mb-6">
              Our commitment to 24/7 expert support, personalized solutions, and
              proactive problem-solving sets us apart.
            </p>
            <Link
              href="/about"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Our Latest Updates
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Stay updated with the latest tips, fixes, and guides from our
            experts to keep your devices running smoothly.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.3 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-xs text-gray-500 mb-1">{post.date}</p>
                    <h3 className="font-semibold text-lg text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600">
                      {post.title}
                    </h3>
                    <span className="mt-auto text-sm text-blue-600 font-medium group-hover:underline">
                      Read More →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
