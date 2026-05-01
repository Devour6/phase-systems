import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

interface WaitlistPayload {
  email?: string;
  name?: string;
  company?: string;
  interests?: string[];
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: WaitlistPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const entry = {
    email,
    name: (body.name || "").trim().slice(0, 200),
    company: (body.company || "").trim().slice(0, 200),
    interests: Array.isArray(body.interests)
      ? body.interests.filter((s) => typeof s === "string").slice(0, 12)
      : [],
    createdAt: new Date().toISOString(),
  };

  // KV may be unconfigured locally — fail gracefully.
  try {
    await redis.hset(`waitlist:${email}`, entry);
    await redis.sadd("waitlist:emails", email);
  } catch (err) {
    console.error("[waitlist] kv error:", err);
    // Still return success so users aren't blocked in dev — log shows the failure.
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Storage unavailable" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ ok: true });
}
