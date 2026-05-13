"use client";

// Deeper rack visualization — switch with 24 ports, labeled server rows,
// blade chassis, gap, PDU. Inline env panel with animated inlet temp and
// power draw bars. All values clearly DEMO.

import { useEffect, useState } from "react";
import { shouldReduce } from "@/lib/use-reduce";

interface Unit {
  type: "switch" | "server" | "blade" | "gap" | "pdu";
  label?: string;
  h: number;
}

const UNITS: Unit[] = [
  { type: "switch", label: "SW-01 · 24P", h: 22 },
  { type: "server", label: "DSM-01-A01", h: 14 },
  { type: "server", label: "DSM-01-A02", h: 14 },
  { type: "server", label: "DSM-01-A03", h: 14 },
  { type: "blade", label: "BLADE-A · 4n", h: 26 },
  { type: "server", label: "DSM-01-A04", h: 14 },
  { type: "server", label: "DSM-01-A05", h: 14 },
  { type: "gap", h: 6 },
  { type: "server", label: "DSM-01-A06", h: 14 },
  { type: "pdu", label: "PDU · 30A", h: 14 },
];

export function VizColocation() {
  const [temp, setTemp] = useState(68);
  const [power, setPower] = useState(52.4);

  useEffect(() => {
    if (shouldReduce()) return;
    const id = setInterval(() => {
      setTemp((t) => Math.max(66, Math.min(72, t + (Math.random() - 0.5) * 1.2)));
      setPower((p) =>
        Math.max(48, Math.min(58, +(p + (Math.random() - 0.5) * 1.4).toFixed(1)))
      );
    }, 1600);
    return () => clearInterval(id);
  }, []);

  let y = 6;
  return (
    <div className="colo-viz">
      <svg
        className="rack-svg"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* outer cabinet */}
        <rect
          x="4"
          y="2"
          width="192"
          height="196"
          fill="#1A1A18"
          stroke="rgba(245,242,236,0.10)"
          strokeWidth="1"
        />
        {/* top label rail */}
        <rect
          x="8"
          y="6"
          width="184"
          height="8"
          fill="#0F0F0E"
          stroke="rgba(245,242,236,0.06)"
          strokeWidth="0.4"
        />
        <text
          x="14"
          y="11.6"
          fontFamily="ui-monospace, Menlo, monospace"
          fontSize="4.4"
          fill="#6B6862"
          letterSpacing="0.12em"
        >
          PHASE · DSM-01 · CAB-A07
        </text>
        <circle
          cx="186"
          cy="10"
          r="1.4"
          className="rack-led"
          style={{ ["--bd" as string]: "1.3s" }}
        />
        {/* inner well */}
        <rect
          x="8"
          y="16"
          width="184"
          height="178"
          fill="#0C0C0B"
          stroke="rgba(245,242,236,0.05)"
        />

        {UNITS.map((u, i) => {
          const top = 18 + y;
          y += u.h;
          if (u.type === "gap") return null;
          return (
            <g key={i}>
              {/* unit body */}
              <rect
                x="12"
                y={top}
                width="176"
                height={u.h - 2}
                fill="#1F1F1C"
                stroke="rgba(245,242,236,0.12)"
                strokeWidth="0.5"
              />
              {/* unit label on left */}
              {u.label && (
                <text
                  x="16"
                  y={top + u.h / 2 + 1.4}
                  fontFamily="ui-monospace, Menlo, monospace"
                  fontSize="3.6"
                  fill="#A8A39B"
                  letterSpacing="0.08em"
                >
                  {u.label}
                </text>
              )}

              {/* switch: 24 SFP ports in 2 rows of 12 + link LEDs */}
              {u.type === "switch" && (
                <>
                  {Array.from({ length: 12 }).map((_, k) => (
                    <g key={k}>
                      <rect
                        x={60 + k * 10}
                        y={top + 4}
                        width="6"
                        height="3"
                        fill="#0A0A09"
                        stroke="rgba(245,242,236,0.15)"
                        strokeWidth="0.3"
                      />
                      <rect
                        x={60 + k * 10}
                        y={top + 11}
                        width="6"
                        height="3"
                        fill="#0A0A09"
                        stroke="rgba(245,242,236,0.15)"
                        strokeWidth="0.3"
                      />
                      <circle
                        className="rack-led"
                        style={{ ["--bd" as string]: `${0.7 + (k % 5) * 0.3}s` }}
                        cx={63 + k * 10}
                        cy={top + 17}
                        r="0.45"
                      />
                    </g>
                  ))}
                </>
              )}

              {/* server: drive bays + activity LED column */}
              {u.type === "server" && (
                <>
                  {Array.from({ length: 8 }).map((_, k) => (
                    <rect
                      key={k}
                      x={62 + k * 14}
                      y={top + 3}
                      width="10"
                      height={u.h - 6}
                      fill="#0F0F0E"
                      stroke="rgba(245,242,236,0.08)"
                      strokeWidth="0.25"
                    />
                  ))}
                  {Array.from({ length: 8 }).map((_, k) => (
                    <circle
                      key={k}
                      className="rack-led"
                      style={{
                        ["--bd" as string]: `${1 + (k % 5) * 0.3}s`,
                      }}
                      cx={67 + k * 14}
                      cy={top + u.h - 4.5}
                      r="0.5"
                    />
                  ))}
                  {/* status LED */}
                  <circle
                    className="rack-led"
                    style={{ ["--bd" as string]: "1.2s" }}
                    cx="183"
                    cy={top + u.h / 2}
                    r="0.8"
                  />
                </>
              )}

              {/* blade chassis: 4 wider blades + cluster LEDs */}
              {u.type === "blade" && (
                <>
                  {Array.from({ length: 4 }).map((_, k) => (
                    <rect
                      key={k}
                      x={62 + k * 28}
                      y={top + 3}
                      width="22"
                      height={u.h - 6}
                      fill="#0F0F0E"
                      stroke="rgba(245,242,236,0.10)"
                      strokeWidth="0.3"
                    />
                  ))}
                  {Array.from({ length: 4 }).map((_, k) => (
                    <g key={k}>
                      <circle
                        className="rack-led"
                        style={{ ["--bd" as string]: `${1.2 + k * 0.2}s` }}
                        cx={67 + k * 28}
                        cy={top + 8}
                        r="0.7"
                      />
                      <circle
                        className="rack-led"
                        style={{ ["--bd" as string]: `${0.8 + k * 0.18}s` }}
                        cx={67 + k * 28}
                        cy={top + u.h - 6}
                        r="0.7"
                      />
                    </g>
                  ))}
                </>
              )}

              {/* pdu: outlets + status LED */}
              {u.type === "pdu" && (
                <>
                  {Array.from({ length: 6 }).map((_, k) => (
                    <rect
                      key={k}
                      x={62 + k * 18}
                      y={top + 4}
                      width="12"
                      height={u.h - 8}
                      fill="#0F0F0E"
                      stroke="rgba(245,242,236,0.08)"
                      strokeWidth="0.3"
                    />
                  ))}
                  <circle
                    className="rack-led"
                    style={{ ["--bd" as string]: "1.4s" }}
                    cx="183"
                    cy={top + u.h / 2}
                    r="1"
                  />
                </>
              )}
            </g>
          );
        })}

        {/* airflow indicator on the right */}
        <g className="rack-airflow-group">
          <path
            className="rack-airflow"
            d="M 192 30 L 196 30 M 192 60 L 196 60 M 192 90 L 196 90 M 192 120 L 196 120 M 192 150 L 196 150"
            fill="none"
            stroke="rgba(124,255,168,0.10)"
            strokeWidth="0.5"
            strokeDasharray="2 3"
          />
        </g>
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
