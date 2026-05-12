"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function renderLink(item: { href: string; label: string }, mobile = false) {
    const isHash = item.href.includes("#");
    const active =
      !isHash &&
      (pathname === item.href || pathname.startsWith(item.href + "/"));
    const className = cn(
      "font-mono uppercase tracking-widest transition-colors",
      mobile ? "text-lg py-5 -mx-2 px-2" : "text-xs",
      active
        ? "text-[#7CFFA8]"
        : "text-foreground/80 hover:text-foreground"
    );
    if (isHash) {
      const href = pathname === "/" ? item.href.replace("/", "") : item.href;
      return (
        <a
          key={item.href}
          href={href}
          className={className}
          onClick={() => setOpen(false)}
        >
          {item.label}
        </a>
      );
    }
    return (
      <Link
        key={item.href}
        href={item.href}
        className={className}
        onClick={() => setOpen(false)}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border/60 transition-colors",
        open
          ? "bg-background"
          : "backdrop-blur-md bg-background/80"
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo-mark-256.png"
            alt="Phase Systems"
            width={28}
            height={28}
            priority
            className="h-6 w-6 sm:h-7 sm:w-7"
          />
          <span className="flex items-baseline gap-1.5">
            <span className="font-display text-base tracking-wider text-foreground">
              PHASE
            </span>
            <span
              className="font-display text-base tracking-wider"
              style={{ color: "#7CFFA8" }}
            >
              SYSTEMS
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((item) => renderLink(item, false))}
          <Link
            href="/waitlist"
            className="btn-primary btn-sm hover-elevate"
          >
            Join Waitlist →
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 -mr-2 group"
        >
          <span
            className={cn(
              "block w-5 h-[1.5px] bg-foreground/80 transition-transform duration-200",
              open ? "translate-y-[3px] rotate-45" : ""
            )}
          />
          <span
            className={cn(
              "block w-5 h-[1.5px] bg-foreground/80 mt-[5px] transition-transform duration-200",
              open ? "-translate-y-[3px] -rotate-45" : ""
            )}
          />
        </button>
      </div>

      {/* Mobile drawer — solid bg, sits below header */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-14 bottom-0 z-30 bg-background border-t border-border/60 transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col px-6 py-8 gap-1 divide-y divide-border/40">
          {NAV.map((item) => renderLink(item, true))}
          <Link
            href="/waitlist"
            onClick={() => setOpen(false)}
            className="btn-primary mt-8 w-full justify-center hover-elevate"
          >
            Join Waitlist →
          </Link>
          <div className="mt-8 pt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40 border-t border-border/40">
            Des Moines · Iowa<br />
            41.6867°N · 93.5988°W
          </div>
        </nav>
      </div>
    </header>
  );
}
