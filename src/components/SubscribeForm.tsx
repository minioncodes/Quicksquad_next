"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        const form = e.currentTarget;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;

        try {
          const res = await fetch("/api/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email }),
          });

          const data = await res.json();

          if (data.success) {
            setSuccess(true);
            form.reset();
          } else {
            alert("Something went wrong");
          }
        } catch {
          alert("Network error");
        } finally {
          setLoading(false);
        }
      }}
    >
      <input
        name="name"
        type="text"
        placeholder="Enter your name"
        className="w-full p-2 rounded border border-white"
        required
        disabled={loading}
      />

      <input
        name="email"
        type="email"
        placeholder="Enter your email"
        className="w-full p-2 rounded border border-white"
        required
        disabled={loading}
      />

      <button
        disabled={loading}
        className="w-full bg-blue-700 py-2 rounded font-semibold flex items-center cursor-pointer justify-center gap-2 disabled:opacity-60"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Subscribing…
          </>
        ) : (
          "SUBSCRIBE NOW"
        )}
      </button>

      {success && (
        <p className="text-green-200 text-sm text-center mt-2">
          ✅ Thank you for subscribing QuickSquad!
        </p>
      )}
    </form>
  );
}
