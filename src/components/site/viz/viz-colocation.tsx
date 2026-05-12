"use client";

// Simplified rack silhouette — 16U with blinking LEDs + env panel.
// Real rack drawing would be ~400 lines of SVG; this is a cleaner
// abstraction that still reads as "rack."

import { useEffect, useState } from "react";

const UNITS = [
  { type: "switch", h: 18 },
  { type: "server", h: 16 },
  { type: "server", h: 16 },
  { type: "blade", h: 32 },
  { type: "server", h: 16 },
  { type: "server", h: 16 },
  { type: "gap", h: 8 },
  { type: "server", h: 16 },
  { type: "pdu", h: 14 },
];

export function VizColocation() {
  const [temp, setTemp] = useState(68);
  const [power, setPower] = useState(52.4);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setTemp((t) => Math.max(66, Math.min(72, t + (Math.random() - 0.5) * 1.2)));
      setPower((p) =>
        Math.max(48, Math.min(58, +(p + (Math.random() - 0.5) * 1.4).toFixed(1)))
      );
    }, 1600);
    return () => clearInterval(id);
  }, []);

  let y = 8;
  return (
    <div className="colo-viz">
      <svg className="rack-svg" viewBox="0 0 180 220" preserveAspectRatio="xMidYMid meet">
        <rect
          x="6"
          y="4"
          width="168"
          height="212"
          fill="#1A1A18"
          stroke="rgba(245,242,236,0.10)"
          strokeWidth="1"
        />
        <rect
          x="10"
          y="8"
          width="160"
          height="200"
          fill="#0C0C0B"
          stroke="rgba(245,242,236,0.05)"
        />
        {UNITS.map((u, i) => {
          const top = y + 4;
          y += u.h;
          if (u.type === "gap") return null;
          return (
            <g key={i}>
              <rect
                x="14"
                y={top}
                width="152"
                height={u.h - 2}
                fill="#1F1F1C"
                stroke="rgba(245,242,236,0.12)"
                strokeWidth="0.6"
              />
              {u.type === "switch" && (
                <>
                  {Array.from({ length: 12 }).map((_, k) => (
                    <rect
                      key={k}
                      x={22 + k * 9}
                      y={top + 5}
                      width="6"
                      height="3"
                      fill="#0A0A09"
                    />
                  ))}
                  {Array.from({ length: 12 }).map((_, k) => (
                    <circle
                      key={k}
                      className="rack-led"
                      style={{ ["--bd" as string]: `${0.8 + (k % 4) * 0.4}s` }}
                      cx={25 + k * 9}
                      cy={top + 12}
                      r="0.7"
                    />
                  ))}
                </>
              )}
              {u.type === "server" && (
                <>
                  {Array.from({ length: 8 }).map((_, k) => (
                    <rect
                      key={k}
                      x={20 + k * 16}
                      y={top + 3}
                      width="12"
                      height={u.h - 6}
                      fill="#0F0F0E"
                      stroke="rgba(245,242,236,0.08)"
                      strokeWidth="0.3"
                    />
                  ))}
                  {Array.from({ length: 8 }).map((_, k) => (
                    <circle
                      key={k}
                      className="rack-led"
                      style={{ ["--bd" as string]: `${1 + (k % 5) * 0.3}s` }}
                      cx={26 + k * 16}
                      cy={top + u.h - 5}
                      r="0.6"
                    />
                  ))}
                </>
              )}
              {u.type === "blade" && (
                <>
                  {Array.from({ length: 8 }).map((_, k) => (
                    <rect
                      key={k}
                      x={20 + k * 18}
                      y={top + 3}
                      width="14"
                      height={u.h - 6}
                      fill="#0F0F0E"
                      stroke="rgba(245,242,236,0.10)"
                      strokeWidth="0.3"
                    />
                  ))}
                  {Array.from({ length: 8 }).map((_, k) => (
                    <circle
                      key={k}
                      className="rack-led"
                      style={{ ["--bd" as string]: `${1.2 + k * 0.2}s` }}
                      cx={27 + k * 18}
                      cy={top + 8}
                      r="0.8"
                    />
                  ))}
                </>
              )}
              {u.type === "pdu" && (
                <>
                  <text
                    x="20"
                    y={top + u.h / 2 + 1}
                    fontFamily="Outfit, sans-serif"
                    fontSize="6"
                    fill="#A8A39B"
                    letterSpacing="0.1em"
                  >
                    PDU · 30A
                  </text>
                  <circle
                    className="rack-led"
                    style={{ ["--bd" as string]: "1.2s" }}
                    cx="160"
                    cy={top + u.h / 2}
                    r="1"
                  />
                </>
              )}
            </g>
          );
        })}
      </svg>

      <div className="env-panel">
        <div className="env-head">
          <span>ENV · DSM-01</span>
          <span className="env-live">LIVE</span>
        </div>
        <div className="env-row">
          <span className="env-lbl">Inlet temp</span>
          <span className="env-val tabular-nums">
            {temp.toFixed(1)}
            <span className="u">°F</span>
          </span>
          <div className="env-bar">
            <i style={{ width: `${((temp - 60) / 20) * 100}%` }} />
          </div>
        </div>
        <div className="env-row">
          <span className="env-lbl">Power draw</span>
          <span className="env-val tabular-nums">
            {power.toFixed(1)}
            <span className="u">kW</span>
          </span>
          <div className="env-bar">
            <i style={{ width: `${(power / 80) * 100}%` }} />
          </div>
        </div>
        <div className="env-foot">
          <span>
            UPS <b>2N</b>
          </span>
          <span>
            COOL <b>N+1</b>
          </span>
        </div>
      </div>
    </div>
  );
}
