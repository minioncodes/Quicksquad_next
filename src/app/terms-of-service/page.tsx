"use client";
import { motion } from "framer-motion";

export default function TermsOfService() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="bg-gray-50 py-16 px-6 min-h-screen">
      {/* Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-black">
          QuickSquad Terms of Service
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          These Terms of Service outline the rules and responsibilities you agree
          to when using QuickSquad’s platform and services. Please read them
          carefully.
        </p>
      </motion.div>

      {/* Content */}
      <main className="max-w-4xl mx-auto space-y-8 text-gray-800 leading-relaxed">
        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-semibold text-gray-900">1. Acceptance of Terms</h3>
          <p>
            By accessing or using QuickSquad, you confirm that you agree to
            comply with these Terms. If you do not agree, please discontinue use
            of our services immediately.
          </p>
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-semibold text-gray-900">2. Fair Use of Services</h3>
          <p>
            QuickSquad is designed to provide reliable tech support. You agree
            to use our services responsibly and lawfully. Specifically, you must
            not:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Disrupt, overload, or interfere with the platform.</li>
            <li>Access or attempt to access data without authorization.</li>
            <li>Engage in fraudulent, harmful, or malicious activities.</li>
          </ul>
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-semibold text-gray-900">3. User Responsibilities</h3>
          <p>As a QuickSquad user, you are expected to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and up-to-date information.</li>
            <li>Maintain the confidentiality of your login credentials.</li>
            <li>Promptly report unauthorized use of your account.</li>
          </ul>
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-semibold text-gray-900">4. Intellectual Property</h3>
          <p>
            All content, branding, and materials on QuickSquad are the exclusive
            property of our company. You may not copy, distribute, or reproduce
            them without prior written permission.
          </p>
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-semibold text-gray-900">5. Limitation of Liability</h3>
          <p>
            While we strive to deliver uninterrupted, high-quality services, we
            are not liable for damages caused by service interruptions, data
            loss, or technical issues beyond our control.
          </p>
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-semibold text-gray-900">6. Termination of Access</h3>
          <p>
            QuickSquad reserves the right to suspend or terminate your access if
            you violate these Terms, engage in harmful activities, or misuse our
            services.
          </p>
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-semibold text-gray-900">7. Updates to Terms</h3>
          <p>
            These Terms may be updated from time to time. Any changes will be
            effective immediately upon posting. Continued use of our services
            constitutes acceptance of the revised Terms.
          </p>
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-semibold text-gray-900">8. Contact Us</h3>
          <p>
            If you have any questions or concerns about these Terms, please
            reach out to us:
          </p>
          <p className="mt-2">
            Email: <strong>support@digipants.com</strong>
          </p>
          <p className="mt-2">
            <strong>Effective Date:</strong> January 25, 2025
          </p>
        </motion.div>
      </main>
    </section>
  );
}
