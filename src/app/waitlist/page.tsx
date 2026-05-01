import { Suspense } from "react";
import { WaitlistForm } from "./waitlist-form";
import { Reveal } from "@/components/site/reveal";

export const metadata = {
  title: "Waitlist — Phase Systems",
  description:
    "Get on the waitlist for Phase Systems services. Be first when we light up your vertical.",
};

export default function WaitlistPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 pt-20 pb-24">
      <Reveal>
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
          Waitlist
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="font-display text-4xl md:text-5xl mt-3 leading-[1.05]">
          Be first <span style={{ color: "#7CFFA8" }}>in line</span>.
        </h1>
      </Reveal>
      <Reveal delay={160}>
        <p className="mt-6 text-foreground/75 leading-relaxed">
          We&apos;re bringing services online one vertical at a time. Drop your
          email and tell us what you&apos;re after — we&apos;ll reach out the
          moment your slice is ready.
        </p>
      </Reveal>

      <Reveal delay={240}>
        <div className="mt-10 border border-border bg-card/40 backdrop-blur-sm p-6 md:p-8">
          <Suspense fallback={null}>
            <WaitlistForm />
          </Suspense>
        </div>
      </Reveal>
    </div>
  );
}
