"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Section number ticker — types the eyebrow label char-by-char on scroll-in.
 * Includes a blinking caret while typing, hidden when done.
 */

export function SecNum({
  children,
  label,
  className = "",
}: {
  children?: string;
  label?: string;
  className?: string;
}) {
  const source = (children ?? label ?? "").toString();
  const ref = useRef<HTMLDivElement | null>(null);
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setText(source);
      setDone(true);
      return;
    }
    let started = false;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            let i = 0;
            const tick = () => {
              i++;
              setText(source.slice(0, i));
              if (i >= source.length) {
                setDone(true);
                return;
              }
              raf = window.setTimeout(tick, 30 + Math.random() * 20) as unknown as number;
            };
            tick();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      clearTimeout(raf);
      io.disconnect();
    };
  }, [source]);

  return (
    <div
      ref={ref}
      className={`sec-num font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50 ${className}`}
    >
      {text}
      {!done && <span className="sec-caret" />}
    </div>
  );
}
