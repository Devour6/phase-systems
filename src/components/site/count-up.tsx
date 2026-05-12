"use client";

import { useEffect, useRef } from "react";

// Count from 0 to `to` when scrolled into view. Uses cubic ease-out
// matching the prototype. Respects prefers-reduced-motion.

interface CountUpProps {
  to: number;
  duration?: number; // ms
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({
  to,
  duration = 1400,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      el.textContent = `${prefix}${to.toFixed(decimals)}${suffix}`;
      return;
    }

    const fmt = (v: number) =>
      `${prefix}${v.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;

    el.textContent = fmt(0);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              // cubic ease-out
              const eased = 1 - Math.pow(1 - t, 3);
              el.textContent = fmt(to * eased);
              if (t < 1) requestAnimationFrame(tick);
              else el.textContent = fmt(to);
            };
            requestAnimationFrame(tick);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration, decimals, prefix, suffix]);

  return <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }} />;
}
