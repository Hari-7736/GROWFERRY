import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { setContent } from "@/lib/content";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/session";

export async function PUT(request) {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  await setContent(body);
  return NextResponse.json({ ok: true });
}
