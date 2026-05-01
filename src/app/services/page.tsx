import { SERVICES } from "@/lib/services";
import { ServiceCard } from "@/components/site/service-card";
import { Reveal } from "@/components/site/reveal";

export const metadata = {
  title: "Services — Phase Systems",
  description:
    "Six verticals, one facility. Virtualization, internet, colocation, hardware, cybersecurity, physical security.",
};

export default function ServicesIndex() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pt-20 pb-24">
      <Reveal>
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
          Services
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="font-display text-4xl md:text-6xl mt-3 leading-[1.05]">
          Six verticals.
          <br />
          <span style={{ color: "#7CFFA8" }}>One facility.</span>
        </h1>
      </Reveal>
      <Reveal delay={160}>
        <p className="mt-6 max-w-2xl text-foreground/70 leading-relaxed">
          Phase Systems operates a single, vertically-integrated stack out of Des
          Moines, Iowa. Pick the slice you need — or take the whole plate.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map((s, i) => (
          <Reveal key={s.slug} delay={i * 60}>
            <ServiceCard service={s} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
