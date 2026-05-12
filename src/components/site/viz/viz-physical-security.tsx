"use client";

// 3x3 camera grid — each cell is a tiny "camera feed" rectangle
// with scanline + status LED + zone label.

import { useEffect, useState } from "react";

const CAMS = [
  { id: "CAM-01", zone: "ENTRY-A" },
  { id: "CAM-02", zone: "MMR" },
  { id: "CAM-03", zone: "FLOOR-1" },
  { id: "CAM-04", zone: "FLOOR-2" },
  { id: "CAM-05", zone: "DOCK" },
  { id: "CAM-06", zone: "MDF" },
  { id: "CAM-07", zone: "PERIM-N" },
  { id: "CAM-08", zone: "PERIM-S" },
  { id: "CAM-09", zone: "ROOF" },
];

export function VizPhysicalSecurity() {
  const [scanIdx, setScanIdx] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setScanIdx((i) => (i + 1) % CAMS.length);
    }, 1100);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="cam-wrap">
      <div className="cam-grid">
        {CAMS.map((c, i) => (
          <div key={c.id} className={`cam-cell ${scanIdx === i ? "is-scanning" : ""}`}>
            <div className="cam-feed">
              {/* fake static / scanlines */}
              <span className="cam-scan" />
              {/* corner marks */}
              <span className="cam-corner cam-corner-tl" />
              <span className="cam-corner cam-corner-tr" />
              <span className="cam-corner cam-corner-bl" />
              <span className="cam-corner cam-corner-br" />
            </div>
            <div className="cam-meta">
              <span className="cam-id">{c.id}</span>
              <span className="cam-dot" />
              <span className="cam-zone">{c.zone}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="hex-caption">9 cameras · 24/7 monitored</div>
    </div>
  );
}
