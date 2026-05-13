import { SERVICES } from "@/lib/services";
import { ServiceCard } from "@/components/site/service-card";
import { Reveal } from "@/components/site/reveal";
import { SplitHeading } from "@/components/site/split-heading";
import { SecNum } from "@/components/site/sec-num";

export const metadata = {
  title: "Services — Phase Systems",
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
    </div>
  );
}
