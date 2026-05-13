import { ContactForm } from "./contact-form";
import { Reveal } from "@/components/site/reveal";
import { SplitHeading } from "@/components/site/split-heading";
import { SecNum } from "@/components/site/sec-num";
import { Glitch } from "@/components/site/glitch";

export const metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description:
    "Talk to Phase Systems sales. Iowa-based humans, same-day response.",
};

export default function ContactPage() {
  return (
    <div className="w-full">
      <section className="relative overflow-hidden">
        <div id="hero-grid" className="hero-grid" aria-hidden />
        <div className="relative z-[2] mx-auto w-full max-w-3xl px-4 sm:px-6 pt-12 md:pt-20 pb-16 md:pb-24">
          <SecNum label="// Contact" className="mb-6" />
          <SplitHeading
            as="h1"
            className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight"
            delay={120}
            step={90}
          >
            Talk to{" "}
            <Glitch className="text-[#7CFFA8] block sm:inline">
              sales.
            </Glitch>
          </SplitHeading>
          <Reveal delay={400}>
            <p className="mt-7 text-base md:text-lg text-foreground/70 leading-relaxed max-w-xl">
              Iowa-based humans. Same-day response on weekdays. Tell us what
              you&apos;re building and we&apos;ll send back something useful —
              not a form letter.
            </p>
          </Reveal>

          <Reveal delay={460}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">
              <span className="inline-flex items-center gap-2">
                <span className="led led-pulse" style={{ width: 4, height: 4 }} />
                Response · Same-day
              </span>
              <span>Hours · Mon-Fri · CT</span>
              <span>41.6867°N · 93.5988°W</span>
            </div>
          </Reveal>

          <Reveal delay={520}>
            <div className="form-surface mt-8 p-6 md:p-8">
              <span className="corner-tl" aria-hidden />
              <span className="corner-br" aria-hidden />
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
