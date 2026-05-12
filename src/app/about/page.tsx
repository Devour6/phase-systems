import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { SplitHeading } from "@/components/site/split-heading";
import { SecNum } from "@/components/site/sec-num";
import { Glitch } from "@/components/site/glitch";
import { StatsStrip } from "@/components/site/stats-strip";
import { RegionMap } from "@/components/site/region-map";

export const metadata = {
  title: "About — Phase Systems",
  description:
    "Phase Systems is the data center vertical of Phase, built in Des Moines, Iowa.",
};

const PILLARS = [
  {
    label: "01 / GRID",
    title: "Power that holds",
    body: "MISO grid reliability, growing renewable mix from Iowa wind and solar, and pricing that doesn't punish scale. Power is the new bottleneck — Iowa has it.",
  },
  {
    label: "02 / CLIMATE",
    title: "Free cooling for free",
    body: "Cool, dry winters and moderate summers cut PUE meaningfully versus coastal markets. Free-air economization runs the majority of the year.",
  },
  {
    label: "03 / FIBER",
    title: "Backbone, not branch",
    body: "Des Moines sits on a major Midwest fiber crossroad. Multiple tier-1 carriers, dense regional fiber, and direct paths to Chicago, Omaha, KC, and Minneapolis.",
  },
  {
    label: "04 / JURISDICTION",
    title: "Stable rules, predictable cost",
    body: "Iowa's regulatory environment is stable and tax-friendly to data infrastructure — no surprise CEQA-style delays, no sudden bans on growth.",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div id="hero-grid" className="hero-grid" aria-hidden />
        <div className="relative z-[2] mx-auto w-full max-w-6xl px-4 sm:px-6 pt-12 md:pt-20 pb-16 md:pb-24">
          <SecNum label="01 — About" className="mb-6" />
          <SplitHeading
            as="h1"
            className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight max-w-5xl"
            delay={120}
            step={90}
          >
            Built in{" "}
            <Glitch className="text-[#7CFFA8] block sm:inline">
              Des Moines.
            </Glitch>{" "}
            Built for what&apos;s next.
          </SplitHeading>
          <Reveal delay={500}>
            <p className="mt-8 max-w-2xl text-base md:text-lg text-foreground/70 leading-relaxed">
              Phase Systems is the data center vertical of Phase. We operate a
              single, integrated stack — colocation, compute, network, hardware,
              and security — out of central Iowa, where the grid, climate, and
              fiber are built for the workloads of the next decade.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-20 md:pb-24">
        <SecNum label="02 — Why Des Moines" className="mb-3" />
        <SplitHeading
          as="h2"
          className="font-display text-3xl md:text-4xl mt-2"
        >
          Four reasons. One zip code.
        </SplitHeading>
        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.label} delay={i * 70}>
              <div className="border border-border bg-[var(--bg-1)] p-6 md:p-7 h-full hover-elevate group">
                <div
                  className="font-mono text-[11px] tracking-[0.18em]"
                  style={{ color: "#7CFFA8" }}
                >
                  {p.label}
                </div>
                <div className="font-display text-xl md:text-2xl mt-4">
                  {p.title}
                </div>
                <p className="text-sm text-foreground/65 mt-3 leading-relaxed">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* REGION MAP */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-20 md:pb-24">
        <SecNum label="03 — Midwest Reach" className="mb-3" />
        <SplitHeading
          as="h2"
          className="font-display text-3xl md:text-4xl mt-2"
        >
          At the center, on purpose.
        </SplitHeading>
        <p className="mt-3 max-w-xl text-sm md:text-base text-foreground/65 leading-relaxed">
          DSM-01 sits in the center of the Midwest fiber backbone. Indicative
          round-trip times to major peering points.
        </p>
        <div className="mt-10">
          <RegionMap />
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-20 md:pb-24">
        <SecNum label="04 — Facility" className="mb-3" />
        <SplitHeading
          as="h2"
          className="font-display text-3xl md:text-4xl mt-2"
        >
          Designed for what&apos;s next.
        </SplitHeading>
        <div className="mt-10">
          <StatsStrip />
        </div>
      </section>

      {/* PARENT */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-20 md:pb-24">
        <Reveal>
          <div className="border border-border bg-[var(--bg-1)] p-6 md:p-12">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
              Parent Company
            </div>
            <h2 className="font-display text-2xl md:text-3xl mt-3">
              A vertical of <span style={{ color: "#7CFFA8" }}>Phase</span>
            </h2>
            <p className="mt-5 max-w-2xl text-foreground/70 leading-relaxed">
              Phase builds infrastructure across compute, finance, and software.
              Phase Systems is the bare-metal arm — the steel and fiber underneath
              everything else we ship.
            </p>
            <a
              href="https://phase.cc"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block font-mono text-xs uppercase tracking-widest text-[#7CFFA8] hover:underline"
            >
              phase.cc ↗
            </a>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-24 md:pb-32 text-center">
        <Reveal>
          <SplitHeading
            as="h3"
            className="font-display text-2xl sm:text-3xl md:text-4xl"
          >
            We&apos;re lighting up services in waves.
          </SplitHeading>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Link href="/waitlist" className="btn-primary hover-elevate">
              Join Waitlist →
            </Link>
            <Link href="/#services" className="btn-secondary hover-elevate">
              Browse Services
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
