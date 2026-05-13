"use client";

import { useEffect, useState } from "react";

/**
 * Floating scroll-to-top button. Appears after ~800px scroll.
 * Editorial pill with mint LED + ↑ arrow. Hidden on prefers-reduced-motion.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="scroll-top-btn"
      data-visible={visible ? "1" : "0"}
    >
      <span className="led led-pulse" aria-hidden />
      <span className="scroll-top-arrow">↑</span>
      <span className="scroll-top-label">TOP</span>
    </button>
  );
}
