"use client";
import { motion } from "framer-motion";

export default function SpeedTest() {
  return (
    <section className="bg-gray-50 py-16 px-6 min-h-screen">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
          Internet Speed Test
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Measure your internet download and upload speeds instantly with our
          built-in speed test. Stay informed about your network performance to
          ensure smooth browsing, streaming, and remote work.
        </p>
      </motion.div>

      {/* Speed Test Widget */}
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="relative w-full pb-[50%] min-h-[500px]">
          <iframe
            src="https://openspeedtest.com/Get-widget.php"
            className="absolute top-0 left-0 w-full h-full border-none overflow-hidden rounded-xl shadow-lg"
            style={{ minHeight: "360px" }}
          ></iframe>
        </div>
      </motion.div>
    </section>
  );
}
