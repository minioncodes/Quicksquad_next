// src/app/api/admin/login/route.ts
import { NextResponse } from "next/server";

const COOKIE_NAME = "qs_admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const password = body?.password;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }
    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // set httpOnly cookie
    const res = NextResponse.json({ ok: true });
    // cookie options: httpOnly, secure in production, sameSite lax, expire in 7 days
    const secure = process.env.NODE_ENV === "production";
    res.cookies.set({
      name: COOKIE_NAME,
      value: "1",
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  } catch (err) {
    console.error("POST /api/admin/login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
