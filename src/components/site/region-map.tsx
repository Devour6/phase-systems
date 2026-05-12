"use client";

/**
 * Region / latency map.
 * Abstracted radial diagram — DSM-01 at center, concentric latency rings,
 * Midwest cities as nodes, animated packets flowing inbound.
 * Honest representation: shows reach + position, no specific city-by-city
 * latency claims (numbers are illustrative ranges, clearly marked [DEMO]).
 */

interface City {
  name: string;
  // Angle in degrees (0 = east, 90 = south), radius in % of viz
  angle: number;
  radius: number;
}

const CITIES: City[] = [
  { name: "Minneapolis", angle: -70, radius: 38 },
  { name: "Madison", angle: -25, radius: 32 },
  { name: "Chicago", angle: 15, radius: 38 },
  { name: "St Louis", angle: 75, radius: 32 },
  { name: "Kansas City", angle: 135, radius: 25 },
  { name: "Omaha", angle: -160, radius: 22 },
];

const RINGS = [
  { r: 22, label: "15ms" },
  { r: 38, label: "25ms" },
  { r: 60, label: "50ms" },
  { r: 82, label: "100ms" },
];

function polar(angle: number, radius: number) {
  // angle in deg, radius in %, return {x, y} in 0–100 viewBox terms
  const rad = (angle * Math.PI) / 180;
  return {
    x: 50 + radius * 0.5 * Math.cos(rad),
    y: 50 + radius * 0.5 * Math.sin(rad),
  };
}

export function RegionMap() {
  return (
    <div className="region-map">
      <svg
        viewBox="0 0 100 100"
        className="region-map-svg"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <radialGradient id="rmFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7CFFA8" stopOpacity="0.10" />
            <stop offset="60%" stopColor="#7CFFA8" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#7CFFA8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="rmArc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7CFFA8" stopOpacity="0" />
            <stop offset="100%" stopColor="#7CFFA8" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Center glow */}
        <circle cx="50" cy="50" r="45" fill="url(#rmFade)" />

        {/* Crosshair grid */}
        <line x1="50" y1="2" x2="50" y2="98" className="rm-crosshair" />
        <line x1="2" y1="50" x2="98" y2="50" className="rm-crosshair" />

        {/* Latency rings */}
        {RINGS.map((ring) => (
          <g key={ring.r}>
            <circle cx="50" cy="50" r={ring.r * 0.5} className="rm-ring" />
            <text
              x="50"
              y={50 - ring.r * 0.5 - 1}
              className="rm-ring-label"
              textAnchor="middle"
            >
              {ring.label}
            </text>
          </g>
        ))}

        {/* Connection arcs DSM → cities, packets ride them */}
        {CITIES.map((city, i) => {
          const p = polar(city.angle, city.radius);
          return (
            <g key={city.name}>
              <line
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                className="rm-link"
              />
              {/* Animated packet */}
              <circle r="0.7" className="rm-packet" fill="#7CFFA8">
                <animateMotion
                  dur={`${2 + (i % 3) * 0.4}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.3}s`}
                  path={`M ${p.x} ${p.y} L 50 50`}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur={`${2 + (i % 3) * 0.4}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.3}s`}
                />
              </circle>
            </g>
          );
        })}

        {/* City nodes */}
        {CITIES.map((city) => {
          const p = polar(city.angle, city.radius);
          return (
            <g key={`${city.name}-node`}>
              <circle cx={p.x} cy={p.y} r="1.4" className="rm-city" />
              <text
                x={p.x}
                y={p.y - 3}
                className="rm-city-label"
                textAnchor="middle"
              >
                {city.name.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* DSM-01 center */}
        <g>
          <circle cx="50" cy="50" r="3.5" className="rm-dsm-outer" />
          <circle cx="50" cy="50" r="1.6" className="rm-dsm-inner" />
          <text x="50" y="60" className="rm-dsm-label" textAnchor="middle">
            DSM-01
          </text>
          <text x="50" y="64" className="rm-dsm-sub" textAnchor="middle">
            41.69°N · 93.60°W
          </text>
        </g>
      </svg>
    </div>
  );
}
