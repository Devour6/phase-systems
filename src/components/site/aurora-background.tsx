"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export function AuroraBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const next: Particle[] = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 18,
      duration: 18 + Math.random() * 22,
      size: 1 + Math.random() * 2,
    }));
    setParticles(next);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Mint blob */}
      <div
        className="aurora-blob"
        style={{
          top: "-10%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(circle at 30% 30%, rgba(124,255,168,0.18), rgba(124,255,168,0) 60%)",
          animationDelay: "0s",
        }}
      />
      {/* Cream blob */}
      <div
        className="aurora-blob"
        style={{
          bottom: "-15%",
          right: "-10%",
          width: "55vw",
          height: "55vw",
          background:
            "radial-gradient(circle at 60% 60%, rgba(243,238,217,0.07), rgba(243,238,217,0) 65%)",
          animationDelay: "-7s",
        }}
      />
      {/* Gold blob (subtle) */}
      <div
        className="aurora-blob"
        style={{
          top: "30%",
          right: "10%",
          width: "32vw",
          height: "32vw",
          background:
            "radial-gradient(circle at 50% 50%, rgba(252,225,132,0.06), rgba(252,225,132,0) 70%)",
          animationDelay: "-12s",
        }}
      />

      {/* Grain / fine grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(243,238,217,1) 1px, transparent 1px), linear-gradient(90deg, rgba(243,238,217,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "rgba(124, 255, 168, 0.7)",
            boxShadow: "0 0 6px rgba(124,255,168,0.6)",
            animation: `particle-rise ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
