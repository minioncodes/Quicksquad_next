"use client";
import { useState, useEffect } from "react";

const testimonials = [
  {
    text: "QuickSquad.live helped me sort through a confusing financial process quickly and clearly. I left the call knowing exactly what to do next.",
    name: "Michael R.",
    location: "New York, NY",
  },
  {
    text: "I signed up for the Premium Plan, and the guidance has been consistently practical. The team is responsive, organized, and easy to work with.",
    name: "Sarah L.",
    location: "Austin, TX",
  },
  {
    text: "Fantastic service. I needed help comparing options across travel, paperwork, and booking details, and QuickSquad made the whole process far less stressful.",
    name: "David M.",
    location: "Los Angeles, CA",
  },
  {
    text: "Running a small business means decisions pile up fast. The Enterprise Plan gives us dependable consultation support across admin, planning, and customer-facing questions.",
    name: "Emily J.",
    location: "Chicago, IL",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">
          What Our Customers Say
        </h2>

        {/* Slider wrapper */}
        <div className="relative max-w-3xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="w-full shrink-0 px-4"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                  <p className="text-lg text-gray-700 italic mb-6">“{t.text}”</p>
                  <div className="text-blue-600 font-semibold">{t.name}</div>
                  <div className="text-gray-500 text-sm">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, i) => (
            <button
            title="slide"
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                current === i ? "bg-blue-600 scale-110" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
