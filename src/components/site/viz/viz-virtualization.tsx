"use client";

import { useEffect, useRef, useState } from "react";
import { shouldReduce } from "@/lib/use-reduce";

// Hexagonal cluster — 12 hexes arranged in honeycomb.
// Some are active (mint outline + LED) representing live VMs,
// some are spare (muted). Random ripple animation on hover.
//
// Layout: 5/4/5 honeycomb staggered

const HEXES = [
  // row 1 (y=22): 5 hexes
  { x: 38, y: 22, active: true, label: "VM-01" },
  { x: 84, y: 22, active: true, label: "VM-02" },
  { x: 130, y: 22, active: false, label: "" },
  { x: 176, y: 22, active: true, label: "VM-03" },
  { x: 222, y: 22, active: false, label: "" },
  // row 2 (y=62): 4 hexes (offset)
  { x: 61, y: 62, active: false, label: "" },
  { x: 107, y: 62, active: true, label: "VM-04" },
  { x: 153, y: 62, active: false, label: "" },
  { x: 199, y: 62, active: true, label: "VM-05" },
  // row 3 (y=102): 5 hexes
  { x: 38, y: 102, active: false, label: "" },
  { x: 84, y: 102, active: false, label: "" },
  { x: 130, y: 102, active: true, label: "VM-06" },
  { x: 176, y: 102, active: false, label: "" },
  { x: 222, y: 102, active: false, label: "" },
];

function hexPath(cx: number, cy: number, r: number) {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return points.join(" ");
}

export function VizVirtualization() {
  const [rippleIdx, setRippleIdx] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduce()) return;
    const id = setInterval(() => {
      const active = HEXES.map((h, i) => (h.active ? i : -1)).filter((i) => i >= 0);
      const pick = active[Math.floor(Math.random() * active.length)];
      setRippleIdx(pick);
      setTimeout(() => setRippleIdx(null), 1400);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const active = HEXES.filter((h) => h.active).length;
  const spare = HEXES.length - active;

  return (
    <div className="hex-wrap" ref={ref}>
      <div className="hex-pill">
        <span className="hex-pill-dot" />
        <span>VM CLUSTER · {active} ACTIVE</span>
        <span className="hex-pill-spare">· {spare} SPARE</span>
      </div>
      <svg className="hex-svg" viewBox="0 0 260 130" preserveAspectRatio="xMidYMid meet">
        {HEXES.map((h, i) => (
          <g
            key={i}
            className={`hex-tile ${h.active ? "hex-active" : "hex-spare"} ${rippleIdx === i ? "ripple-active" : ""}`}
          >
            <polygon points={hexPath(h.x, h.y, 18)} />
            {h.active && <circle className="hex-led" cx={h.x} cy={h.y - 1} r="1.4" />}
            {h.label && (
              <text className="hex-vm-label" x={h.x} y={h.y + 4}>
                {h.label}
              </text>
            )}
          </g>
        ))}
      </svg>
      <div className="hex-caption">KVM · NVMe · 10G fabric</div>
    </div>
  );
}
