"use client";

// Mouse-parallax tilt wrapper. Tiny 3D rotation on hover, smoothly lerped.
// Touch + reduced-motion disable. Drop-in around any block.

import { useEffect, useRef } from "react";

export function Tilt({
  children,
  max = 4,
  className,
}: {
  children: React.ReactNode;
  max?: number; // max degree tilt
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const raf = useRef(0);
  const target = useRef({ rx: 0, ry: 0 });
  const current = useRef({ rx: 0, ry: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const touch = window.matchMedia("(hover: none)").matches;
    if (reduce || touch) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      target.current.ry = x * max * 2;
      target.current.rx = -y * max * 2;
    };
    const onLeave = () => {
      target.current.rx = 0;
      target.current.ry = 0;
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    const loop = () => {
      current.current.rx += (target.current.rx - current.current.rx) * 0.12;
      current.current.ry += (target.current.ry - current.current.ry) * 0.12;
      el.style.transform = `perspective(1200px) rotateX(${current.current.rx.toFixed(2)}deg) rotateY(${current.current.ry.toFixed(2)}deg)`;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf.current);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [max]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        willChange: "transform",
        transformStyle: "preserve-3d",
        transition: "transform 600ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </div>
  );
}
