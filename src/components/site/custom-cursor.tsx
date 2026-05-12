"use client";

import { useEffect } from "react";

// Custom cursor: mint dot snaps to pointer, ring lerps behind with 0.18
// easing factor, ring expands when hovering anchors/buttons/services.
// Disabled on touch / reduced-motion.

export function CustomCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduce) return;

    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let heroEl: HTMLElement | null = document.getElementById("hero-grid");
    let heroRect: DOMRect | null = heroEl ? heroEl.getBoundingClientRect() : null;

    const refreshHeroRect = () => {
      heroEl = document.getElementById("hero-grid");
      heroRect = heroEl ? heroEl.getBoundingClientRect() : null;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
      const half = ring.offsetWidth / 2;
      ring.style.transform = `translate3d(${rx - half}px, ${ry - half}px, 0)`;
      // hero spotlight follows cursor while in view
      if (heroEl && heroRect) {
        const px = ((mx - heroRect.left) / heroRect.width) * 100;
        const py = ((my - heroRect.top) / heroRect.height) * 100;
        heroEl.style.setProperty("--mx", px + "%");
        heroEl.style.setProperty("--my", py + "%");
      }
      raf = requestAnimationFrame(loop);
    };

    const onEnter = () => document.body.classList.add("hover-link");
    const onLeave = () => document.body.classList.remove("hover-link");

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", refreshHeroRect, { passive: true });
    window.addEventListener("resize", refreshHeroRect, { passive: true });
    raf = requestAnimationFrame(loop);

    // Delegate hover state via mouseover/mouseout (handles dynamically added nodes)
    const HOVER_SEL = "a, button, [role='button'], .service, .hover-link-target";
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t && t.closest && t.closest(HOVER_SEL)) onEnter();
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const r = (e.relatedTarget as Element | null) ?? null;
      if (t && t.closest && t.closest(HOVER_SEL)) {
        if (!r || !r.closest || !r.closest(HOVER_SEL)) onLeave();
      }
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    // Mark body so CSS can hide native cursor
    document.body.classList.add("custom-cursor-on");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", refreshHeroRect);
      window.removeEventListener("resize", refreshHeroRect);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.body.classList.remove("custom-cursor-on", "hover-link");
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" aria-hidden />
      <div id="cursor-ring" aria-hidden />
    </>
  );
}
