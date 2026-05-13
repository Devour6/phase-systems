"use client";

import { useEffect, useState } from "react";

// Phase Systems boot screen — full-viewport monospace startup animation.
// Fires on every fresh page load (no session cache — it's the front-door
// signature). Fades after ~2.2s.

export function BootOverlay() {
  // Start visible on SSR so first paint shows the overlay immediately.
  // No sessionStorage gate — fires on every fresh page load.
  const [gone, setGone] = useState(false);
  const [unmount, setUnmount] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 400 : 2200;
    const fadeT = setTimeout(() => setGone(true), dur);
    const removeT = setTimeout(() => {
      setUnmount(true);
    }, dur + 700);
    return () => {
      clearTimeout(fadeT);
      clearTimeout(removeT);
    };
  }, []);

  if (unmount) return null;

  return (
    <div
      id="boot"
      aria-hidden
      className={gone ? "gone" : ""}
    >
      <div className="boot-inner">
        <div className="boot-line" style={{ animationDelay: "0.0s" }}>
          phase.systems &middot; initializing...
        </div>
        <div className="boot-line ok" style={{ animationDelay: "0.2s" }}>
          mount /dev/dsm-01
        </div>
        <div className="boot-line ok" style={{ animationDelay: "0.4s" }}>
          link uplink-a / uplink-b
        </div>
        <div className="boot-line ok" style={{ animationDelay: "0.6s" }}>
          load runtime
        </div>
        <div
          className="boot-line ready"
          style={{ animationDelay: "1.0s" }}
        >
          ready.
        </div>
        <div className="boot-bar">
          <div className="boot-bar-fill" />
        </div>
      </div>
    </div>
  );
}
