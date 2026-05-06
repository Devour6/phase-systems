// Generate favicon + apple-touch-icon from the transparent Phase Systems logo mark.
// Source: public/logo-mark.png (transparent bg, mint mark only)
// Uses transparent backgrounds so the mark looks clean in browser tabs / iOS home screens.

import sharp from "sharp";
import { writeFileSync } from "node:fs";

const SRC = "public/logo-mark.png";

// Trim transparent padding to a tight bbox
const trimmed = await sharp(SRC).trim().toBuffer();

// icon.png — 512x512, transparent
await sharp(trimmed)
  .resize({ width: 460, height: 460, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({ top: 26, bottom: 26, left: 26, right: 26, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile("src/app/icon.png");

// apple-icon.png — 180x180, dark bg (iOS forces opaque on home screen)
await sharp(trimmed)
  .resize({ width: 140, height: 140, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({ top: 20, bottom: 20, left: 20, right: 20, background: { r: 15, g: 14, b: 12, alpha: 1 } })
  .png()
  .toFile("src/app/apple-icon.png");

// favicon.ico — 32x32 transparent PNG (Next.js metadata routes accept PNG bytes here)
const favBuf = await sharp(trimmed)
  .resize({ width: 32, height: 32, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
writeFileSync("src/app/favicon.ico", favBuf);

console.log("icons generated (transparent)");
