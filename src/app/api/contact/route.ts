import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

interface ContactPayload {
  email?: string;
  name?: string;
  company?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const message = (body.message || "").trim();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }
  if (!message || message.length < 3) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const entry = {
    id,
    email,
    name: (body.name || "").trim().slice(0, 200),
    company: (body.company || "").trim().slice(0, 200),
    message: message.slice(0, 5000),
    createdAt: new Date().toISOString(),
  };

  try {
    await redis.hset(`contact:${id}`, entry);
    await redis.lpush("contact:queue", id);
  } catch (err) {
    console.error("[contact] kv error:", err);
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Storage unavailable" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ ok: true });
}
