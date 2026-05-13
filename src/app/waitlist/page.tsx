import { Suspense } from "react";
import { WaitlistForm } from "./waitlist-form";
import { Reveal } from "@/components/site/reveal";
import { SplitHeading } from "@/components/site/split-heading";
import { SecNum } from "@/components/site/sec-num";
import { Glitch } from "@/components/site/glitch";

export const metadata = {
  title: "Waitlist",
  alternates: { canonical: "/waitlist" },
  description:
    "Get on the waitlist for Phase Systems services. Be first when we light up your vertical.",
};

export default function WaitlistPage() {
  return (
    <div className="w-full">
      <section className="relative overflow-hidden">
        <div id="hero-grid" className="hero-grid" aria-hidden />
        <div className="relative z-[2] mx-auto w-full max-w-3xl px-4 sm:px-6 pt-12 md:pt-20 pb-16 md:pb-24">
          <SecNum label="// Waitlist" className="mb-6" />
          <SplitHeading
            as="h1"
            className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight"
            delay={120}
            step={90}
          >
            Be first{" "}
            <Glitch className="text-[#7CFFA8] block sm:inline">
              in line.
            </Glitch>
          </SplitHeading>
          <Reveal delay={400}>
            <p className="mt-7 text-base md:text-lg text-foreground/70 leading-relaxed max-w-xl">
              We&apos;re bringing services online one vertical at a time. Drop
              your email and tell us what you&apos;re after — we&apos;ll reach
              out the moment your slice is ready.
            </p>
          </Reveal>

          <Reveal delay={460}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">
              <span className="inline-flex items-center gap-2">
                <span className="led led-pulse" style={{ width: 4, height: 4 }} />
                Status · Waitlist Open
              </span>
              <span>Verticals · 06</span>
              <span>Facility · DSM-01</span>
              <span>41.6867°N · 93.5988°W</span>
            </div>
          </Reveal>

          <Reveal delay={520}>
            <div className="form-surface mt-8 p-6 md:p-8">
              <span className="corner-tl" aria-hidden />
              <span className="corner-br" aria-hidden />
              <Suspense fallback={null}>
                <WaitlistForm />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
