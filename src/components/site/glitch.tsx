"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Glitch text: two pseudo-element clips render mint+red offsets on hover.
// On hover the CSS animation triggers; we also retrigger via a JS pulse
// when the user moves over after the animation has finished so it feels
// alive on repeat hovers.

export function Glitch({
  children,
  className,
  as = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "em" | "strong";
}) {
  const ref = useRef<HTMLElement | null>(null);

  const text = typeof children === "string" ? children : "";

  const onEnter = () => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("glitch-pulse");
    // force reflow to retrigger animation
    void el.offsetWidth;
    el.classList.add("glitch-pulse");
  };

  const Tag = as as "span";
  return (
    <Tag
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={cn("glitch", className)}
      data-text={text}
      onMouseEnter={onEnter}
    >
      {children}
    </Tag>
  );
}
