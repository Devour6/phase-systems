import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { ServiceCard } from "@/components/site/service-card";
import { Reveal } from "@/components/site/reveal";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      {/* HERO */}
      <section className="pt-24 pb-32">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/60 mb-6">
            <span style={{ color: "#7CFFA8" }}>◆</span>{"  "}
            Des Moines · Iowa
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] tracking-wide">
            PHASE
            <br />
            <span style={{ color: "#7CFFA8" }}>SYSTEMS</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-foreground/75 leading-relaxed">
            Built for the next generation of compute. Cloud, colocation, internet,
            hardware, and security — operated end-to-end from the heart of the
            American grid.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/waitlist"
              className="font-mono text-xs uppercase tracking-widest border border-[#7CFFA8] px-5 py-3 hover-elevate"
              style={{ color: "#7CFFA8" }}
            >
              Join the Waitlist →
            </Link>
            <Link
              href="/services"
              className="font-mono text-xs uppercase tracking-widest border border-border px-5 py-3 hover-elevate text-foreground/80 hover:text-foreground"
            >
              Explore Services
            </Link>
          </div>
        </Reveal>
      </section>

      {/* SERVICES GRID */}
      <section className="pb-24">
        <Reveal>
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
                Services
              </div>
              <h2 className="font-display text-3xl md:text-4xl mt-2">
                Six verticals. One facility.
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden md:inline-flex font-mono text-xs uppercase tracking-widest text-foreground/60 hover:text-[#7CFFA8]"
            >
              View all →
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <ServiceCard service={s} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY DES MOINES TEASER */}
      <section className="pb-24">
        <Reveal>
          <div className="border border-border bg-card/40 backdrop-blur-sm p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
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
                    Among the most reliable power markets in North America, with growing
                    renewable capacity.
                  </p>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#7CFFA8]">02 / CLIMATE</div>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                    Cool winters and dry conditions reduce cooling overhead year-round.
                  </p>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#7CFFA8]">03 / FIBER</div>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                    Sitting on a major Midwest fiber backbone with multiple tier-1
                    carriers.
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

      {/* FINAL CTA */}
      <section className="pb-32">
        <Reveal>
          <div className="text-center py-20 border-t border-border/60">
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
