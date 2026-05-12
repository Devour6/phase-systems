"use client";

import { useEffect, useState } from "react";

// Circular bandwidth gauge — animated stroke-dashoffset
// for the arc fill, big mono number in center.

export function VizInternet() {
  const [pct, setPct] = useState(72);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setPct((p) => Math.max(58, Math.min(92, p + (Math.random() - 0.5) * 6)));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  const R = 70;
  const CIRC = 2 * Math.PI * R;
  const offset = CIRC - (CIRC * pct) / 100;
  const gbps = Math.round((pct / 100) * 100);

  return (
    <div className="bw-wrap">
      <svg className="bw-svg" viewBox="0 0 180 180">
        {/* tick marks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
          const x1 = 90 + Math.cos(a) * 84;
          const y1 = 90 + Math.sin(a) * 84;
          const x2 = 90 + Math.cos(a) * 88;
          const y2 = 90 + Math.sin(a) * 88;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(245,242,236,0.18)"
              strokeWidth="0.8"
            />
          );
        })}
        {/* dashed inner */}
        <circle className="bw-line" cx="90" cy="90" r="78" fill="none" />
        {/* track */}
        <circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          stroke="rgba(245,242,236,0.08)"
          strokeWidth="6"
        />
        {/* progress */}
        <circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          stroke="#7CFFA8"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          transform="rotate(-90 90 90)"
          style={{
            transition: "stroke-dashoffset 700ms cubic-bezier(0.16,1,0.3,1)",
            filter: "drop-shadow(0 0 6px rgba(124,255,168,0.45))",
          }}
        />
        {/* perimeter packet dots (4 around the dial, on heartbeat offsets) */}
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
          const x = 90 + Math.cos(a) * 80;
          const y = 90 + Math.sin(a) * 80;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.4"
              fill="#7CFFA8"
              opacity="0.85"
              style={{
                animation: `bwPacket 2.4s ease-in-out ${i * 0.6}s infinite`,
                transformOrigin: "center",
              }}
            />
          );
        })}
        <text x="90" y="86" className="bw-bignum" textAnchor="middle">
          {gbps}
        </text>
        <text x="90" y="106" className="bw-bigsub" textAnchor="middle">
          GBPS · LIVE
        </text>
      </svg>
      <div className="hex-caption">10G uplinks · IPv4 + IPv6 · BGP</div>
    </div>
  );
}
