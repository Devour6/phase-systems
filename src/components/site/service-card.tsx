import Link from "next/link";
import type { ServiceConfig } from "@/lib/services";
import { ArrowUpRight } from "lucide-react";

export function ServiceCard({
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
      className="group hover-elevate block border border-border bg-card/40 p-5 backdrop-blur-sm"
    >
      <div className="flex items-start justify-between">
        <div
          className="font-mono text-[11px] tracking-[0.3em]"
          style={{ color: "#7CFFA8" }}
        >
          {num}
        </div>
        <ArrowUpRight
          size={16}
          className="text-foreground/40 group-hover:text-[#7CFFA8] transition-colors"
        />
      </div>
      <div className="mt-5">
        <div className="font-display text-lg leading-tight">{service.title}</div>
        <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/50 mt-1">
          {service.tagline}
        </div>
        <p className="text-sm text-foreground/70 mt-3 leading-relaxed">
          {service.description}
        </p>
      </div>
    </Link>
  );
}
