"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Stats strip — 4 big-number cards with count-up on scroll-in.
 * Numbers are illustrative and labeled [DEMO] so they're not misquotable.
 */

interface Stat {
  num: number;
  suffix?: string;
  prefix?: string;
  label: string;
  format?: (n: number) => string;
}

interface StatExt extends Stat {
  meta?: string;
}

const STATS: StatExt[] = [
  { num: 6, label: "Verticals on roadmap", meta: "PHASE.SYS / 2026" },
  { num: 1, suffix: "GW", label: "Iowa grid headroom", meta: "MISO REGION" },
  { num: 100, suffix: "G", label: "Backbone fabric", meta: "TARGET" },
  { num: 24, suffix: "/7", label: "On-site coverage", meta: "DSM-01" },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function StatCard({ stat, index }: { stat: StatExt; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setValue(stat.num);
      return;
    }
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            const start = performance.now();
            const dur = 1200 + index * 100;
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / dur);
              setValue(stat.num * easeOutCubic(t));
              if (t < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [stat.num, index]);

  const display = stat.format
    ? stat.format(value)
    : Math.round(value).toLocaleString();

  return (
    <div ref={ref} className="stat-card">
      <div className="stat-num">
        {stat.prefix}
        <span>{display}</span>
        {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
      </div>
      <div className="stat-label">{stat.label}</div>
      <div className="stat-bar">
        <i style={{ width: `${(value / stat.num) * 100}%` }} />
      </div>
      {stat.meta && (
        <div className="stat-meta">
          <span className="led led-pulse" style={{ width: 4, height: 4 }} />
          {stat.meta}
        </div>
      )}
    </div>
  );
}

export function StatsStrip() {
  return (
    <div className="stats-strip">
      {STATS.map((s, i) => (
        <StatCard key={s.label} stat={s} index={i} />
      ))}
    </div>
  );
}
