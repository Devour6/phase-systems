import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, getService } from "@/lib/services";
import { Reveal } from "@/components/site/reveal";

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

  const Icon = service.icon;

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pt-20 pb-24">
      <Reveal>
        <Link
          href="/services"
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50 hover:text-[#7CFFA8]"
        >
          ← All services
        </Link>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-8 flex items-start gap-5">
          <div
            className="flex h-12 w-12 items-center justify-center border border-border/80 shrink-0"
            style={{ background: "rgba(124,255,168,0.08)" }}
          >
            <Icon size={22} style={{ color: "#7CFFA8" }} />
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
              {service.tagline}
            </div>
            <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mt-2">
              {service.title}
            </h1>
          </div>
        </div>
      </Reveal>

      <Reveal delay={160}>
        <p className="mt-8 max-w-2xl text-lg text-foreground/75 leading-relaxed">
          {service.hero}
        </p>
      </Reveal>

      <Reveal delay={220}>
        <div className="mt-10">
          <Link
            href={`/waitlist?service=${service.slug}`}
            className="font-mono text-xs uppercase tracking-widest border border-[#7CFFA8] px-5 py-3 hover-elevate inline-block"
            style={{ color: "#7CFFA8" }}
          >
            {service.cta} →
          </Link>
        </div>
      </Reveal>

      {/* FEATURES */}
      <section className="mt-20">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
            Capabilities
          </div>
          <h2 className="font-display text-2xl md:text-3xl mt-3">What you get</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {service.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 50}>
              <div className="border border-border bg-card/40 backdrop-blur-sm p-5">
                <div className="font-display text-lg">{f.title}</div>
                <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-20">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
            FAQ
          </div>
          <h2 className="font-display text-2xl md:text-3xl mt-3">Common questions</h2>
        </Reveal>
        <div className="mt-8 divide-y divide-border/60 border-y border-border/60">
          {service.faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="cursor-pointer flex items-center justify-between">
                <span className="font-display text-base md:text-lg">{item.q}</span>
                <span
                  className="font-mono text-[11px] tracking-widest text-foreground/50 group-open:text-[#7CFFA8] transition-colors"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed max-w-2xl">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* PRICING SHELL — Phase 3 */}
      {/* TODO Phase 3: <ServicePricingTiers slug={service.slug} /> */}

      {/* CTA */}
      <section className="mt-20 border-t border-border/60 pt-16 text-center">
        <Reveal>
          <h3 className="font-display text-2xl md:text-4xl">
            Ready to talk {service.title.toLowerCase()}?
          </h3>
          <p className="text-foreground/70 mt-3 max-w-xl mx-auto">
            Get on the waitlist or reach out directly — we&apos;ll respond from Iowa,
            same day.
          </p>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Link
              href={`/waitlist?service=${service.slug}`}
              className="font-mono text-xs uppercase tracking-widest border border-[#7CFFA8] px-5 py-3 hover-elevate"
              style={{ color: "#7CFFA8" }}
            >
              Join Waitlist →
            </Link>
            <Link
              href="/contact"
              className="font-mono text-xs uppercase tracking-widest border border-border px-5 py-3 hover-elevate text-foreground/80"
            >
              Contact Sales
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
