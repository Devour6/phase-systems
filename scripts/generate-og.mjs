// Generate OG image (1200×630) for social embeds.
// Phase Systems logo + wordmark on dark background.

import sharp from "sharp";

const OUT = "public/og-image.jpg";
const W = 1200;
const H = 630;

// Resize transparent logo mark — composites cleanly over the gradient bg
const LOGO_SIZE = 240;
const logo = await sharp("public/logo-mark.png")
  .resize({ width: LOGO_SIZE, height: LOGO_SIZE, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();

// SVG composition
const svg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="aur" cx="20%" cy="40%" r="80%">
      <stop offset="0%" stop-color="#7CFFA8" stop-opacity="0.18"/>
      <stop offset="60%" stop-color="#7CFFA8" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#F3EED9" stroke-opacity="0.04" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#0F0E0C"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect width="100%" height="100%" fill="url(#aur)"/>

  <!-- Top eyebrow -->
  <text x="80" y="100" font-family="'Kode Mono', monospace" font-size="20" letter-spacing="6" fill="#F3EED9" fill-opacity="0.55">
    ◆  DES MOINES · IOWA
  </text>

  <!-- Wordmark (positioned right of logo composite) -->
  <text x="380" y="350" font-family="Audiowide, sans-serif" font-size="96" letter-spacing="4" fill="#F3EED9">PHASE</text>
  <text x="380" y="450" font-family="Audiowide, sans-serif" font-size="96" letter-spacing="4" fill="#7CFFA8">SYSTEMS</text>

  <!-- Tagline -->
  <text x="80" y="540" font-family="Outfit, sans-serif" font-size="26" fill="#F3EED9" fill-opacity="0.7">
    Built for the next generation of compute.
  </text>

  <!-- Bottom-right coordinates -->
  <text x="${W - 80}" y="${H - 40}" font-family="'Kode Mono', monospace" font-size="16" letter-spacing="3" fill="#F3EED9" fill-opacity="0.45" text-anchor="end">
    41.6867°N · 93.5988°W
  </text>

  <!-- Hairline frame -->
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none" stroke="#F3EED9" stroke-opacity="0.12" stroke-width="1"/>
</svg>
`);

await sharp(svg)
  .composite([
    { input: logo, top: 270, left: 100 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(OUT);

console.log("og generated:", OUT);
