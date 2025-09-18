"use client";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="bg-gray-50 py-16 px-6 min-h-screen">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-black">
          QuickSquad Privacy Policy
        </h1>
        <h4 className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          At QuickSquad, your privacy is our highest priority. This Privacy
          Policy explains how we collect, use, safeguard, and share your
          information while you use our website and services.
        </h4>
      </motion.div>

      {/* Content */}
      <main className="max-w-4xl mx-auto space-y-8 text-gray-800 leading-relaxed">
        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-semibold text-gray-900">Overview</h3>
          <p>
            This Privacy Policy describes how QuickSquad [&quot;we,&quot; &quot;our,&quot; &quot;us&quot;]
            handles your personal information. By using our services, you agree
            to the practices outlined in this policy.
          </p>
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-semibold text-gray-900">1. Information We Collect</h3>
          <p>Depending on how you interact with our services, we may collect:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact details (such as your name, email address, and phone number).</li>
            <li>Technical details (IP address, browser type, device information).</li>
            <li>Service-related information (support requests, inquiries, and issues reported).</li>
          </ul>
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-semibold text-gray-900">2. How We Use Your Information</h3>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Deliver, maintain, and improve our services.</li>
            <li>Provide customer support and respond to your inquiries.</li>
            <li>Send important updates, notifications, or service-related communications.</li>
          </ul>
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-semibold text-gray-900">3. Sharing Your Information</h3>
          <p>
            We respect your privacy and never sell your data. However, we may
            share your information with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Trusted third-party service providers assisting us in operations.</li>
            <li>Regulatory or legal authorities when required by law.</li>
          </ul>
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-semibold text-gray-900">4. Data Security</h3>
          <p>
            We implement industry-standard security measures to protect your
            data. However, please note that no online system is completely
            secure, and we cannot guarantee absolute protection.
          </p>
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-semibold text-gray-900">5. Your Rights</h3>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access, correct, or request deletion of your personal data.</li>
            <li>Opt out of promotional or marketing communications.</li>
          </ul>
          <p className="mt-2">
            To exercise your rights, contact us at:{" "}
            <strong>support@digipants.com</strong>
          </p>
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-semibold text-gray-900">6. Cookies</h3>
          <p>
            We use cookies and similar technologies to enhance your browsing
            experience, improve site functionality, and analyze usage patterns.
            You can manage cookie preferences in your browser settings.
          </p>
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-semibold text-gray-900">7. Updates to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted here, and continued use of our services indicates
            your acceptance of the revised policy.
          </p>
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-semibold text-gray-900">8. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy or how we
            handle your information, please contact us:
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
