"use client";
import { useState, useEffect } from "react";

const testimonials = [
  {
    text: "QuickSquad.live saved my laptop from a total meltdown! Their remote support was quick and efficient. I was back to work in no time. Highly recommended!",
    name: "Michael R.",
    location: "New York, NY",
  },
  {
    text: "I signed up for the Premium Plan, and it has been a lifesaver. The team is knowledgeable, friendly, and always available. My devices have never run smoother!",
    name: "Sarah L.",
    location: "Austin, TX",
  },
  {
    text: "Fantastic service! I had a printer issue that no one else could fix, but QuickSquad.live got it working perfectly within minutes. Worth every penny!",
    name: "David M.",
    location: "Los Angeles, CA",
  },
  {
    text: "Running a small business means I can’t afford tech issues. The Enterprise Plan from QuickSquad.live ensures everything runs smoothly—zero downtime and excellent support!",
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
                className="w-full flex-shrink-0 px-4"
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
