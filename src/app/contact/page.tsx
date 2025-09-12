"use client";

import { useEffect, useState } from "react";

// Extend Window interface so TS knows about grecaptcha
declare global {
  interface Window {
    grecaptcha?: {
      getResponse: () => string;
    };
  }
}

interface Category {
  title: string;
  description: string[];
}

const allCategories: Category[] = [
        { 
            title: "Financial Assistance", 
            description: [
                "How to open a bank account online",
                "Understanding credit scores and reports",
                "Stock market investment advice",
                "Cryptocurrency basics and trading tips",
                "Tax filing assistance and IRS guidance"
            ] 
        },
        { 
            title: "Technology & Digital Services", 
            description: [
                "Troubleshooting common tech issues",
                "Setting up and securing email accounts",
                "Online payment and digital wallet support",
                "Recovering lost passwords and account access",
                "Cloud storage and backup solutions"
            ] 
        },
        { 
            title: "Location & Navigation Assistance", 
            description: [
                "Finding addresses and directions",
                "Locating nearby services (banks, hospitals, restaurants, etc.)",
                "Understanding ZIP codes and area codes"
            ] 
        },
        { 
            title: "Legal & Government Services", 
            description: [
                "Applying for social security benefits",
                "Understanding tax deductions and credits",
                "Assistance with DMV services (licenses, registrations)",
                "Filing small claims or legal documents"
            ] 
        },
        { 
            title: "Travel & Transportation", 
            description: [
                "Booking flights, hotels, and rental cars",
                "Public transportation schedules and routes",
                "Understanding travel insurance and visa requirements"
            ] 
        },
        { 
            title: "Consumer & Shopping Assistance", 
            description: [
                "Finding the best online deals and discounts",
                "Product comparisons and reviews",
                "Subscription and membership management"
            ] 
        },
        { 
            title: "Healthcare & Wellness", 
            description: [
                "Finding nearby hospitals, clinics, or pharmacies",
                "Understanding insurance coverage and policies",
                "Booking doctor’s appointments online"
            ] 
        },
        { 
            title: "Education & Career Guidance", 
            description: [
                "Finding online courses and certifications",
                "Resume building and job search assistance",
                "College and scholarship application guidance"
            ] 
        }
    ];

export default function ContactPage() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // Check reCAPTCHA status
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.grecaptcha) {
        setCaptchaVerified(window.grecaptcha.getResponse().length > 0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 px-6 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-3xl mx-auto text-gray-900 bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Contact Us
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Our 24/7 tech support team offers expert solutions. Fill out the form
          and we’ll get back to you quickly.
        </p>

        <form className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <input
              type="text"
              name="Message"
              required
              placeholder="Enter your Message"
              className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-2"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
            title="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubCategory("");
              }}
              className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-2"
              required
            >
              <option value="">Select a category</option>
              {allCategories.map((cat, i) => (
                <option key={i} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          {/* Sub-category */}
          {category && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub-Category
              </label>
              <select
              title="Sub-category"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-2"
                required
              >
                <option value="">Select a sub-category</option>
                {allCategories
                  .find((cat) => cat.title === category)
                  ?.description.map((sub, idx) => (
                    <option key={idx} value={sub}>
                      {sub}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* reCAPTCHA */}
          <div className="recaptcha-wrapper flex justify-center">
            <div
              className="g-recaptcha"
              data-sitekey="6LeNPuUqAAAAAOLA9Q4l620A_HfT4V5MhdCxxVWX"
            ></div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!captchaVerified}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
              captchaVerified
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
