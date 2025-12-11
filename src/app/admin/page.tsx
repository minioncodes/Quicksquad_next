// src/app/admin/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type BlogItem = {
  _id: string;
  title: string;
  slug: string;
  image?: string;
  date?: string;
  category?: string;
  content: string;
};

const ADMIN_TOKEN_KEY = "qs_admin_token";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [editing, setEditing] = useState<BlogItem | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    imageUrl: "",
    imageFileDataUrl: "", // if uploaded
    date: new Date().toISOString().slice(0, 10),
    category: "",
    content: "",
  });

  useEffect(() => {
    const t = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (t) setToken(t);
    fetchBlogs(t ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setField<K extends keyof typeof form>(k: K, value: (typeof form)[K]) {
    setForm((s) => ({ ...s, [k]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setField("imageFileDataUrl", result);
      setField("imageUrl", ""); // prefer file
    };
    reader.readAsDataURL(file);
  }

  function imageValue() {
    return form.imageFileDataUrl || form.imageUrl || "";
  }

  /**
   * Try admin endpoint first (using cookie or bearer depending on token).
   * If it fails with 401/403, fallback to public /api/blogs so existing posts are visible.
   */
  async function fetchBlogs(existingToken: string | null = token) {
    try {
      setLoading(true);
      setMessage(null);

      // prepare admin opts (cookie or bearer)
      const adminOpts: RequestInit =
        existingToken === "cookie"
          ? { credentials: "include" }
          : existingToken
          ? { headers: { Authorization: `Bearer ${existingToken}` } }
          : {};

      // attempt admin fetch (if token provided) — otherwise skip to public
      let res: Response | null = null;
      if (existingToken) {
        try {
          res = await fetch("/api/admin/blogs", adminOpts);
        } catch (err) {
          console.warn("Admin fetch error:", err);
          res = null;
        }
      }

      // if we got a response and it's ok -> use it
      if (res && res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setBlogs(data);
        else setBlogs([]);
        return;
      }

      // if admin responded with 401/403 or admin fetch failed -> fallback to public
      if (res && (res.status === 401 || res.status === 403)) {
        console.info("Admin auth required — falling back to public /api/blogs");
      } else if (!existingToken) {
        // no token provided — try public immediately
        console.info("No admin token — using public /api/blogs");
      } else if (res && !res.ok) {
        console.warn("Admin /api/admin/blogs returned non-ok, falling back:", res.status);
      }

      // fallback public fetch
      const pub = await fetch("/api/blogs");
      if (!pub.ok) {
        const body = await pub.json().catch(() => null);
        setMessage(body?.error || `Failed to load public blogs (${pub.status})`);
        setBlogs([]);
        return;
      }
      const publicData = await pub.json();
      if (Array.isArray(publicData)) setBlogs(publicData);
      else setBlogs([]);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load blogs (network error)");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }

  // LOGIN tries cookie endpoint first then falls back to bearer
  async function login(e?: React.FormEvent) {
    e?.preventDefault();
    if (!password) {
      setMessage("Enter admin password");
      return;
    }

    setLoading(true);
    setMessage(null);

    // try cookie-login
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
      });

      if (res.ok) {
        localStorage.setItem(ADMIN_TOKEN_KEY, "cookie");
        setToken("cookie");
        setPassword("");
        setMessage("Logged in (cookie mode)");
        await fetchBlogs("cookie");
        setLoading(false);
        return;
      }

      if (res.status === 401) {
        setMessage("Invalid password");
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn("Cookie login failed or endpoint missing, fallback to bearer:", err);
    }

    // fallback bearer (legacy)
    try {
      localStorage.setItem(ADMIN_TOKEN_KEY, password);
      setToken(password);
      setPassword("");
      setMessage("Logged in (fallback bearer mode)");
      await fetchBlogs(password);
    } catch (err) {
      console.error(err);
      setMessage("Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await fetch("/api/admin/logout", { method: "POST", credentials: "include" }).catch(() => null);
    } catch {}
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken(null);
    setMessage("Logged out");
    fetchBlogs(null);
  }

  async function handleCreate(e?: React.FormEvent) {
    e?.preventDefault();
    if (!token) return setMessage("Not authenticated");
    if (!form.title || !form.slug || !form.content) return setMessage("Title, slug, content required");

    setLoading(true);
    try {
      const body = {
        title: form.title,
        slug: form.slug,
        image: imageValue(),
        date: form.date,
        category: form.category,
        content: form.content,
      };

      const opts: RequestInit =
        token === "cookie"
          ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), credentials: "include" }
          : { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(body) };

      const res = await fetch("/api/admin/blogs", opts);
      const data = await res.json();
      if (!res.ok) {
        setMessage(data?.error || "Create failed");
      } else {
        setMessage("Created successfully");
        setForm({
          title: "",
          slug: "",
          imageUrl: "",
          imageFileDataUrl: "",
          date: new Date().toISOString().slice(0, 10),
          category: "",
          content: "",
        });
        await fetchBlogs(token);
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(b: BlogItem) {
    setEditing(b);
    setForm({
      title: b.title,
      slug: b.slug,
      imageUrl: b.image ?? "",
      imageFileDataUrl: "",
      date: b.date ? b.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
      category: b.category ?? "",
      content: b.content,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleUpdate(e?: React.FormEvent) {
    e?.preventDefault();
    if (!token || !editing) return setMessage("Not authenticated or missing blog");
    setLoading(true);
    try {
      const body = {
        title: form.title,
        slug: form.slug,
        image: imageValue(),
        date: form.date,
        category: form.category,
        content: form.content,
      };

      const opts: RequestInit =
        token === "cookie"
          ? { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), credentials: "include" }
          : { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(body) };

      const res = await fetch(`/api/admin/blogs/${editing._id}`, opts);
      const data = await res.json();
      if (!res.ok) setMessage(data?.error || "Update failed");
      else {
        setMessage("Updated");
        setEditing(null);
        setForm({
          title: "",
          slug: "",
          imageUrl: "",
          imageFileDataUrl: "",
          date: new Date().toISOString().slice(0, 10),
          category: "",
          content: "",
        });
        await fetchBlogs(token);
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!token) return setMessage("Not authenticated");
    if (!confirm("Delete this blog? This cannot be undone.")) return;
    setLoading(true);
    try {
      const opts: RequestInit =
        token === "cookie"
          ? { method: "DELETE", credentials: "include" }
          : { method: "DELETE", headers: { Authorization: `Bearer ${token}` } };

      const res = await fetch(`/api/admin/blogs/${id}`, opts);
      const data = await res.json();
      if (!res.ok) setMessage(data?.error || "Delete failed");
      else {
        setMessage("Deleted");
        await fetchBlogs(token);
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  }

  // helper to decide between next/image and <img> for data: URIs
  const RenderPreviewImage = ({ src, alt }: { src: string; alt: string }) => {
    if (!src) return null;
    if (src.startsWith("data:")) {
      // simple <img> for Data URLs (next/image may not accept data URIs reliably)
      return <Image src={src} width={80} height={56} alt={alt} className="max-h-48 rounded shadow object-cover" />;
    }
    // use next/image for normal URLs (add width & height)
    return <Image src={src} alt={alt} width={320} height={180} className="max-h-48 rounded shadow object-cover" />;
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Admin — Blog Manager</h1>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-blue-600 hover:underline">View site</Link>
            {token ? (
              <button onClick={logout} className="px-3 py-1 rounded bg-gray-200">Logout</button>
            ) : null}
          </div>
        </header>

        {!token && (
          <form onSubmit={login} className="bg-white p-4 rounded shadow mb-6">
            <h2 className="font-medium mb-3">Admin Login</h2>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 border rounded px-3 py-2"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
            </div>
            {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
          </form>
        )}

        <section className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-3">{editing ? "Edit blog" : "Create blog"}</h2>

          <form onSubmit={editing ? handleUpdate : handleCreate} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
              <input
                placeholder="Slug (unique)"
                value={form.slug}
                onChange={(e) => setField("slug", e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                placeholder="Image URL (optional)"
                value={form.imageUrl}
                onChange={(e) => { setField("imageUrl", e.target.value); setField("imageFileDataUrl",""); }}
                className="w-full border rounded px-3 py-2"
              />
              <div>
                <input title="Upload Image" type="file" accept="image/png,image/jpeg" onChange={handleFileChange} className="w-full" />
                <p className="text-xs text-gray-500 mt-1">Or upload JPG/PNG. Upload will be stored as Data URL.</p>
              </div>
            </div>

            {imageValue() ? (
              <div className="mb-2">
                <p className="text-sm text-gray-700 mb-1">Preview</p>
                <RenderPreviewImage src={imageValue()} alt="preview" />
              </div>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                title="Date"
                type="date"
                value={form.date}
                onChange={(e) => setField("date", e.target.value)}
                className="border rounded px-3 py-2"
              />
              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) => setField("category", e.target.value)}
                className="border rounded px-3 py-2"
              />
              <div />
            </div>

            <textarea
              rows={10}
              placeholder="Content (HTML allowed)"
              value={form.content}
              onChange={(e) => setField("content", e.target.value)}
              className="w-full border rounded px-3 py-2"
            />

            <div className="flex items-center gap-3">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={!token || loading}>
                {loading ? "Saving..." : editing ? "Update blog" : "Create blog"}
              </button>
              {editing && (
                <button type="button" onClick={() => { setEditing(null); setForm({ title:"", slug:"", imageUrl:"", imageFileDataUrl:"", date:new Date().toISOString().slice(0,10), category:"", content:"" }); }} className="px-3 py-2 border rounded">
                  Cancel edit
                </button>
              )}
              <button type="button" onClick={() => {
                setForm({ title:"", slug:"", imageUrl:"", imageFileDataUrl:"", date:new Date().toISOString().slice(0,10), category:"", content:"" });
                setMessage(null);
              }} className="px-3 py-2 border rounded">Clear</button>
            </div>
            {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
          </form>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Existing blogs</h3>
            <div>
              <button onClick={() => fetchBlogs(token)} className="px-3 py-1 bg-gray-100 rounded mr-2">Refresh</button>
              <Link href="/blog" className="px-3 py-1 text-blue-600">Open blog list</Link>
            </div>
          </div>

          {loading ? <p>Loading …</p> : null}

          <div className="space-y-3">
            {blogs.map((b) => (
              <div key={b._id} className="flex gap-3 items-center border rounded p-3">
                {/* thumbnail: use <img> for data: URIs, otherwise next/image with width/height */}
                {b.image && b.image.startsWith("data:") ? (
                  <Image src={b.image} alt={b.title} width={80} height={56} className="w-20 h-14 object-cover rounded" />
                ) : (
                  <Image src={b.image || "/images/hero.png"} alt={b.title} width={80} height={56} className="object-cover rounded" />
                )}

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{b.title}</div>
                      <div className="text-xs text-gray-500">{b.slug} • {b.date ? new Date(b.date).toLocaleDateString() : ""}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => startEdit(b)} className="px-2 py-1 text-sm bg-yellow-100 rounded">Edit</button>
                      <button onClick={() => handleDelete(b._id)} className="px-2 py-1 text-sm bg-red-100 rounded">Delete</button>
                      <Link href={`/blog/${b.slug}`} className="px-2 py-1 text-sm bg-blue-50 rounded">View</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {blogs.length === 0 && <p className="text-sm text-gray-500">No blogs found.</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
