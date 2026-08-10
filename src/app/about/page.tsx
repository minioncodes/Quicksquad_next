"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaCheckCircle, FaHeadset, FaHandsHelping, FaRegSmile, FaCogs, FaComments } from "react-icons/fa"

export default function AboutPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <main className="overflow-x-hidden w-full"> {/* ✅ Prevents horizontal scroll */}
      {/* Hero / Header Section */}
      <div className="bg-gradient-to-b from-blue-500 to-blue-300 text-white py-20 text-center w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6"> {/* ✅ constrain width */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            variants={fadeUp}
          >
            About QuickSquad
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-lg text-blue-100"
            variants={fadeUp}
          >
            Your trusted partner for everyday consultation needs, available whenever you need clear guidance.
          </motion.p>
        </div>
      </div>

      {/* Who We Are */}
      <section className="py-16 bg-white text-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-4 sm:px-6"> {/* ✅ fixed */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/team.png"
              alt="QuickSquad Team"
              width={500}
              height={400}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="mb-4 text-gray-700">
              At <span className="font-semibold">QuickSquad</span>, we are a consultation-led service designed to
              connect people with specialists across finance, travel, legal,
              digital, healthcare, shopping, and career decisions. Our mission
              is simple: deliver clarity, speed, and confidence when everyday
              choices feel overwhelming.
            </p>
            <ul className="space-y-3">
              {[
                "Delivering practical guidance tailored to real-world situations.",
                "Providing dependable consultation whenever timing matters.",
                "Connecting you with the right category of specialist quickly.",
                "Helping you act with confidence instead of confusion.",
              ].map((text, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                >
                  <FaCheckCircle className="text-blue-600 mt-1 shrink-0" /> {/* ✅ no stretching */}
                  <span>{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-gray-50 text-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center"> {/* ✅ constrain */}
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
          >
            What We Do
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto text-gray-600 mb-12"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
          >
            From financial questions to travel planning and digital account help,
            QuickSquad is built to make everyday decisions easier and less stressful.
          </motion.p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"> {/* ✅ responsive grid */}
            {[ 
              { icon: <FaCogs />, title: "Broad Consultation", desc: "Guidance across financial, legal, travel, digital, and personal service needs." },
              { icon: <FaHeadset />, title: "Accessible Help", desc: "Reach out whenever you need clear, timely answers and next steps." },
              { icon: <FaHandsHelping />, title: "Personalized Guidance", desc: "Recommendations shaped around your goals, priorities, and situation." },
              { icon: <FaRegSmile />, title: "Clarity Always", desc: "We simplify complex topics with direct, understandable communication." },
              { icon: <FaComments />, title: "Community Feedback", desc: "We listen, adapt, and improve through your shared experiences." },
              { icon: <FaCogs />, title: "Practical Solutions", desc: "Actionable guidance you can use immediately, not vague advice." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <div className="text-blue-600 text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <motion.section
        className="bg-blue-600 text-white text-center py-16"
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6"> {/* ✅ constrain */}
          <h2 className="text-3xl font-bold mb-4">Why Choose QuickSquad?</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Because consultation should do more than answer questions. It should
            build trust, create clarity, and make your next step simpler.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded font-medium hover:bg-gray-200 transition"
          >
            Get in Touch
          </a>
        </div>
      </motion.section>
    </main>
  )
}
