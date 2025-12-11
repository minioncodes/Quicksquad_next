// src/app/api/admin/logout/route.ts
import { NextResponse } from "next/server";

const COOKIE_NAME = "qs_admin";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // clear cookie
  res.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
