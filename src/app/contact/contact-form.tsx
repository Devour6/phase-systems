"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, name, company, message }),
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
        <h2 className="font-display text-2xl mt-5">Got it.</h2>
        <p className="text-foreground/70 mt-3">
          We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-[11px] uppercase tracking-widest text-foreground/60 block mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-background/60 border border-border px-3 py-3 font-mono text-base md:text-sm focus:outline-none focus:border-[#7CFFA8]"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className="font-mono text-[11px] uppercase tracking-widest text-foreground/60 block mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-background/60 border border-border px-3 py-3 font-mono text-base md:text-sm focus:outline-none focus:border-[#7CFFA8]"
          />
        </div>
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

      <div>
        <label className="font-mono text-[11px] uppercase tracking-widest text-foreground/60 block mb-2">
          What are you building? *
        </label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full bg-background/60 border border-border px-3 py-3 font-mono text-base md:text-sm focus:outline-none focus:border-[#7CFFA8] resize-none"
          placeholder="Workload, scale, timeline, anything else useful…"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full font-mono text-xs uppercase tracking-widest border border-[#7CFFA8] px-5 py-3 hover-elevate disabled:opacity-60"
        style={{ color: "#7CFFA8" }}
      >
        {status === "submitting" ? "Sending…" : "Send Message →"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-400 font-mono">{errorMsg}</p>
      )}
    </form>
  );
}
