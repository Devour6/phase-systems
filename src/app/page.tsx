import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/lib/services";
import { ServiceCard } from "@/components/site/service-card";
import { Reveal } from "@/components/site/reveal";
import { SplitHeading } from "@/components/site/split-heading";
import { Glitch } from "@/components/site/glitch";
import { HeroHudPills, HeroHudGauges } from "@/components/site/hero-hud";
import { HeroTerminal } from "@/components/site/hero-terminal";
import { RegionMap } from "@/components/site/region-map";
import { StatsStrip } from "@/components/site/stats-strip";
import { SecNum } from "@/components/site/sec-num";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* HERO — full-width grid, container inside */}
      <section className="relative overflow-hidden">
        <div id="hero-grid" className="hero-grid" aria-hidden />
        <div className="relative z-[2] mx-auto w-full max-w-6xl px-4 sm:px-6 pt-10 md:pt-16 pb-20 md:pb-24">
          {/* Section number */}
          <SecNum label="01 — Operations" className="mb-6" />
          {/* HUD pills */}
          <Reveal>
            <HeroHudPills />
          </Reveal>

          {/* Headline */}
          <div className="mt-10 md:mt-12">
            <SplitHeading
              as="h1"
              className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight max-w-5xl"
              delay={120}
              step={90}
            >
              PHASE{" "}
              <Glitch className="text-[#7CFFA8] block sm:inline">
                SYSTEMS
              </Glitch>
            </SplitHeading>
          </div>

          {/* Subhead */}
          <Reveal delay={400}>
            <p className="mt-6 md:mt-8 max-w-xl text-base md:text-lg text-foreground/70 leading-relaxed">
              Built for the next generation of compute. Cloud, colocation,
              internet, hardware, and security — operated end-to-end from
              Des&nbsp;Moines, Iowa.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={520}>
            <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
              <Link
                href="/waitlist"
                className="btn-primary hover-elevate"
              >
                Join the Waitlist →
              </Link>
              <a
                href="#services"
                className="btn-secondary hover-elevate"
              >
                Explore Services
              </a>
            </div>
          </Reveal>

          {/* HUD gauges */}
          <div className="mt-12 md:mt-16">
            <Reveal>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/45 mb-4 inline-flex items-center gap-2">
                <span className="led led-pulse" />
                // Facility Telemetry · [demo]
              </div>
            </Reveal>
            <Reveal delay={120}>
              <HeroHudGauges />
            </Reveal>
          </div>

          {/* Terminal */}
          <div className="mt-10 md:mt-12">
            <Reveal>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/45 mb-3 inline-flex items-center gap-2">
                <span className="led led-pulse" />
                // Ops Shell · DSM-01
              </div>
            </Reveal>
            <HeroTerminal />
          </div>
        </div>
      </section>

      {/* SERVICES — directory listing */}
      <section
        id="services"
        className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-20 md:pb-24 scroll-mt-20"
      >
        <Reveal>
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <SecNum label="02 — Services" />
              <SplitHeading
                as="h2"
                className="font-display text-3xl md:text-4xl mt-3"
              >
                Six verticals. One facility.
              </SplitHeading>
              <p className="mt-3 max-w-xl text-sm md:text-base text-foreground/65 leading-relaxed">
                A single, vertically-integrated stack. Pick the slice you need —
                or take the whole rack.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="tier-label flex items-center gap-3 mb-8 pt-4 border-t border-border/60">
            <span className="led led-pulse" style={{ width: 5, height: 5 }} />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: "#7CFFA8" }}
            >
              // BUILDING NOW · WAITLIST OPEN
            </span>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
              06 VERTICALS
            </span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="services">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* REGION + LATENCY */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-20 md:pb-24">
        <Reveal>
          <SecNum label="03 — Region" />
          <SplitHeading
            as="h2"
            className="font-display text-3xl md:text-4xl mt-3"
          >
            Built in Des Moines. Reach the heartland.
          </SplitHeading>
          <p className="mt-3 max-w-xl text-sm md:text-base text-foreground/65 leading-relaxed">
            DSM-01 sits at the center of the Midwest fiber backbone — single-digit
            milliseconds to every major metro between Chicago and Denver.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="region-wrap mt-10">
            <RegionMap />
            <div className="region-aside">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">
                Indicative RTT · [demo]
              </div>
              {[
                { city: "Chicago", rtt: "~8" },
                { city: "Minneapolis", rtt: "~10" },
                { city: "Kansas City", rtt: "~6" },
                { city: "St Louis", rtt: "~9" },
                { city: "Omaha", rtt: "~5" },
                { city: "Madison", rtt: "~8" },
              ].map((row) => (
                <div key={row.city} className="region-aside-row">
                  <span className="region-aside-city">{row.city}</span>
                  <span className="region-aside-rtt">
                    {row.rtt}
                    <span className="u">ms</span>
                  </span>
                </div>
              ))}
              <Link
                href="/about"
                className="mt-4 font-mono text-xs uppercase tracking-widest text-[#7CFFA8] hover:underline self-start"
              >
                Why Des Moines →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* STATS STRIP */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-20 md:pb-24">
        <Reveal>
          <SecNum label="04 — Facility" />
          <SplitHeading
            as="h2"
            className="font-display text-3xl md:text-4xl mt-3 mb-10"
          >
            One building. One operator.
          </SplitHeading>
        </Reveal>
        <Reveal delay={120}>
          <StatsStrip />
        </Reveal>
      </section>

      {/* ON-SITE PROOF — rack photo */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-20 md:pb-24">
        <Reveal>
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-7 order-2 md:order-1">
              <SecNum label="05 — On-site" />
              <SplitHeading
                as="h3"
                className="font-display text-2xl md:text-4xl mt-3 leading-tight"
              >
                Real hardware. Real fiber. Real Iowa.
              </SplitHeading>
              <p className="mt-4 max-w-md text-sm md:text-base text-foreground/70 leading-relaxed">
                Phase Systems builds what it operates. Every rack, switch, and
                cross-connect is owned, racked, and run by us — out of one
                facility in central Des Moines.
              </p>
              <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/50 flex flex-wrap gap-x-6 gap-y-2">
                <span>◆ DSM-01</span>
                <span>41.6867°N · 93.5988°W</span>
              </div>
            </div>
            <div className="md:col-span-5 order-1 md:order-2">
              <figure className="relative">
                <div className="relative border border-border/80 overflow-hidden bg-background">
                  <Image
                    src="/rack.jpg"
                    alt="Phase Systems server rack — Des Moines, Iowa"
                    width={1200}
                    height={1472}
                    className="block w-full h-auto"
                  />
                  <span aria-hidden className="pointer-events-none absolute top-2 left-2 w-3 h-3 border-t border-l border-[#7CFFA8]/70" />
                  <span aria-hidden className="pointer-events-none absolute top-2 right-2 w-3 h-3 border-t border-r border-[#7CFFA8]/70" />
                  <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#7CFFA8]/70" />
                  <span aria-hidden className="pointer-events-none absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#7CFFA8]/70" />
                </div>
                <figcaption className="mt-3 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.22em] text-foreground/45">
                  <span className="inline-flex items-center gap-2">
                    <span className="led led-pulse" style={{ width: 4, height: 4 }} />
                    DSM-01 / FACILITY-A
                  </span>
                  <span>41.6867°N · 93.5988°W</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-24 md:pb-32">
        <div
          className="text-center py-14 md:py-20 relative"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {/* center mint accent on divider */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 -top-px h-px w-24 -translate-x-1/2"
            style={{ background: "var(--accent)" }}
          />
          <SecNum label="06 — Get on the list" className="!justify-center inline-block" />
          <SplitHeading
            as="h3"
            className="font-display text-3xl md:text-5xl mt-5 leading-tight"
          >
            We&apos;re building.{" "}
            <Glitch className="text-[#7CFFA8] inline-block">
              Be first in line.
            </Glitch>
          </SplitHeading>
          <Reveal delay={400}>
            <p className="mt-6 max-w-xl mx-auto text-foreground/65 leading-relaxed">
              Phase Systems is opening services in waves. Drop your email and
              we&apos;ll let you know when your vertical is live.
            </p>
          </Reveal>
          <Reveal delay={520}>
            <div className="mt-8">
              <Link href="/waitlist" className="btn-primary hover-elevate">
                Join the Waitlist →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
