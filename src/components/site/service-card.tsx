import Link from "next/link";
import type { ServiceConfig } from "@/lib/services";
import { ArrowUpRight } from "lucide-react";

export function ServiceCard({ service }: { service: ServiceConfig }) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group hover-elevate block border border-border bg-card/40 p-5 backdrop-blur-sm"
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center border border-border/80"
          style={{ background: "rgba(124,255,168,0.06)" }}
        >
          <Icon size={18} style={{ color: "#7CFFA8" }} />
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
