import { ContactForm } from "./contact-form";
import { Reveal } from "@/components/site/reveal";

export const metadata = {
  title: "Contact — Phase Systems",
  description:
    "Talk to Phase Systems sales. Iowa-based humans, same-day response.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 pt-20 pb-24">
      <Reveal>
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
          Contact
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="font-display text-4xl md:text-5xl mt-3 leading-[1.05]">
          Talk to <span style={{ color: "#7CFFA8" }}>sales</span>.
        </h1>
      </Reveal>
      <Reveal delay={160}>
        <p className="mt-6 text-foreground/75 leading-relaxed">
          Iowa-based humans. Same-day response on weekdays. Tell us what
          you&apos;re building and we&apos;ll send back something useful — not a
          form letter.
        </p>
      </Reveal>

      <Reveal delay={240}>
        <div className="mt-10 border border-border bg-card/40 backdrop-blur-sm p-6 md:p-8">
          <ContactForm />
        </div>
      </Reveal>
    </div>
  );
}
