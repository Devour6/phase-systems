import { SERVICES } from "@/lib/services";
import { ServiceCard } from "@/components/site/service-card";
import { Reveal } from "@/components/site/reveal";
import { SplitHeading } from "@/components/site/split-heading";
import { SecNum } from "@/components/site/sec-num";

export const metadata = {
  title: "Services",
  alternates: { canonical: "/services" },
  description:
    "Six verticals operated from one facility in Des Moines, Iowa. Virtualization, internet, colocation, hardware, cybersecurity, physical security.",
};

export default function ServicesIndexPage() {
  return (
    <div className="w-full">
      <section className="relative overflow-hidden">
        <div id="hero-grid" className="hero-grid" aria-hidden />
        <div className="relative z-[2] mx-auto w-full max-w-6xl px-4 sm:px-6 pt-12 md:pt-20 pb-12 md:pb-16">
          <SecNum label="// Services · Phase Systems" className="mb-6" />
          <SplitHeading
            as="h1"
            className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight max-w-4xl"
            delay={120}
            step={90}
          >
            Six verticals.
            <br />
            One facility.
          </SplitHeading>
          <Reveal delay={400}>
            <p className="mt-6 md:mt-8 max-w-xl text-base md:text-lg text-foreground/70 leading-relaxed">
              A single, vertically-integrated stack out of DSM-01. Pick the
              slice you need — or take the whole rack.
            </p>
          </Reveal>
          <Reveal delay={500}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">
              <span className="inline-flex items-center gap-2">
                <span className="led led-pulse" style={{ width: 4, height: 4 }} />
                Status · Building
              </span>
              <span>Verticals · 06</span>
              <span>Waitlist · Open</span>
              <span>Facility · DSM-01</span>
              <span>41.6867°N · 93.5988°W</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-24 md:pb-32">
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

      {/* ROADMAP */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-20 md:pb-24">
        <Reveal>
          <SecNum label="// Rollout" className="mb-3" />
          <SplitHeading
            as="h2"
            className="font-display text-3xl md:text-4xl mt-2"
          >
            Lighting up in waves.
          </SplitHeading>
          <p className="mt-3 max-w-xl text-sm md:text-base text-foreground/65 leading-relaxed">
            Verticals roll out as the facility scales. Waitlist position
            determines onboarding order within each phase.
          </p>
        </Reveal>
        <div className="mt-10 border-t border-border/60">
          {[
            { phase: "Phase 1", what: "Colocation · Internet · Hardware", state: "Waitlist open" },
            { phase: "Phase 2", what: "Virtualization · Cybersecurity", state: "Next wave" },
            { phase: "Phase 3", what: "Physical Security · Bundled SLAs", state: "Planned" },
          ].map((row, i) => (
            <Reveal key={row.phase} delay={i * 80}>
              <div className="grid grid-cols-12 gap-4 py-5 md:py-6 border-b border-border/60 items-center hover:bg-[rgba(124,255,168,0.025)] transition-colors">
                <div className="col-span-3 md:col-span-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/45 inline-flex items-center gap-2">
                  <span className="led led-pulse" />
                  {row.phase}
                </div>
                <div className="col-span-9 md:col-span-7 font-display text-base md:text-lg">
                  {row.what}
                </div>
                <div className="col-span-12 md:col-span-3 font-mono text-[10px] md:text-xs uppercase tracking-[0.22em] text-[#7CFFA8] md:text-right">
                  {row.state}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.25em] text-foreground/40">
          // Indicative roadmap · subject to facility build pace
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-24 md:pb-32">
        <Reveal>
          <div
            className="text-center py-14 md:py-20 relative"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 -top-px h-px w-24 -translate-x-1/2"
              style={{ background: "var(--accent)" }}
            />
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50 inline-flex items-center gap-2">
              <span className="led led-pulse" />
              // Pick your slice
            </div>
            <h3 className="font-display text-3xl md:text-5xl mt-5 leading-tight max-w-3xl mx-auto">
              One team. Every layer.
            </h3>
            <p className="mt-6 max-w-xl mx-auto text-foreground/65 leading-relaxed">
              Tell us which vertical you need and when. We&apos;ll line up the
              metal.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <a href="/waitlist" className="btn-primary hover-elevate">
                Join the Waitlist →
              </a>
              <a href="/contact" className="btn-secondary hover-elevate">
                Talk to Sales
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
