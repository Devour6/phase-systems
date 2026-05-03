// Process the rack photo: rotate, crop, color grade toward Phase Systems brand.
// Output: public/rack.jpg (2400px wide, 21:9-ish)
//
// Pipeline:
//  1. Rotate 90° CCW so racks read horizontally
//  2. Crop to a wide cinematic aspect (21:9)
//  3. Color grade: cool temp, lift greens toward #7CFFA8, crush reds/blues, deepen blacks
//  4. Subtle vignette via radial gradient overlay
//  5. Light grain overlay
//  6. Export 2400px wide JPG q82
//
// Re-run any time: `node scripts/process-rack.mjs`

import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const SRC = "public/rack-original.jpg";
const OUT = "public/rack.jpg";
const TARGET_W = 2400;
const TARGET_RATIO = 21 / 9; // ~2.33

mkdirSync(dirname(OUT), { recursive: true });

const meta = await sharp(SRC).metadata();
console.log("source", meta.width, "x", meta.height);

// After 90° CCW rotation, dimensions swap: 4032 wide × 3024 tall
const rotatedW = meta.height; // 4032
const rotatedH = meta.width; // 3024

// Crop to 21:9 from the rotated image
const cropH = Math.round(rotatedW / TARGET_RATIO); // ~1728
const cropY = Math.round((rotatedH - cropH) / 2); // center vertically

// Build a vignette overlay (radial dark falloff)
const vignetteSvg = Buffer.from(`
<svg width="${TARGET_W}" height="${Math.round(TARGET_W / TARGET_RATIO)}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="v" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="60%" stop-color="#000" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#0F0E0C" stop-opacity="0.85"/>
    </radialGradient>
    <linearGradient id="b" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#0F0E0C" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#0F0E0C" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#v)"/>
  <rect width="100%" height="100%" fill="url(#b)"/>
</svg>
`);

// Mint tint overlay (very subtle)
const mintTint = Buffer.from(`
<svg width="${TARGET_W}" height="${Math.round(TARGET_W / TARGET_RATIO)}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#7CFFA8" fill-opacity="0.04"/>
</svg>
`);

await sharp(SRC)
  .rotate(-90) // 90° CCW
  .extract({ left: 0, top: cropY, width: rotatedW, height: cropH })
  .resize({ width: TARGET_W })
  // Color grade — modulate brightness/saturation/hue, then channel tweaks
  .modulate({
    brightness: 0.92,
    saturation: 0.55, // desaturate the noise
    hue: -8, // shift toward green/cyan
  })
  // Cool the whites a touch + deepen blacks via linear (slope/offset)
  .linear(1.08, -14) // slight contrast boost, blacks down
  // Composite vignette + mint tint
  .composite([
    { input: vignetteSvg, blend: "over" },
    { input: mintTint, blend: "over" },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(OUT);

const out = await sharp(OUT).metadata();
console.log("output", out.width, "x", out.height, "→", OUT);
