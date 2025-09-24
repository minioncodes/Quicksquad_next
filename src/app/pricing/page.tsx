"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

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
export default function PricingPage() {
  const plans = [
    {
      title: "Basic Plan",
      price: 2000, // $20.00 → in cents
      displayPrice: "$20/month",
      features: [
        "24/7 access to online support",
        "Basic troubleshooting for software and devices",
        "Assistance with installation and updates",
        "Email and chat support",
      ],
    },
    {
      title: "Premium Plan",
      price: 7500, // $75.00 → in cents
      displayPrice: "$75/month",
      features: [
        "Everything in the Basic Plan",
        "Advanced troubleshooting for hardware and networks",
        "Remote desktop support",
        "Comprehensive device optimization",
      ],
    },
    {
      title: "Enterprise Plan",
      price: 0, // Custom pricing
      displayPrice: "Custom Pricing",
      features: [
        "Tailored solutions for businesses",
        "Dedicated account manager",
        "24/7 phone, email, and chat support",
        "Scalability for multiple devices and users",
      ],
    },
  ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  const [visibleCards, setVisibleCards] = useState<number>(0);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Payment handler
  const handlePayment = (plan: any) => {
    if (plan.price === 0) {
      alert("Please contact us for Enterprise Plan pricing.");
      return;
    }

    const options = {
      key: "rzp_test_RH1qkK5aG1oovC", // 🔑 Replace with your Razorpay Key ID
      amount: plan.price, // in cents ($1 = 100 cents)
      currency: "USD", // ✅ using USD
      name: "QuickSquad",
      description: `${plan.title} Subscription`,
      image: "/images/logo.png", // Replace with your logo
      handler: function (response: any) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "1234567890",
      },
      theme: {
        color: "#0ea5e9",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  // Animate cards
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCards((prev) => {
        if (prev < plans.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [plans.length]);

  return (
    <main className="bg-gray-50 min-h-screen py-16 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          OUR PRICING PLAN
        </h1>
        <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
          We provide flexible, transparent pricing to meet your budget and
          support needs.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto grid md:grid-cols-3 gap-8 max-w-6xl mb-16">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl shadow-lg p-8 border flex flex-col transition-all duration-700 ease-out transform ${
              visibleCards > index
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {plan.title}
            </h2>
            <h3 className="text-xl text-blue-600 font-semibold mb-4">
              {plan.displayPrice}
            </h3>
            <div className="border-b border-gray-200 mb-6"></div>
            <ul className="space-y-3 flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Image
                  width={1600}
                  height={720}
                    src="https://cdn.prod.website-files.com/5746a22e485f3a03442bea0f/58c446970d703bb04aa5571f_confirm.svg"
                    alt="check"
                    className="w-5 h-5 mt-1"
                  />
                  <p className="text-gray-700">{feature}</p>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePayment(plan)}
              className="mt-8 inline-block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
              {/* FAQ List */}
        <div className="space-y-4 w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 cursor-pointer transition-all duration-300 ease-in-out"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                <Image
                  width={1600}
                  height={720}
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
    </main>
  );
}
