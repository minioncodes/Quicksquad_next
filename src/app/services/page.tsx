"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import InternetSpeedMeter from "../speedtest/page";

const services = [
  {
    title: "Security & Privacy Setup",
    image: "/images/security.jpg",
    description:
      "Protect your system from online threats with professional security and privacy configurations.",
    bullets: [
      "Antivirus & firewall installation",
      "Privacy settings optimization",
      "Secure browsing setup",
    ],
  },
  {
    title: "Performance Optimization",
    image: "/images/performance.jpg",
    description:
      "Boost your device’s speed and responsiveness with advanced optimization techniques.",
    bullets: [
      "Startup app management",
      "System cleanup",
      "RAM & storage optimization",
    ],
  },
  {
    title: "Data Backup & Recovery",
    image: "/images/backup.jpg",
    description:
      "Ensure your important files are backed up and recover lost data with expert help.",
    bullets: [
      "Cloud & local backup setup",
      "Data recovery support",
      "Automated backup scheduling",
    ],
  },
  {
    title: "Printer & Peripheral Support",
    image: "/images/printer.jpg",
    description:
      "Get hassle-free setup and troubleshooting for printers, scanners, and other peripherals.",
    bullets: [
      "Printer & scanner setup",
      "Driver installation",
      "Connectivity troubleshooting",
    ],
  },
  {
    title: "Email Configuration & Support",
    image: "/images/email.jpg",
    description:
      "Set up and troubleshoot email accounts across all major platforms and devices.",
    bullets: [
      "Email client setup (Outlook, Gmail, etc.)",
      "Sync across devices",
      "Security & spam filtering",
    ],
  },
  {
    title: "Internet & Network Support",
    image: "/images/network.jpg",
    description:
      "Fix connectivity problems and configure secure, high-speed networks for home or office.",
    bullets: [
      "Wi-Fi router setup",
      "Troubleshooting slow internet",
      "Network security & optimization",
    ],
  },
  {
    title: "Virus & Malware Removal",
    image: "/images/virus.jpg",
    description:
      "Remove harmful software and secure your system from future cyber threats.",
    bullets: [
      "Full system scans",
      "Virus & malware removal",
      "Security patch updates",
    ],
  },
  {
    title: "Software Installation & Setup",
    image: "/images/software.jpg",
    description:
      "Get assistance installing and configuring essential software for smooth performance.",
    bullets: [
      "OS & application setup",
      "Driver installations",
      "Configuration & updates",
    ],
  },
  {
    title: "PC & Laptop Troubleshooting",
    image: "/images/pc.jpg",
    description:
      "Expert solutions for fixing common PC and laptop issues with speed and efficiency.",
    bullets: [
      "Hardware diagnostics",
      "OS troubleshooting",
      "Blue screen & crash fixes",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="py-16 bg-gray-50">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Our Services
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We provide a wide range of expert services to keep your devices and
          networks running at peak performance, securely and reliably.
        </p>
      </section>

      {/* Services Grid */}
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            {/* Image */}
            <div className="relative w-full h-40 mb-4">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {service.description}
            </p>

            {/* Bullets */}
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 flex-grow">
              {service.bullets.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
