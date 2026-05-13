"use client";

// Radar sweep with 3 blips + 4 design-target cert badges (staggered fade-in).
// Badges are clearly labeled as targets — Phase Systems is NOT yet certified.

import { useEffect, useRef } from "react";
import { shouldReduce } from "@/lib/use-reduce";

// Truthful: Phase Systems is NOT certified for any of these. Listing the
// frameworks we design the facility against, not credentials we hold.
const BADGES = ["NIST CSF", "CIS Controls", "PCI-aware", "HIPAA-aware"];

export function VizCybersecurity() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const badges = el.querySelectorAll<HTMLElement>(".cert-badge");
    if (shouldReduce()) {
      badges.forEach((b) => b.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            badges.forEach((b, i) => {
              setTimeout(() => b.classList.add("in"), i * 120);
            });
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="radar-wrap" ref={wrapRef}>
      <svg className="radar-svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(124,255,168,0)" />
            <stop offset="100%" stopColor="rgba(124,255,168,0.55)" />
          </linearGradient>
        </defs>
        {/* rings */}
        <circle className="radar-ring" cx="50" cy="50" r="48" />
        <circle className="radar-ring" cx="50" cy="50" r="36" />
        <circle className="radar-ring" cx="50" cy="50" r="24" />
        <circle className="radar-ring" cx="50" cy="50" r="12" />
        {/* crosshair */}
        <line className="radar-crosshair" x1="50" y1="2" x2="50" y2="98" />
        <line className="radar-crosshair" x1="2" y1="50" x2="98" y2="50" />
        {/* sweep wedge */}
        <g className="radar-sweep">
          <path
            d="M 50 50 L 50 2 A 48 48 0 0 1 95 35 Z"
            fill="url(#sweepGrad)"
            opacity="0.5"
          />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="2"
            stroke="#7CFFA8"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
        </g>
        {/* blips */}
        <circle className="radar-blip" cx="68" cy="32" r="1.8" />
        <circle className="radar-blip b2" cx="28" cy="60" r="1.6" />
        <circle className="radar-blip b3" cx="62" cy="74" r="1.8" />
        {/* center node */}
        <circle cx="50" cy="50" r="1.6" fill="#7CFFA8" />
      </svg>

      <div className="cert-meta">
        <div className="cert-meta-label">// Designed against</div>
        <div className="cert-grid">
          {BADGES.map((b) => (
            <div key={b} className="cert-badge">
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
