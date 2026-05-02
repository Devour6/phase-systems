import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display tracking-wider">PHASE</span>
            <span className="font-display tracking-wider" style={{ color: "#7CFFA8" }}>
              SYSTEMS
            </span>
          </div>
          <p className="mt-3 text-sm text-foreground/60 max-w-sm">
            Phase Systems is the data center vertical of Phase. Built in Des Moines, Iowa
            for the next generation of compute.
          </p>
        </div>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/50 mb-3">
            Services
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services/virtualization" className="hover:text-[#7CFFA8]">Virtualization</Link></li>
            <li><Link href="/services/colocation" className="hover:text-[#7CFFA8]">Colocation</Link></li>
            <li><Link href="/services/internet" className="hover:text-[#7CFFA8]">Internet</Link></li>
            <li><Link href="/services/hardware" className="hover:text-[#7CFFA8]">Hardware</Link></li>
            <li><Link href="/services/cybersecurity" className="hover:text-[#7CFFA8]">Cybersecurity</Link></li>
            <li><Link href="/services/physical-security" className="hover:text-[#7CFFA8]">Physical Security</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/50 mb-3">
            Company
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-[#7CFFA8]">About</Link></li>
            <li><Link href="/waitlist" className="hover:text-[#7CFFA8]">Waitlist</Link></li>
            <li><Link href="/contact" className="hover:text-[#7CFFA8]">Contact</Link></li>
            <li>
              <a
                href="https://phase.cc"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#7CFFA8]"
              >
                Phase ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto w-full max-w-6xl px-6 py-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-foreground/50">
          <span>© {new Date().getFullYear()} Phase Systems</span>
          <span>Des Moines · Iowa · 41.5868° N, 93.6250° W</span>
        </div>
      </div>
    </footer>
  );
}
