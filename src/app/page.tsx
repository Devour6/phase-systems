import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/lib/services";
import { ServiceRow } from "@/components/site/service-row";
import { Reveal } from "@/components/site/reveal";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      {/* HERO */}
      <section className="pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
          {/* LEFT: copy */}
          <div className="md:col-span-7">
            <Reveal>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/60 mb-6">
                <span style={{ color: "#7CFFA8" }}>◆</span>{"  "}
                Des Moines · Iowa
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-wide">
                PHASE
                <br />
                <span style={{ color: "#7CFFA8" }}>SYSTEMS</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-xl text-lg md:text-xl text-foreground/75 leading-relaxed">
                Built for the next generation of compute. Cloud, colocation,
                internet, hardware, and security — operated end-to-end from the
                heart of the American grid.
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
                <a
                  href="#services"
                  className="font-mono text-xs uppercase tracking-widest border border-border px-5 py-3 hover-elevate text-foreground/80 hover:text-foreground"
                >
                  Explore Services
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: rack photo */}
          <div className="md:col-span-5">
            <Reveal delay={200}>
              <figure className="relative">
                <div className="relative border border-border/80 overflow-hidden bg-background">
                  <Image
                    src="/rack.jpg"
                    alt="Phase Systems server rack — Des Moines, Iowa"
                    width={1200}
                    height={1472}
                    priority
                    className="block w-full h-auto"
                  />
                  {/* corner crosshairs */}
                  <span aria-hidden className="pointer-events-none absolute top-2 left-2 w-3 h-3 border-t border-l border-[#7CFFA8]/70" />
                  <span aria-hidden className="pointer-events-none absolute top-2 right-2 w-3 h-3 border-t border-r border-[#7CFFA8]/70" />
                  <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#7CFFA8]/70" />
                  <span aria-hidden className="pointer-events-none absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#7CFFA8]/70" />
                </div>
                <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                  <span>◆ On-site</span>
                  <span>41.5868°N · 93.6250°W</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES — directory listing */}
      <section id="services" className="pb-24 scroll-mt-20">
        <Reveal>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
                Services · 06
              </div>
              <h2 className="font-display text-3xl md:text-4xl mt-3">
                Six verticals. One facility.
              </h2>
              <p className="mt-3 max-w-xl text-sm md:text-base text-foreground/65 leading-relaxed">
                A single, vertically-integrated stack. Pick the slice you need
                — or take the whole rack.
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
      <section className="pb-24">
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
