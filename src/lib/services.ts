import {
  Server,
  Globe,
  Cable,
  Cpu,
  ShieldCheck,
  Camera,
  type LucideIcon,
} from "lucide-react";

export interface ServiceConfig {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  hero: string;
  features: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  cta: string;
}

export const SERVICES: ServiceConfig[] = [
  {
    slug: "virtualization",
    title: "Virtualization",
    tagline: "Cloud compute & dedicated servers",
    description:
      "On-demand virtual machines and dedicated bare metal, provisioned in our Des Moines facility.",
    icon: Server,
    hero:
      "Spin up compute in seconds or order dedicated bare metal tuned for your workload. KVM-backed VMs, NVMe storage, and 10G uplinks as standard.",
    features: [
      { title: "VMs on demand", body: "KVM virtualization with NVMe-backed storage and snapshot support." },
      { title: "Bare metal", body: "Dedicated single-tenant hardware, configurable from inventory or custom built." },
      { title: "10G networking", body: "Every node lands on a 10G fabric with redundant uplinks." },
      { title: "API + portal", body: "REST API and web console — provision, scale, and monitor your fleet." },
    ],
    faq: [
      { q: "What hypervisor do you run?", a: "KVM. We avoid licensed hypervisors so we can keep pricing transparent." },
      { q: "Can I bring my own image?", a: "Yes — qcow2 and raw images supported on dedicated tiers." },
    ],
    cta: "Join the virtualization waitlist",
  },
  {
    slug: "internet",
    title: "Internet",
    tagline: "ISP & dedicated transit",
    description:
      "Carrier-grade IP transit and dedicated internet access for businesses across central Iowa.",
    icon: Globe,
    hero:
      "Multi-homed transit, BGP support, IPv4 + IPv6, and SLA-backed dedicated internet for businesses that can't tolerate downtime.",
    features: [
      { title: "Dedicated transit", body: "Symmetric, unmetered DIA from 1G to 100G." },
      { title: "BGP & IPv6", body: "Full table BGP, your ASN or ours, native IPv6 throughout." },
      { title: "Multi-homed upstreams", body: "Diverse fiber paths and tier-1 carriers for resilience." },
      { title: "Local presence", body: "Iowa-based NOC, Iowa-based humans answering the phone." },
    ],
    faq: [
      { q: "Do you offer last-mile fiber?", a: "Yes, in select Des Moines metro zones. Contact us for a service check." },
      { q: "What's the smallest commit?", a: "1 Gbps DIA on a 1-year term." },
    ],
    cta: "Request a service check",
  },
  {
    slug: "colocation",
    title: "Colocation",
    tagline: "Rack space, cross-connects, power",
    description:
      "1U through full cabinet and cage colocation with metered or fixed power, redundant cooling, and direct cross-connects.",
    icon: Cable,
    hero:
      "Quarter, half, full, and multi-cabinet deployments with redundant power, N+1 cooling, and a meet-me room with direct access to multiple carriers.",
    features: [
      { title: "Power tiers", body: "Standard 120V/30A through high-density 208V/60A circuits." },
      { title: "Cross-connects", body: "Fiber and copper cross-connects to carriers and customers in our MMR." },
      { title: "Remote hands", body: "On-site engineers available 24/7 for tasks billed by the quarter-hour." },
      { title: "Compliance-ready", body: "Facility designed against SOC 2 and PCI standards." },
    ],
    faq: [
      { q: "What's your power redundancy?", a: "2N UPS with N+1 generator backup." },
      { q: "Can I run my own cooling for high-density?", a: "Yes — we support rear-door heat exchangers up to 35kW per rack." },
    ],
    cta: "Reserve rack space",
  },
  {
    slug: "hardware",
    title: "Hardware",
    tagline: "Repair, sourcing & custom builds",
    description:
      "Server hardware procurement, repair, and custom-built systems for compute-heavy workloads.",
    icon: Cpu,
    hero:
      "Need a 4U GPU box yesterday? We source, build, test, and rack it. We also fix what you already have — board-level repair on enterprise gear.",
    features: [
      { title: "Custom builds", body: "GPU boxes, storage servers, and edge nodes built to your spec." },
      { title: "Board-level repair", body: "We fix what others throw out — capacitor, BMC, and PSU repair." },
      { title: "Sourcing", body: "New and refurbished enterprise gear from trusted channels." },
      { title: "Burn-in & QA", body: "Every build runs 72hr burn-in before it ships or racks." },
    ],
    faq: [
      { q: "Do you offer warranties on refurbished gear?", a: "Yes — 90 day standard, 1 year extended available." },
      { q: "Can you build for ML/AI workloads?", a: "Yes — H100, L40S, and consumer-tier GPU boxes are routine builds." },
    ],
    cta: "Request a build quote",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Network security & monitoring",
    description:
      "Managed firewall, 24/7 monitoring, and incident response from an Iowa-based SOC.",
    icon: ShieldCheck,
    hero:
      "Managed firewalls, IDS/IPS, log aggregation, and a real human on call. We watch the alerts so you don't have to.",
    features: [
      { title: "Managed firewall", body: "Tuned per environment, change-controlled, and audited." },
      { title: "24/7 monitoring", body: "SIEM-driven detection with playbooks for common threats." },
      { title: "Incident response", body: "On-call IR team with 1-hour response SLA on critical events." },
      { title: "Compliance support", body: "Evidence collection and reporting for SOC 2, HIPAA, PCI." },
    ],
    faq: [
      { q: "Do you offer pen testing?", a: "Yes — internal and external network testing on annual or quarterly cadence." },
      { q: "Where do logs live?", a: "In our Iowa facility, retained per your compliance requirements." },
    ],
    cta: "Talk to security",
  },
  {
    slug: "physical-security",
    title: "Physical Security",
    tagline: "Access control & surveillance",
    description:
      "Designed, installed, and monitored on-site security systems for facilities that matter.",
    icon: Camera,
    hero:
      "Card and biometric access, IP camera systems, and 24/7 monitored alarm response — designed and installed end-to-end.",
    features: [
      { title: "Access control", body: "Card, mobile, and biometric readers with audit trails." },
      { title: "Camera systems", body: "IP cameras with on-prem or cloud retention options." },
      { title: "Monitored alarms", body: "UL-listed central station monitoring with police dispatch." },
      { title: "Site assessments", body: "Vulnerability walks for new and existing facilities." },
    ],
    faq: [
      { q: "Do you support legacy panels?", a: "Yes — we integrate with most major access control platforms." },
      { q: "Can footage stay on-site?", a: "Yes — on-prem NVR options with optional encrypted off-site backup." },
    ],
    cta: "Schedule a site walk",
  },
];

export function getService(slug: string): ServiceConfig | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
