import Link from "next/link";
import { Reveal } from "@/components/site/reveal";

export const metadata = {
  title: "About — Phase Systems",
  description:
    "Phase Systems is the data center vertical of Phase Labs, built in Des Moines, Iowa.",
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
    <div className="mx-auto w-full max-w-5xl px-6 pt-20 pb-24">
      <Reveal>
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
          About
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="font-display text-4xl md:text-6xl mt-3 leading-[1.05]">
          Built in <span style={{ color: "#7CFFA8" }}>Des Moines</span>.
          <br />
          Built for what&apos;s next.
        </h1>
      </Reveal>
      <Reveal delay={160}>
        <p className="mt-8 max-w-2xl text-lg text-foreground/75 leading-relaxed">
          Phase Systems is the data center vertical of Phase Labs. We operate a
          single, integrated stack — colocation, compute, network, hardware, and
          security — out of central Iowa, where the grid, climate, and fiber are
          built for the workloads of the next decade.
        </p>
      </Reveal>

      {/* PILLARS */}
      <section className="mt-20">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
            Why Des Moines
          </div>
          <h2 className="font-display text-2xl md:text-3xl mt-3">
            Four reasons. One zip code.
          </h2>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.label} delay={i * 60}>
              <div className="border border-border bg-card/40 backdrop-blur-sm p-6">
                <div className="font-mono text-xs" style={{ color: "#7CFFA8" }}>
                  {p.label}
                </div>
                <div className="font-display text-xl mt-3">{p.title}</div>
                <p className="text-sm text-foreground/70 mt-3 leading-relaxed">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PHASE LABS */}
      <section className="mt-20">
        <Reveal>
          <div className="border border-border bg-card/40 backdrop-blur-sm p-8 md:p-12">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
              Parent Company
            </div>
            <h2 className="font-display text-2xl md:text-3xl mt-3">
              A vertical of Phase Labs
            </h2>
            <p className="mt-5 max-w-2xl text-foreground/75 leading-relaxed">
              Phase Labs builds infrastructure across compute, finance, and
              software. Phase Systems is the bare-metal arm — the steel and fiber
              underneath everything else we ship.
            </p>
            <a
              href="https://phaselabs.io"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block font-mono text-xs uppercase tracking-widest text-[#7CFFA8] hover:underline"
            >
              phaselabs.io ↗
            </a>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mt-20 text-center border-t border-border/60 pt-16">
        <Reveal>
          <h3 className="font-display text-2xl md:text-4xl">
            We&apos;re lighting up services in waves.
          </h3>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <Link
              href="/waitlist"
              className="font-mono text-xs uppercase tracking-widest border border-[#7CFFA8] px-5 py-3 hover-elevate"
              style={{ color: "#7CFFA8" }}
            >
              Join Waitlist →
            </Link>
            <Link
              href="/services"
              className="font-mono text-xs uppercase tracking-widest border border-border px-5 py-3 hover-elevate text-foreground/80"
            >
              Browse Services
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
