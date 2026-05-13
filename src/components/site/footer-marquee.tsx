"use client";

import { useEffect, useState } from "react";

/**
 * Scrolling status marquee — adds the ambient "data is moving" feel from the
 * prototype footer. Items are clearly DEMO-tagged so no specific claim ships.
 */

const ITEMS = [
  "FACILITY · DSM-01",
  "STATUS · BUILDING",
  "WAITLIST · OPEN",
  "POWER · IOWA GRID",
  "FIBER · MIDWEST BACKBONE",
  "COOLING · FREE-AIR ECONOMIZATION",
  "TEAM · ON-SITE",
  "VERTICALS · 06",
  "TIER · COMING ONLINE",
  "REGION · CENTRAL IOWA",
  "LAT/LON · 41.69N / 93.60W",
];

export function FooterMarquee() {
  // Duplicate items so the loop is seamless
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setNow(
        `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="footer-marquee" aria-hidden>
      <div className="footer-marquee-tag">
        <span className="led led-pulse" />
        <span>LIVE · {now || "--:--:-- UTC"} · [demo feed]</span>
      </div>
      <div className="footer-marquee-track-wrap">
        <div className="footer-marquee-track">
          {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} className="footer-marquee-item">
              <span className="footer-marquee-dot">◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
