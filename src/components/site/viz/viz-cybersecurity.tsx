"use client";

// Radar sweep with 3 blips + 4 cert badges.

export function VizCybersecurity() {
  return (
    <div className="radar-wrap">
      <svg className="radar-svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(124,255,168,0)" />
            <stop offset="100%" stopColor="rgba(124,255,168,0.55)" />
          </linearGradient>
        </defs>
        {/* rings */}
        <circle className="radar-ring" cx="50" cy="50" r="48" />
        <circle className="radar-ring" cx="50" cy="50" r="36" />
        <circle className="radar-ring" cx="50" cy="50" r="24" />
        <circle className="radar-ring" cx="50" cy="50" r="12" />
        {/* crosshair */}
        <line className="radar-crosshair" x1="50" y1="2" x2="50" y2="98" />
        <line className="radar-crosshair" x1="2" y1="50" x2="98" y2="50" />
        {/* sweep wedge */}
        <g className="radar-sweep">
          <path
            d="M 50 50 L 50 2 A 48 48 0 0 1 95 35 Z"
            fill="url(#sweepGrad)"
            opacity="0.5"
          />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="2"
            stroke="#7CFFA8"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
        </g>
        {/* blips */}
        <circle className="radar-blip" cx="68" cy="32" r="1.8" />
        <circle className="radar-blip b2" cx="28" cy="60" r="1.6" />
        <circle className="radar-blip b3" cx="62" cy="74" r="1.8" />
        {/* center node */}
        <circle cx="50" cy="50" r="1.6" fill="#7CFFA8" />
      </svg>

      <div className="cert-grid">
        <div className="cert-badge in">SOC 2</div>
        <div className="cert-badge in">PCI DSS</div>
        <div className="cert-badge in">HIPAA</div>
        <div className="cert-badge in">ISO 27001</div>
      </div>
    </div>
  );
}
