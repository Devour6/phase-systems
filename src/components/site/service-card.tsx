import Link from "next/link";
import type { ServiceConfig } from "@/lib/services";
import { VIZ_MAP } from "@/components/site/viz";

export function ServiceCard({
  service,
  index,
}: {
  service: ServiceConfig;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  const Viz = VIZ_MAP[service.slug];
  return (
    <Link
      href={`/services/${service.slug}`}
      className="service service-in group"
      style={{ animationDelay: `${100 + index * 80}ms` }}
    >
      <div className="svc-num inline-flex items-center gap-2">
        <span className="led led-pulse" />
        / {num} · {service.tagline}
      </div>
      <div className="svc-name">{service.title}</div>
      <p className="svc-desc">{service.description}</p>
      <div className="svc-viz">{Viz ? <Viz /> : null}</div>
      <div className="svc-cta">
        <span>{service.cta}</span>
        <span className="svc-cta-arrow">→</span>
      </div>
    </Link>
  );
}
