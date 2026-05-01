"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 backdrop-blur-md bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-base tracking-wider text-foreground">
            PHASE
          </span>
          <span
            className="font-display text-base tracking-wider"
            style={{ color: "#7CFFA8" }}
          >
            SYSTEMS
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-mono text-xs uppercase tracking-widest transition-colors",
                  active
                    ? "text-[#7CFFA8]"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/waitlist"
            className="font-mono text-xs uppercase tracking-widest border border-[#7CFFA8]/40 text-[#7CFFA8] px-3 py-1.5 hover-elevate"
          >
            Join Waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
