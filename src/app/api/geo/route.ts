import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // @ts-expect-error: request.geo is a runtime-only property provided by Next.js edge runtime
  return NextResponse.json({ geo: request.geo });
}
