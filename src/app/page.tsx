import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/lib/services";
import { ServiceRow } from "@/components/site/service-row";
import { Reveal } from "@/components/site/reveal";
import { SplitHeading } from "@/components/site/split-heading";
import { Glitch } from "@/components/site/glitch";
import { HeroHudPills, HeroHudGauges } from "@/components/site/hero-hud";
import { HeroTerminal } from "@/components/site/hero-terminal";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* HERO — full-width grid, container inside */}
      <section className="relative overflow-hidden">
        <div id="hero-grid" className="hero-grid" aria-hidden />
        <div className="relative z-[2] mx-auto w-full max-w-6xl px-4 sm:px-6 pt-12 md:pt-20 pb-20 md:pb-24">
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
                className="font-mono text-xs uppercase tracking-widest border border-[#7CFFA8] px-5 py-3.5 hover-elevate text-center"
                style={{ color: "#7CFFA8" }}
              >
                Join the Waitlist →
              </Link>
              <a
                href="#services"
                className="font-mono text-xs uppercase tracking-widest border border-border px-5 py-3.5 hover-elevate text-foreground/80 hover:text-foreground text-center"
              >
                Explore Services
              </a>
            </div>
          </Reveal>

          {/* HUD gauges */}
          <div className="mt-12 md:mt-16">
            <Reveal>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-3">
                Facility Telemetry · [demo]
              </div>
            </Reveal>
            <Reveal delay={120}>
              <HeroHudGauges />
            </Reveal>
          </div>

          {/* Terminal */}
          <div className="mt-10 md:mt-12">
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
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
                Services · 06
              </div>
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
        <Reveal delay={120}>
          <div className="border-x border-border/60">
            {SERVICES.map((s, i) => (
              <ServiceRow key={s.slug} service={s} index={i} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* WHY DES MOINES TEASER */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-20 md:pb-24">
        <Reveal>
          <div className="border border-border bg-card/40 backdrop-blur-sm p-6 md:p-12">
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
                  Why Des Moines
                </div>
                <h3 className="font-display text-2xl md:text-3xl mt-3 leading-tight">
                  Power, climate, fiber.
                </h3>
              </div>
              <div className="md:col-span-2 grid sm:grid-cols-3 gap-6">
                <div>
                  <div className="font-mono text-xs text-[#7CFFA8]">01 / GRID</div>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                    Among the most reliable power markets in North America, with
                    growing renewable capacity.
                  </p>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#7CFFA8]">02 / CLIMATE</div>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                    Cool winters and dry conditions reduce cooling overhead
                    year-round.
                  </p>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#7CFFA8]">03 / FIBER</div>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                    Sitting on a major Midwest fiber backbone with multiple
                    tier-1 carriers.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Link
                href="/about"
                className="font-mono text-xs uppercase tracking-widest text-[#7CFFA8] hover:underline"
              >
                Read the case →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ON-SITE PROOF — rack photo */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-20 md:pb-24">
        <Reveal>
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-7 order-2 md:order-1">
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
                On-site
              </div>
              <h3 className="font-display text-2xl md:text-4xl mt-3 leading-tight">
                Real hardware. Real fiber. Real Iowa.
              </h3>
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
              </figure>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-24 md:pb-32">
        <Reveal>
          <div className="text-center py-14 md:py-20 border-t border-border/60">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
              Get on the list
            </div>
            <h3 className="font-display text-3xl md:text-5xl mt-4 leading-tight">
              We&apos;re building. Be first in line.
            </h3>
            <p className="mt-5 max-w-xl mx-auto text-foreground/70">
              Phase Systems is opening services in waves. Drop your email and
              we&apos;ll let you know when your vertical is live.
            </p>
            <div className="mt-8">
              <Link
                href="/waitlist"
                className="font-mono text-xs uppercase tracking-widest border border-[#7CFFA8] px-6 py-3 hover-elevate inline-block"
                style={{ color: "#7CFFA8" }}
              >
                Join the Waitlist →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
