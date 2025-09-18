"use client";
import { useState } from "react";
import TestimonialsSection from "../pages/Testimonialsection";

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, UPI, net banking, and digital wallets. Payments can be made securely through our website.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes, we use industry-standard encryption and secure payment gateways to ensure your payment details are protected. We do not store any card information on our servers.",
  },
  {
    question: "Do you offer refunds if I’m not satisfied with the service?",
    answer:
      "Yes, we have a refund policy based on the nature of the service provided. If you are not satisfied, please contact our support team for assistance.",
  },
  {
    question: "Can I get an invoice for my payment?",
    answer:
      "Absolutely! Once your payment is completed, you will receive an email with your invoice. You can also request a copy through our support team.",
  },
  {
    question: "Do you offer any discounts or subscription plans?",
    answer:
      "Yes, we offer special discounts for long-term support plans and business subscriptions. Check our website for the latest offers.",
  },
  {
    question: "What should I do if my payment fails?",
    answer:
      "If your payment fails, please try again with a different method or contact your bank. You can also reach out to our support team for assistance.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Frequently Asked Questions
          </h1>
          <div className="border-t-2 border-blue-600 w-24 mx-auto mt-2"></div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 cursor-pointer transition-all duration-300 ease-in-out"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                <img
                  src="https://cdn.prod.website-files.com/5746a22e485f3a03442bea0f/59a0272ee70cd600015ee73f_next.png"
                  alt="toggle"
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-90" : ""
                  }`}
                />
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 mt-2" : "max-h-0"
                }`}
              >
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TestimonialsSection/>
    </section>
  );
}
