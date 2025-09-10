"use client"
import Image from "next/image"
import { FaCheckCircle, FaHeadset, FaHandsHelping, FaRegSmile, FaCogs, FaComments } from "react-icons/fa"

export default function AboutPage() {
  return (
    <main>
      {/* Hero / Header Section */}
      <section className="bg-gradient-to-b from-blue-500 to-blue-300 text-white py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About QuickSquad</h1>
          <p className="max-w-2xl mx-auto text-lg text-blue-100">
            Your trusted partner for solving everyday tech and support challenges, available anytime you need us.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 bg-white text-black">
        <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center px-6">
          <div>
            <Image
              src="/images/support-team.jpg"
              alt="QuickSquad Team"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="mb-4 text-gray-700">
              At <span className="font-semibold">QuickSquad</span>, we’re not just a support service—we’re your
              go-to problem solvers. Our mission is simple: connect you with skilled specialists who are always ready 
              to resolve your issues with clarity, speed, and care.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-blue-600 mt-1" />
                Delivering the best solutions with the latest technology.
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-blue-600 mt-1" />
                Swift, reliable problem-solving around the clock.
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-blue-600 mt-1" />
                Staying ahead to provide top-tier, future-ready support.
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-blue-600 mt-1" />
                Keeping your digital life running smoothly, always.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What We Do (Features Grid) */}
      <section className="py-16 bg-gray-50 text-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">What We Do</h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-12">
            From technical troubleshooting to expert guidance, QuickSquad is built to make your life easier and stress-free.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <FaCogs className="text-blue-600 text-3xl mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Core Services</h3>
              <p className="text-gray-600 text-sm">
                End-to-end support for devices, software, and systems.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <FaHeadset className="text-blue-600 text-3xl mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">24/7 Expert Help</h3>
              <p className="text-gray-600 text-sm">
                Always just a call away—fast, reliable, and effective.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <FaHandsHelping className="text-blue-600 text-3xl mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Personalized Support</h3>
              <p className="text-gray-600 text-sm">
                Solutions tailored to your unique problems and goals.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <FaRegSmile className="text-blue-600 text-3xl mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Clarity Always</h3>
              <p className="text-gray-600 text-sm">
                We simplify tech—no jargon, just clear communication.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <FaComments className="text-blue-600 text-3xl mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Community Feedback</h3>
              <p className="text-gray-600 text-sm">
                We listen, adapt, and improve through your shared experiences.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <FaCogs className="text-blue-600 text-3xl mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Smart Solutions</h3>
              <p className="text-gray-600 text-sm">
                Future-ready frameworks that keep your tech ahead of the curve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="bg-blue-600 text-white text-center py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Why Choose QuickSquad?</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Because we believe support should be more than solving issues—it should be about building trust, ensuring clarity, and making your life simpler.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded font-medium hover:bg-gray-200 transition"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  )
}
