"use client";

import { useEffect, useRef } from "react";

// Live-typing ops terminal. Cycles through sessions every ~3.8s.
// All output is clearly tagged [demo] — we're not claiming these stats are
// from real production telemetry.

interface Line {
  d: number;
  t: string;
  cls: string;
}

const SESSIONS: Line[][] = [
  [
    { d: 0, t: '<span class="term-prompt">&gt;</span> ping dsm01.phase-systems.net', cls: "term-line" },
    { d: 60, t: '64 bytes from 10.42.0.1: icmp_seq=1 time=<span class="term-ok">1.94 ms</span>', cls: "term-out" },
    { d: 60, t: '64 bytes from 10.42.0.1: icmp_seq=2 time=<span class="term-ok">2.11 ms</span>', cls: "term-out" },
    { d: 60, t: '64 bytes from 10.42.0.1: icmp_seq=3 time=<span class="term-ok">1.88 ms</span>', cls: "term-out" },
    { d: 80, t: '<span class="term-prompt">&gt;</span> systemctl status phase-ops', cls: "term-line" },
    { d: 60, t: 'active (running) · build v0.4.2 · <span class="term-dim">[demo telemetry]</span>', cls: "term-out" },
  ],
  [
    { d: 0, t: '<span class="term-prompt">&gt;</span> ip route show table backbone', cls: "term-line" },
    { d: 70, t: 'default via 10.0.0.1 dev uplink-a <span class="term-ok">[active]</span>', cls: "term-out" },
    { d: 70, t: 'default via 10.0.0.2 dev uplink-b <span class="term-dim">[standby]</span>', cls: "term-out" },
    { d: 80, t: '<span class="term-prompt">&gt;</span> bgp peer-status', cls: "term-line" },
    { d: 60, t: '<span class="term-dim">[demo data — peers tbd at launch]</span>', cls: "term-out" },
  ],
  [
    { d: 0, t: '<span class="term-prompt">&gt;</span> sysctl facility.env', cls: "term-line" },
    { d: 60, t: 'temp: <span class="term-ok">68°F</span> · humidity: <span class="term-ok">42%</span>', cls: "term-out" },
    { d: 80, t: '<span class="term-prompt">&gt;</span> noc.alerts --last 24h', cls: "term-line" },
    { d: 60, t: '<span class="term-dim">0 critical · 0 warning · — informational</span>', cls: "term-out" },
    { d: 80, t: '<span class="term-prompt">&gt;</span> waitlist.count', cls: "term-line" },
    { d: 60, t: 'reservations: <span class="term-ok">growing</span> · <span class="term-dim">join the queue ↓</span>', cls: "term-out" },
  ],
];

function typeLine(
  term: HTMLDivElement,
  html: string,
  cls: string,
  signal: { aborted: boolean }
): Promise<void> {
  const div = document.createElement("div");
  div.className = cls;
  term.appendChild(div);
  const target = html;
  return new Promise((resolve) => {
    let i = 0;
    function tick() {
      if (signal.aborted) {
        resolve();
        return;
      }
      i++;
      let slice = target.slice(0, i);
      // Balance HTML tags — skip past mid-tag positions
      const opens = (slice.match(/</g) || []).length;
      const closes = (slice.match(/>/g) || []).length;
      if (opens !== closes) {
        const next = target.indexOf(">", i);
        if (next > -1) {
          i = next + 1;
          slice = target.slice(0, i);
        }
      }
      div.innerHTML = slice + '<span class="term-caret"></span>';
      if (i >= target.length) {
        div.innerHTML = target;
        resolve();
        return;
      }
      setTimeout(tick, 16 + Math.random() * 18);
    }
    tick();
  });
}

export function HeroTerminal() {
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const term = termRef.current;
    if (!term) return;
    const signal = { aborted: false };
    const reduce =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(prefers-reduced-data: reduce)").matches;
    let sIdx = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function runSession() {
      if (signal.aborted || !term) return;
      term.innerHTML = "";
      const lines = SESSIONS[sIdx];
      sIdx = (sIdx + 1) % SESSIONS.length;
      for (const ln of lines) {
        if (signal.aborted) return;
        await new Promise((r) => setTimeout(r, ln.d));
        if (signal.aborted) return;
        await typeLine(term, ln.t, ln.cls, signal);
      }
      // Trailing prompt
      if (signal.aborted || !term) return;
      const tail = document.createElement("div");
      tail.className = "term-line";
      tail.innerHTML =
        '<span class="term-prompt">&gt;</span><span class="term-caret"></span>';
      term.appendChild(tail);
      if (!reduce) timer = setTimeout(runSession, 3800);
    }

    // Slight delay so it kicks in after the page settles
    timer = setTimeout(runSession, 1500);

    return () => {
      signal.aborted = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div className="hero-terminal">
      <div className="term-head">
        <span className="term-dot" style={{ background: "#FF5F57" }} />
        <span className="term-dot" style={{ background: "#FEBC2E" }} />
        <span className="term-dot" style={{ background: "#28C840" }} />
        <div className="term-head-meta preserve-case">
          <span>phase-systems · ops-shell</span>
          <span className="pkts">[demo telemetry]</span>
        </div>
      </div>
      <div ref={termRef} className="term-body preserve-case" />
    </div>
  );
}
