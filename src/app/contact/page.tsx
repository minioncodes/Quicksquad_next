"use client";

import { useState } from "react";

interface Category {
  title: string;
  description: string[];
}

const allCategories: Category[] = [
  {
    title: "Banking & Financial Guidance",
    description: [
      "How to open a bank account online",
      "Understanding credit scores and reports",
      "General financial concepts and terminology",
      "Preparing questions for a qualified financial professional",
      "Online financial account navigation guidance",
    ],
  },
  {
    title: "Digital Account & Online Services",
    description: [
      "Setting up and securing email accounts",
      "Online payment and digital wallet guidance",
      "Recovering lost passwords and account access",
      "Cloud storage and backup planning",
      "Understanding common online account settings",
    ],
  },
  {
    title: "Technology & Internet Guidance",
    description: [
      "Computer, device, and internet guidance",
      "Online safety and basic digital tasks",
      "Finding reliable online resources",
    ],
  },
  {
    title: "Government Services Guidance",
    description: [
      "Finding official government resources",
      "Understanding public-service portals and forms",
      "Online application and registration task guidance",
      "General information only, not legal advice",
    ],
  },
  {
    title: "Travel & Transportation",
    description: [
      "Booking flights, hotels, and rental cars",
      "Public transportation schedules and routes",
      "Finding official visa and travel information",
    ],
  },
  {
    title: "Consumer & Shopping Assistance",
    description: [
      "Finding the best online deals and discounts",
      "Product comparisons and reviews",
      "Subscription and membership management",
    ],
  },
  {
    title: "Healthcare & Wellness",
    description: [
      "Finding nearby hospitals, clinics, or pharmacies",
      "Understanding general health-information resources",
      "Booking healthcare appointments online",
    ],
  },
  {
    title: "Education & Career Guidance",
    description: [
      "Finding online courses and certifications",
      "Resume building and job search assistance",
      "College and scholarship application guidance",
    ],
  },
];

export default function ContactPage() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus(null);

    if (!form.name || !form.email || !form.phone || !form.message) {
      setFormStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    // const responseToken =
    //   window.grecaptcha?.getResponse(
    //     recaptchaWidgetId.current !== null ? recaptchaWidgetId.current : undefined
    //   ) || "";

    // if (!responseToken.length) {
    //   setCaptchaVerified(false);
    //   alert("Please complete the reCAPTCHA challenge.");
    //   return;
    // }

    setLoading(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, category, subCategory }),
      });

      const data = await res.json();

      if (res.ok) {
        setFormStatus({ type: "success", message: data.message || "Your consultation request has been sent." });
        setForm({ name: "", email: "", phone: "", message: "" });
        setCategory("");
        setSubCategory("");
      } else {
        setFormStatus({ type: "error", message: data.error || "We could not send your request. Please try again." });
      }
    } catch {
      setFormStatus({ type: "error", message: "Network error. Please check your connection and try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
<main className="bg-linear-to-br from-blue-50 to-white px-6 py-12 md:py-16">
  <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.8fr_1.2fr]">
    <aside className="h-fit rounded-2xl bg-slate-950 p-8 text-white shadow-lg">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-300">Business transparency</p>
      <h1 className="mt-3 text-3xl font-bold">Contact QuickSquad</h1>
      <p className="mt-4 text-sm leading-6 text-slate-300">QuickSquad is a consumer-facing AI-powered consultation platform for everyday guidance and online tasks.</p>
      <a href="tel:+18443121044" className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-white px-4 py-3 text-center text-base font-bold text-blue-700 transition hover:bg-blue-50">Call Now: (844) 312-1044</a>
      <dl className="mt-8 space-y-5 text-sm">
        <div><dt className="font-semibold text-blue-200">Brand Name</dt><dd className="mt-1 text-white">QuickSquad</dd></div>
        <div><dt className="font-semibold text-blue-200">Customer Support</dt><dd className="mt-1"><a className="text-white underline" href="mailto:support@quicksquad.live">support@quicksquad.live</a></dd></div>
        <div><dt className="font-semibold text-blue-200">Phone</dt><dd className="mt-1"><a className="text-white underline" href="tel:+18443121044">(844) 312-1044</a></dd></div>
        <div><dt className="font-semibold text-blue-200">Sales</dt><dd className="mt-1"><a className="text-white underline" href="mailto:sales@quicksquad.live">sales@quicksquad.live</a></dd></div>
        <div><dt className="font-semibold text-blue-200">Business Hours</dt><dd className="mt-1 text-slate-300">Customer Support availability is provided when you contact us.</dd></div>
      </dl>
    </aside>
      <div className="text-gray-900 bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Start a Consultation
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Tell us what you need help with. QuickSquad provides general guidance
          and consultation; regulated professional advice is not provided.
        </p>

        {formStatus && (
          <div
            role="status"
            className={`mb-6 rounded-lg border px-4 py-3 text-sm ${formStatus.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}
          >
            {formStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              value={form.name}
              onChange={handleChange}
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
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              required
              placeholder="Enter your message"
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-2 min-h-30"
            ></textarea>
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

          {/* Submit */}
<button
  type="submit"
  disabled={loading}
  className={`w-full py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center gap-3 ${
    !loading
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  {loading ? (
    <>
      <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      Sending…
    </>
  ) : (
    "Submit"
  )}
</button>

        </form>
      </div>
  </div>
</main>
  );
}
