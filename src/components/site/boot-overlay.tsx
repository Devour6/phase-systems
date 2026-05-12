"use client";

import { useEffect, useState } from "react";

// Phase Systems boot screen — full-viewport monospace startup animation.
// Mounts once on page load, fades after ~1.7s, sets sessionStorage flag so
// it doesn't replay on client-side route changes within the same session.

const STORAGE_KEY = "phase_boot_done";

export function BootOverlay() {
  const [mounted, setMounted] = useState(false);
  const [gone, setGone] = useState(false);
  const [unmount, setUnmount] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip on subsequent navigations in same session
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      setUnmount(true);
      return;
    }
    setMounted(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 400 : 1700;
    const fadeT = setTimeout(() => setGone(true), dur);
    const removeT = setTimeout(() => {
      setUnmount(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
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
      style={{ visibility: mounted ? "visible" : "hidden" }}
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
