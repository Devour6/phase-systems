import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, getService, getServiceIndex } from "@/lib/services";
import { Reveal } from "@/components/site/reveal";
import { SplitHeading } from "@/components/site/split-heading";
import { SecNum } from "@/components/site/sec-num";
import { VIZ_BY_SLUG } from "@/components/site/viz";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} — Phase Systems`,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const idx = getServiceIndex(slug);
  const num = String(idx + 1).padStart(2, "0");
  const prev = SERVICES[(idx - 1 + SERVICES.length) % SERVICES.length];
  const next = SERVICES[(idx + 1) % SERVICES.length];
  const Viz = VIZ_BY_SLUG[slug];

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div id="hero-grid" className="hero-grid" aria-hidden />
        <div className="relative z-[2] mx-auto w-full max-w-6xl px-4 sm:px-6 pt-10 md:pt-16 pb-16 md:pb-24">
          <Reveal>
            <Link
              href="/#services"
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50 hover:text-[#7CFFA8]"
            >
              ← All services
            </Link>
          </Reveal>

          <div className="mt-10 grid md:grid-cols-12 gap-10 md:gap-12 items-center">
            <div className="md:col-span-7">
              <SecNum
                label={`${num} — ${service.title}`}
                className="mb-6"
              />
              <SplitHeading
                as="h1"
                className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight"
                delay={120}
                step={90}
              >
                {service.title}
              </SplitHeading>
              <Reveal delay={300}>
                <div
                  className="mt-5 font-mono text-[11px] uppercase tracking-[0.3em]"
                  style={{ color: "#7CFFA8" }}
                >
                  {service.tagline}
                </div>
              </Reveal>
              <Reveal delay={400}>
                <p className="mt-7 max-w-xl text-base md:text-lg text-foreground/70 leading-relaxed">
                  {service.hero}
                </p>
              </Reveal>
              <Reveal delay={520}>
                <div className="mt-9 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
                  <Link
                    href={`/waitlist?service=${service.slug}`}
                    className="font-mono text-xs uppercase tracking-widest border border-[#7CFFA8] px-5 py-3.5 hover-elevate text-center"
                    style={{ color: "#7CFFA8" }}
                  >
                    {service.cta} →
                  </Link>
                  <Link
                    href="/contact"
                    className="font-mono text-xs uppercase tracking-widest border border-border px-5 py-3.5 hover-elevate text-foreground/80 hover:text-foreground text-center"
                  >
                    Contact Sales
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* RIGHT — live viz */}
            <div className="md:col-span-5">
              <Reveal delay={300}>
                <div className="service-hero-viz">
                  {Viz ? <Viz /> : null}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-20 md:pb-24">
        <SecNum label="Capabilities" className="mb-3" />
        <SplitHeading
          as="h2"
          className="font-display text-3xl md:text-4xl mt-2"
        >
          What you get
        </SplitHeading>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {service.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <div className="border border-border bg-[var(--bg-1)] p-6 h-full hover-elevate group">
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/45 group-hover:text-[#7CFFA8] transition-colors"
                >
                  / {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-display text-lg md:text-xl mt-3">
                  {f.title}
                </div>
                <p className="text-sm text-foreground/65 mt-3 leading-relaxed">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-4xl px-4 sm:px-6 pb-20 md:pb-24">
        <SecNum label="FAQ" className="mb-3" />
        <SplitHeading
          as="h2"
          className="font-display text-3xl md:text-4xl mt-2"
        >
          Common questions
        </SplitHeading>
        <div className="mt-10 divide-y divide-border/60 border-y border-border/60">
          {service.faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="cursor-pointer flex items-center justify-between gap-4">
                <span className="font-display text-base md:text-lg">{item.q}</span>
                <span
                  className="font-mono text-[12px] tracking-widest text-foreground/50 group-open:text-[#7CFFA8] group-open:rotate-45 transition-all duration-200"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-foreground/65 leading-relaxed max-w-2xl normal-case">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* PREV / NEXT */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-16 md:pb-20">
        <div className="grid grid-cols-2 border-y border-border/60">
          <Link
            href={`/services/${prev.slug}`}
            className="group p-5 md:p-7 border-r border-border/60 hover:bg-[rgba(124,255,168,0.04)] transition-colors"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/45">
              ← Previous
            </div>
            <div className="mt-3 font-display text-lg md:text-2xl group-hover:text-[#7CFFA8] transition-colors">
              {prev.title}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/45 mt-1.5">
              {prev.tagline}
            </div>
          </Link>
          <Link
            href={`/services/${next.slug}`}
            className="group p-5 md:p-7 text-right hover:bg-[rgba(124,255,168,0.04)] transition-colors"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/45">
              Next →
            </div>
            <div className="mt-3 font-display text-lg md:text-2xl group-hover:text-[#7CFFA8] transition-colors">
              {next.title}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/45 mt-1.5">
              {next.tagline}
            </div>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-24 md:pb-32 text-center">
        <Reveal>
          <SplitHeading
            as="h3"
            className="font-display text-2xl sm:text-3xl md:text-4xl"
          >
            Ready to talk {service.title.toLowerCase()}?
          </SplitHeading>
          <p className="text-foreground/65 mt-4 max-w-xl mx-auto leading-relaxed">
            Get on the waitlist or reach out directly — we&apos;ll respond from
            Iowa, same day.
          </p>
          <div className="mt-9 flex justify-center gap-3 flex-wrap">
            <Link
              href={`/waitlist?service=${service.slug}`}
              className="font-mono text-xs uppercase tracking-widest border border-[#7CFFA8] px-5 py-3.5 hover-elevate"
              style={{ color: "#7CFFA8" }}
            >
              Join Waitlist →
            </Link>
            <Link
              href="/contact"
              className="font-mono text-xs uppercase tracking-widest border border-border px-5 py-3.5 hover-elevate text-foreground/80 hover:text-foreground"
            >
              Contact Sales
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
