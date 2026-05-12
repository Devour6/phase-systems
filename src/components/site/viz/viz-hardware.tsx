"use client";

// GPU board abstraction — 4 HBM stacks around a central die,
// PCIe edge at bottom, pulsing telemetry LEDs.

export function VizHardware() {
  return (
    <div className="hw-wrap">
      <svg viewBox="0 0 280 180" className="hw-svg" preserveAspectRatio="xMidYMid meet">
        {/* board */}
        <rect
          x="20"
          y="20"
          width="240"
          height="120"
          fill="#161614"
          stroke="rgba(245,242,236,0.16)"
          strokeWidth="1"
        />
        {/* trace pattern */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="20"
            y1={28 + i * 14}
            x2="260"
            y2={28 + i * 14}
            stroke="rgba(124,255,168,0.05)"
            strokeWidth="0.5"
            strokeDasharray="2 4"
          />
        ))}
        {/* HBM-to-die interconnect traces (subtle, mint, pulse) */}
        <g className="hw-traces">
          <line x1="100" y1="65" x2="110" y2="68" stroke="rgba(124,255,168,0.5)" strokeWidth="0.4" />
          <line x1="100" y1="115" x2="110" y2="92" stroke="rgba(124,255,168,0.5)" strokeWidth="0.4" />
          <line x1="200" y1="65" x2="170" y2="68" stroke="rgba(124,255,168,0.5)" strokeWidth="0.4" />
          <line x1="200" y1="115" x2="170" y2="92" stroke="rgba(124,255,168,0.5)" strokeWidth="0.4" />
        </g>
        {/* central die */}
        <rect
          x="110"
          y="60"
          width="60"
          height="40"
          fill="#0F0F0E"
          stroke="rgba(124,255,168,0.45)"
          strokeWidth="1"
          className="hw-die"
          style={{ animation: "hwDiePulse 2.4s ease-in-out infinite" }}
        />
        <text
          x="140"
          y="84"
          textAnchor="middle"
          fontFamily="Outfit, sans-serif"
          fontSize="7"
          letterSpacing="0.2em"
          fill="#7CFFA8"
        >
          GPU DIE
        </text>
        {/* HBM stacks */}
        {[
          [60, 50],
          [60, 100],
          [200, 50],
          [200, 100],
        ].map(([x, y], i) => (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width="40"
              height="30"
              fill="#1F1F1C"
              stroke="rgba(245,242,236,0.18)"
              strokeWidth="0.6"
            />
            {[0, 1, 2, 3].map((k) => (
              <rect
                key={k}
                x={x + 4}
                y={y + 4 + k * 6}
                width="32"
                height="4"
                fill="#0A0A09"
                stroke="rgba(124,255,168,0.18)"
                strokeWidth="0.3"
              />
            ))}
            <circle
              className="rack-led"
              style={{ ["--bd" as string]: `${1 + i * 0.3}s` }}
              cx={x + 36}
              cy={y + 4}
              r="0.9"
            />
            <text
              x={x + 20}
              y={y - 3}
              textAnchor="middle"
              fontFamily="Outfit, sans-serif"
              fontSize="5"
              letterSpacing="0.18em"
              fill="#6B6862"
            >
              HBM-{i + 1}
            </text>
          </g>
        ))}
        {/* power phases */}
        {Array.from({ length: 12 }).map((_, k) => (
          <g key={k}>
            <rect
              x={32 + k * 14}
              y={120}
              width="10"
              height="12"
              fill="#1A1A18"
              stroke="rgba(245,242,236,0.15)"
              strokeWidth="0.4"
            />
            <circle
              className="rack-led"
              style={{ ["--bd" as string]: `${0.6 + k * 0.08}s` }}
              cx={37 + k * 14}
              cy={125}
              r="0.5"
            />
          </g>
        ))}
        {/* PCIe edge connector */}
        <rect
          x="40"
          y="148"
          width="200"
          height="14"
          fill="#FCE184"
          opacity="0.85"
        />
        {Array.from({ length: 80 }).map((_, k) => (
          <line
            key={k}
            x1={42 + k * 2.5}
            y1="150"
            x2={42 + k * 2.5}
            y2="160"
            stroke="#0F0F0E"
            strokeWidth="0.4"
          />
        ))}
      </svg>
      <div className="hex-caption">Burn-in · QA · Custom builds</div>
    </div>
  );
}
