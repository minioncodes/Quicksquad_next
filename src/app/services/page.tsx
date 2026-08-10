"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  {
    title: "Financial Assistance",
    image: "/images/security.jpg",
    description:
      "Get guidance on everyday financial questions with practical, easy-to-follow support.",
    bullets: [
      "Bank account and payment setup guidance",
      "Credit score and credit report basics",
      "Tax filing and financial document help",
    ],
  },
  {
    title: "Digital Account & Online Services",
    image: "/images/performance.jpg",
    description:
      "Navigate online accounts, password recovery, payments, and email setup with confidence.",
    bullets: [
      "Email account setup and organization",
      "Password recovery and account access help",
      "Online payments and cloud account guidance",
    ],
  },
  {
    title: "Location & Navigation Assistance",
    image: "/images/backup.jpg",
    description:
      "Find places, plan routes, and locate important nearby services without the guesswork.",
    bullets: [
      "Address and direction help",
      "Nearby services and local search guidance",
      "ZIP code and area code lookups",
    ],
  },
  {
    title: "Legal & Government Services",
    image: "/images/printer.jpg",
    description:
      "Get help understanding forms, benefits, registrations, and common public-service tasks.",
    bullets: [
      "Benefit and application guidance",
      "DMV and registration assistance",
      "Document preparation support",
    ],
  },
  {
    title: "Travel & Transportation",
    image: "/images/email.jpg",
    description:
      "Plan trips, compare options, and organize travel details with less stress.",
    bullets: [
      "Flights, hotel, and route planning",
      "Visa and insurance guidance",
      "Public transportation and itinerary help",
    ],
  },
  {
    title: "Consumer & Shopping Assistance",
    image: "/images/network.jpg",
    description:
      "Make smarter buying decisions with comparison help and subscription guidance.",
    bullets: [
      "Product comparisons and review summaries",
      "Deals, offers, and membership guidance",
      "Subscription and renewal management help",
    ],
  },
  {
    title: "Healthcare & Wellness",
    image: "/images/virus.jpg",
    description:
      "Find providers, understand coverage, and organize everyday wellness logistics.",
    bullets: [
      "Hospital, clinic, and pharmacy lookup",
      "Insurance and coverage guidance",
      "Appointment scheduling support",
    ],
  },
  {
    title: "Education & Career Guidance",
    image: "/images/software.jpg",
    description:
      "Move forward with courses, applications, resumes, and job planning support.",
    bullets: [
      "Course and certification research",
      "Resume and job application help",
      "Scholarship and college guidance",
    ],
  },
  {
    title: "Personal Planning Support",
    image: "/images/pc.jpg",
    description:
      "Get structured guidance for decisions that involve documents, deadlines, and next steps.",
    bullets: [
      "Decision checklists and planning help",
      "Research summaries for important choices",
      "One-on-one consultation support",
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
          We provide a wide range of consultation services to help you make
          informed decisions across everyday personal and practical needs.
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
