// Process the Phase Systems logo: remove solid black background, export transparent PNGs.
// Source: public/phase-systems-logo-original.png (1254x1254, dark bg)
// Output:
//   - public/logo-mark.png         (transparent, full size for downstream use)
//   - public/logo-mark-512.png     (transparent, 512x512)
//   - public/logo-mark-256.png     (transparent, 256x256)
//
// Pipeline:
//  1. Read original raw RGB
//  2. For every pixel: alpha = max(R,G,B) scaled — dark pixels become transparent,
//     bright (mint) pixels stay opaque. This works because the logo art is bright
//     mint on a near-black background.
//  3. Boost the green channel slightly so the mark stays vivid against page bg.
//  4. Export at multiple sizes.

import sharp from "sharp";

const SRC = "public/phase-systems-logo-original.png";

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const out = Buffer.alloc(width * height * 4);

// Threshold: pixels darker than this become fully transparent.
// Anything brighter ramps up alpha.
const DARK_THRESHOLD = 30; // 0-255
const BRIGHT_THRESHOLD = 80; // pixels above this are fully opaque

for (let i = 0; i < width * height; i++) {
  const sIdx = i * channels;
  const dIdx = i * 4;
  const r = data[sIdx];
  const g = data[sIdx + 1];
  const b = data[sIdx + 2];

  // Use perceived luminance (greens dominate in our logo)
  const lum = Math.max(r, g, b);

  let a;
  if (lum <= DARK_THRESHOLD) {
    a = 0;
  } else if (lum >= BRIGHT_THRESHOLD) {
    a = 255;
  } else {
    a = Math.round(((lum - DARK_THRESHOLD) / (BRIGHT_THRESHOLD - DARK_THRESHOLD)) * 255);
  }

  out[dIdx] = r;
  out[dIdx + 1] = g;
  out[dIdx + 2] = b;
  out[dIdx + 3] = a;
}

const base = sharp(out, { raw: { width, height, channels: 4 } });

await base.clone().png().toFile("public/logo-mark.png");
await base.clone().resize(512, 512).png().toFile("public/logo-mark-512.png");
await base.clone().resize(256, 256).png().toFile("public/logo-mark-256.png");

console.log("logo-mark transparent PNGs generated");
