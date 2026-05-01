"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SERVICES } from "@/lib/services";

type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistForm() {
  const searchParams = useSearchParams();
  const preselect = searchParams.get("service");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [interests, setInterests] = useState<string[]>(
    preselect ? [preselect] : []
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function toggle(slug: string) {
    setInterests((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, name, company, interests }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div
          className="mx-auto h-12 w-12 border flex items-center justify-center"
          style={{ borderColor: "#7CFFA8", color: "#7CFFA8" }}
        >
          ✓
        </div>
        <h2 className="font-display text-2xl mt-5">You&apos;re on the list.</h2>
        <p className="text-foreground/70 mt-3">
          We&apos;ll reach out from an Iowa-area-code number when your services
          are live.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="font-mono text-[11px] uppercase tracking-widest text-foreground/60 block mb-2">
          Email *
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-background/60 border border-border px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-[#7CFFA8]"
          placeholder="you@company.com"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-[11px] uppercase tracking-widest text-foreground/60 block mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-background/60 border border-border px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-[#7CFFA8]"
          />
        </div>
        <div>
          <label className="font-mono text-[11px] uppercase tracking-widest text-foreground/60 block mb-2">
            Company
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full bg-background/60 border border-border px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-[#7CFFA8]"
          />
        </div>
      </div>

      <div>
        <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/60 mb-3">
          Interested in
        </div>
        <div className="grid grid-cols-2 gap-2">
          {SERVICES.map((s) => {
            const active = interests.includes(s.slug);
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => toggle(s.slug)}
                className="text-left border px-3 py-2.5 transition-colors"
                style={{
                  borderColor: active ? "#7CFFA8" : "rgba(243,238,217,0.1)",
                  background: active
                    ? "rgba(124,255,168,0.06)"
                    : "transparent",
                  color: active ? "#7CFFA8" : "rgba(243,238,217,0.85)",
                }}
              >
                <span className="font-mono text-xs uppercase tracking-wider">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full font-mono text-xs uppercase tracking-widest border border-[#7CFFA8] px-5 py-3 hover-elevate disabled:opacity-60"
        style={{ color: "#7CFFA8" }}
      >
        {status === "submitting" ? "Submitting…" : "Join Waitlist →"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-400 font-mono">{errorMsg}</p>
      )}
    </form>
  );
}
