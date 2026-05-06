// Generate favicon + apple-touch-icon from the Phase Systems logo.

import sharp from "sharp";
import { writeFileSync } from "node:fs";

const SRC = "public/phase-systems-logo-original.png";

// Trim the dark padding around the logo to get a tight crop
const trimmed = await sharp(SRC).trim({ threshold: 25 }).toBuffer();

// icon.png — 512x512, transparent bg if possible (logo on dark square)
await sharp(trimmed)
  .resize({ width: 460, height: 460, fit: "contain", background: { r: 15, g: 14, b: 12, alpha: 1 } })
  .extend({ top: 26, bottom: 26, left: 26, right: 26, background: { r: 15, g: 14, b: 12, alpha: 1 } })
  .png()
  .toFile("src/app/icon.png");

// apple-icon.png — 180x180
await sharp(trimmed)
  .resize({ width: 160, height: 160, fit: "contain", background: { r: 15, g: 14, b: 12, alpha: 1 } })
  .extend({ top: 10, bottom: 10, left: 10, right: 10, background: { r: 15, g: 14, b: 12, alpha: 1 } })
  .png()
  .toFile("src/app/apple-icon.png");

// favicon.ico — 32x32 PNG renamed (Next.js accepts PNG with .ico extension via metadata routes)
const favBuf = await sharp(trimmed)
  .resize({ width: 32, height: 32, fit: "contain", background: { r: 15, g: 14, b: 12, alpha: 1 } })
  .png()
  .toBuffer();
writeFileSync("src/app/favicon.ico", favBuf);

console.log("icons generated");
