"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error || "Wrong password");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="font-mono text-[11px] uppercase tracking-widest text-foreground/60">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="mt-2 w-full bg-card/40 border border-border px-3 py-3 text-base md:text-sm font-mono outline-none focus:border-[#7CFFA8]"
          required
        />
      </div>
      {error && (
        <div className="font-mono text-xs text-red-400">{error}</div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary hover-elevate w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Checking…" : "Sign in →"}
      </button>
    </form>
  );
}
