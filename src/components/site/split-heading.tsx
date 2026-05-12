"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Split a heading into per-word spans and reveal each on scroll-in with
// a staggered wordRise animation. Preserves the original text via a
// fallback class so the layout doesn't jump if JS hasn't run yet.

interface SplitHeadingProps {
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  delay?: number; // ms before the stagger starts after intersect
  step?: number; // ms between each word
  children: ReactNode;
}

export function SplitHeading({
  as = "h2",
  className,
  delay = 0,
  step = 60,
  children,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Walk text nodes and wrap each whitespace-separated chunk in a span.
    const wrapWords = (root: Node) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      let n = walker.nextNode();
      while (n) {
        if (n.nodeValue && n.nodeValue.trim().length > 0) {
          textNodes.push(n as Text);
        }
        n = walker.nextNode();
      }
      textNodes.forEach((tn) => {
        const frag = document.createDocumentFragment();
        const parts = tn.nodeValue!.split(/(\s+)/);
        parts.forEach((p) => {
          if (/^\s+$/.test(p)) {
            frag.appendChild(document.createTextNode(p));
          } else if (p.length > 0) {
            const word = document.createElement("span");
            word.className = "sw word";
            const inner = document.createElement("span");
            inner.className = "sw-inner";
            inner.textContent = p;
            word.appendChild(inner);
            frag.appendChild(word);
          }
        });
        tn.parentNode?.replaceChild(frag, tn);
      });
    };

    wrapWords(el);

    const innerSpans = Array.from(
      el.querySelectorAll<HTMLElement>(".sw-inner")
    );

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            innerSpans.forEach((sp, i) => {
              sp.style.animationDelay = `${delay + i * step}ms`;
              sp.classList.add("sw-in");
            });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, step]);

  const Tag = as;
  return (
    <Tag ref={ref} className={cn("split", className)}>
      {children}
    </Tag>
  );
}
