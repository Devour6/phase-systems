"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.error("[phase-systems]", error);
    }
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 pt-24 md:pt-32 pb-24 md:pb-32 text-center">
      <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50 inline-flex items-center gap-2">
        <span
          className="inline-block w-1.5 h-1.5"
          style={{
            background: "#ff3366",
            boxShadow: "0 0 6px rgba(255,51,102,0.85)",
          }}
        />
        // ERR / 500
      </div>
      <h1
        className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight mt-6"
      >
        Something tripped.
      </h1>
      <p className="text-foreground/65 mt-6 max-w-md mx-auto leading-relaxed">
        We&apos;ve been notified. Try the page again, or head back to the rack
        index.
      </p>
      {error.digest && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40 normal-case">
          ref: {error.digest}
        </p>
      )}
      <div className="mt-9 flex justify-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => reset()}
          className="font-mono text-xs uppercase tracking-widest border border-[#7CFFA8] px-5 py-3.5 hover-elevate"
          style={{ color: "#7CFFA8" }}
        >
          ↺ Retry
        </button>
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-widest border border-border px-5 py-3.5 hover-elevate text-foreground/80 hover:text-foreground"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
