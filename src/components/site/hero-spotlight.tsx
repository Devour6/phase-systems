"use client";

import { useEffect } from "react";

/**
 * Quiet spotlight hook — listens for mousemove and sets --mx/--my CSS vars
 * on #hero-grid so the masked radial gradient follows the cursor.
 * No DOM rendered, no custom cursor — just the ambient grid spotlight.
 */
export function HeroSpotlight() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let heroEl: HTMLElement | null = document.getElementById("hero-grid");
    let heroRect: DOMRect | null = heroEl ? heroEl.getBoundingClientRect() : null;
    let raf = 0;
    let mx = 0;
    let my = 0;
    let pending = false;

    const refresh = () => {
      heroEl = document.getElementById("hero-grid");
      heroRect = heroEl ? heroEl.getBoundingClientRect() : null;
    };

    const apply = () => {
      pending = false;
      if (!heroEl || !heroRect) return;
      const px = ((mx - heroRect.left) / heroRect.width) * 100;
      const py = ((my - heroRect.top) / heroRect.height) * 100;
      heroEl.style.setProperty("--mx", px + "%");
      heroEl.style.setProperty("--my", py + "%");
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!pending) {
        pending = true;
        raf = requestAnimationFrame(apply);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", refresh, { passive: true });
    window.addEventListener("resize", refresh, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", refresh);
      window.removeEventListener("resize", refresh);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
