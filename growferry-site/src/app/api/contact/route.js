import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sendEmailNotification({ name, email, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return; // Email notifications are optional — see .env.example

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Growferry website <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `New message from ${name} via growferry.vercel.app`,
        text: message,
      }),
    });
  } catch (err) {
    // Don't fail the whole request just because the email couldn't be sent —
    // the message is already saved in the database either way.
    console.error("Contact email notification failed:", err.message);
  }
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const name = (body?.name || "").trim();
  const email = (body?.email || "").trim();
  const message = (body?.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill in every field." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const saved = await prisma.contactMessage.create({ data: { name, email, message } });
  await sendEmailNotification({ name, email, message });

  return NextResponse.json({ ok: true, id: saved.id });
}
