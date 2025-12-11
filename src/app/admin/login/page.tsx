// src/app/admin/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();
  const from = params?.get("from") || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!password) return setErr("Enter password");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data?.error || "Login failed");
      } else {
        // cookie set by server; navigate to original page
        router.push(from);
      }
    } catch (err) {
      setErr("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6">
        <h1 className="text-xl font-semibold mb-2">Admin Login</h1>
        <p className="text-sm text-gray-600 mb-4">Enter admin password to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            autoFocus
          />
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </div>
          {err && <p className="text-sm text-red-600">{err}</p>}
        </form>
      </div>
    </main>
  );
}
