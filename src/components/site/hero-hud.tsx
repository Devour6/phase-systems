"use client";

import { useEffect, useRef, useState } from "react";

// Hero HUD: pill strip + 4-card gauge grid with live (jittered) values.
// All numbers are clearly demo telemetry — we're not claiming production stats.
// Uptime counter is a real counter from a fixed start instant (project init).
//
// Exposes two components — HeroHudPills and HeroHudGauges — that each own
// their own jitter loops (cheap, independent). Both can be placed anywhere.

const STATUS_CYCLE = [
  { t: "BUILDING", c: "syncing" as const },
  { t: "EARLY ACCESS", c: "nominal" as const },
  { t: "WAITLIST OPEN", c: "nominal" as const },
];

const COUNTER_START = new Date("2026-05-01T00:00:00Z").getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

function drawSpark(svg: SVGSVGElement, data: number[]) {
  const w = 100;
  const h = 20;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const rng = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / rng) * (h - 3) - 1;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  svg.innerHTML = `
    <polyline fill="none" stroke="#7CFFA8" stroke-width="1.2" stroke-linejoin="round" points="${pts}"/>
    <polyline fill="rgba(245,242,236,0.10)" stroke="none" points="0,${h} ${pts} ${w},${h}"/>
  `;
}

export function HeroHudPills() {
  const [rotIdx, setRotIdx] = useState(0);
  const [counter, setCounter] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setRotIdx((i) => (i + 1) % STATUS_CYCLE.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    function tick() {
      const sec = Math.floor((Date.now() - COUNTER_START) / 1000);
      const d = Math.floor(sec / 86400);
      const h = Math.floor((sec % 86400) / 3600);
      const m = Math.floor((sec % 3600) / 60);
      const s = sec % 60;
      setCounter(`${d}d ${pad(h)}:${pad(m)}:${pad(s)}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const status = STATUS_CYCLE[rotIdx];

  return (
    <div className="hud-strip">
      <div className="hud-pill hud-pill-in" style={{ animationDelay: "0ms" }}>
        <span className="hud-pill-dot" />
        <span>Phase Systems · DSM-01 · <b>online</b></span>
      </div>
      <div
        className={`hud-pill hud-pill-in status ${status.c}`}
        style={{ animationDelay: "100ms" }}
      >
        <span className="hud-pill-dot" />
        <span className="lbl">status:</span>{" "}
        <span className="stat-text">{status.t}</span>
      </div>
      <div className="hud-pill hud-pill-in" style={{ animationDelay: "200ms" }}>
        <span className="lbl">build:</span> <b>v0.4.2 [demo]</b>
      </div>
      <div className="hud-pill hud-pill-in" style={{ animationDelay: "300ms" }}>
        <span className="lbl">counter:</span> <b>{counter || "—"}</b>
      </div>
    </div>
  );
}

export function HeroHudGauges() {
  const [cpu, setCpu] = useState(37);
  const [mem, setMem] = useState(61);
  const [net, setNet] = useState(88);
  const [pkt, setPkt] = useState(142308);

  const cpuFillRef = useRef<HTMLDivElement>(null);
  const memFillRef = useRef<HTMLDivElement>(null);
  const netSparkRef = useRef<SVGSVGElement>(null);
  const pktSparkRef = useRef<SVGSVGElement>(null);
  const netHist = useRef<number[]>(Array.from({ length: 24 }, () => 14 + Math.random() * 4));
  const pktHist = useRef<number[]>(Array.from({ length: 24 }, () => 14 + Math.random() * 4));

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = window.matchMedia("(prefers-reduced-data: reduce)").matches;
    if (reduce || saveData) return;
    function tickHud() {
      setCpu((v) => Math.max(18, Math.min(72, v + (Math.random() - 0.5) * 6)));
      setMem((v) => Math.max(40, Math.min(82, v + (Math.random() - 0.5) * 4)));
      setNet((v) => Math.max(60, Math.min(98, v + (Math.random() - 0.5) * 5)));
      setPkt((v) =>
        Math.max(80000, Math.min(220000, v + Math.round((Math.random() - 0.4) * 5000)))
      );
    }
    const id = setInterval(tickHud, 800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (cpuFillRef.current) cpuFillRef.current.style.width = cpu + "%";
  }, [cpu]);
  useEffect(() => {
    if (memFillRef.current) memFillRef.current.style.width = mem + "%";
  }, [mem]);
  useEffect(() => {
    netHist.current.shift();
    netHist.current.push(20 - (net - 60) * 0.4);
    if (netSparkRef.current) drawSpark(netSparkRef.current, netHist.current);
  }, [net]);
  useEffect(() => {
    pktHist.current.shift();
    pktHist.current.push(20 - ((pkt - 80000) / 140000) * 16);
    if (pktSparkRef.current) drawSpark(pktSparkRef.current, pktHist.current);
  }, [pkt]);

  return (
    <div className="hud-grid">
      <div className="hud-card hud-card-in">
        <div className="hud-lbl">CPU LOAD <span className="hud-demo">[demo]</span></div>
        <div className="hud-val">
          <span>{Math.round(cpu)}</span>
          <span className="u">%</span>
        </div>
        <div className="hud-gauge">
          <div ref={cpuFillRef} className="hud-gauge-fill" />
        </div>
      </div>
      <div className="hud-card hud-card-in">
        <div className="hud-lbl">MEM <span className="hud-demo">[demo]</span></div>
        <div className="hud-val">
          <span>{Math.round(mem)}</span>
          <span className="u">%</span>
        </div>
        <div className="hud-gauge">
          <div ref={memFillRef} className="hud-gauge-fill" />
        </div>
      </div>
      <div className="hud-card hud-card-in">
        <div className="hud-lbl">NET <span className="hud-demo">[demo]</span></div>
        <div className="hud-val">
          <span>{Math.round(net)}</span>
          <span className="u">Gbps</span>
        </div>
        <svg
          ref={netSparkRef}
          className="spark"
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
        />
      </div>
      <div className="hud-card hud-card-in">
        <div className="hud-lbl">PKT/S <span className="hud-demo">[demo]</span></div>
        <div className="hud-val">
          <span>{fmt(pkt)}</span>
        </div>
        <svg
          ref={pktSparkRef}
          className="spark"
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
        />
      </div>
    </div>
  );
}
