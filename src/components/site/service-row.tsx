import Link from "next/link";
import type { ServiceConfig } from "@/lib/services";

export function ServiceRow({
  service,
  index,
}: {
  service: ServiceConfig;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <Link
      href={`/services/${service.slug}`}
      className="service-row group relative grid grid-cols-[36px_minmax(0,1fr)_20px] md:grid-cols-[44px_minmax(0,200px)_minmax(0,1fr)_24px] items-center gap-x-4 md:gap-x-6 px-2 py-5 md:py-6 border-t border-border/60 last:border-b transition-colors"
    >
      {/* left rule accent */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"
        style={{ background: "#7CFFA8" }}
      />

      {/* index */}
      <span
        className="font-mono text-[11px] tracking-[0.3em] text-foreground/50 group-hover:text-[#7CFFA8] transition-colors"
      >
        {num}
      </span>

      {/* title + tagline */}
      <div className="min-w-0">
        <div className="font-display text-lg sm:text-xl md:text-2xl leading-tight">
          {service.title}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45 mt-1.5 md:mt-2 truncate">
          {service.tagline}
        </div>
      </div>

      {/* description — desktop only */}
      <p className="hidden md:block text-sm text-foreground/65 leading-relaxed truncate">
        {service.description}
      </p>

      {/* arrow */}
      <span
        aria-hidden
        className="font-mono text-base text-foreground/40 group-hover:text-[#7CFFA8] group-hover:translate-x-1 transition-all justify-self-end"
      >
        →
      </span>
    </Link>
  );
}
