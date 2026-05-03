// Process the rack photo: keep portrait orientation, crop tight, color grade.
// Output: public/rack.jpg (1200px wide, 4:5 portrait)
//
// Pipeline:
//  1. NO rotation — racks are vertical
//  2. Crop to 4:5 portrait, centered (trim distracting floor/ceiling)
//  3. Color grade: cool temp, desaturate noise, push greens toward #7CFFA8, crush blacks
//  4. Subtle vignette + left-edge fade-to-bg
//  5. Mint tint overlay (very subtle)
//  6. Export 1200px wide JPG q82
//
// Re-run any time: `node scripts/process-rack.mjs`

import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const SRC = "public/rack-original.jpg";
const OUT = "public/rack.jpg";
const TARGET_W = 1200;
const TARGET_RATIO = 4 / 5; // portrait

mkdirSync(dirname(OUT), { recursive: true });

const meta = await sharp(SRC).metadata();
console.log("source", meta.width, "x", meta.height);

const srcW = meta.width;
const srcH = meta.height;

// Crop to 4:5 portrait, centered
const cropW = srcW;
const cropH = Math.round(srcW / TARGET_RATIO);
const safeCropH = Math.min(cropH, Math.round(srcH * 0.92));
const cropY = Math.round((srcH - safeCropH) / 2);

// Compute actual output height from the crop ratio (not from TARGET_RATIO,
// because safeCropH may be capped to 92% of source height).
const outH = Math.round((TARGET_W * safeCropH) / cropW);

const vignetteSvg = Buffer.from(`
<svg width="${TARGET_W}" height="${outH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="v" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="60%" stop-color="#000" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#0F0E0C" stop-opacity="0.7"/>
    </radialGradient>
    <linearGradient id="leftFade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0F0E0C" stop-opacity="0.85"/>
      <stop offset="35%" stop-color="#0F0E0C" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="bottomFade" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#0F0E0C" stop-opacity="0.6"/>
      <stop offset="30%" stop-color="#0F0E0C" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#v)"/>
  <rect width="100%" height="100%" fill="url(#leftFade)"/>
  <rect width="100%" height="100%" fill="url(#bottomFade)"/>
</svg>
`);

const mintTint = Buffer.from(`
<svg width="${TARGET_W}" height="${outH}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#7CFFA8" fill-opacity="0.035"/>
</svg>
`);

// Stage 1: auto-orient from EXIF, extract, resize, color grade -> buffer
const graded = await sharp(SRC)
  .rotate() // honor EXIF orientation
  .extract({ left: 0, top: cropY, width: cropW, height: safeCropH })
  .resize({ width: TARGET_W })
  .modulate({
    brightness: 0.9,
    saturation: 0.55,
    hue: -8,
  })
  .linear(1.08, -14)
  .toBuffer();

// Stage 2: composite overlays at the resized dimensions
await sharp(graded)
  .composite([
    { input: vignetteSvg, blend: "over" },
    { input: mintTint, blend: "over" },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(OUT);

const out = await sharp(OUT).metadata();
console.log("output", out.width, "x", out.height, "→", OUT);
