# Phase Systems

Marketing site for **Phase Systems** — Phase Labs' data center vertical based in Des Moines, Iowa.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind v4 + shadcn/ui
- `@vercel/kv` for waitlist + contact storage

## Brand

- Fonts: **Audiowide** (display), **Outfit** (body), **Kode Mono** (monospace)
- Background: `#0F0E0C` · Foreground: `#F3EED9`
- **Primary accent: `#7CFFA8` (Phase Systems mint-green)**
- Secondary accent: `#FCE184` (Phase gold)

## Develop

```bash
npm install
npm run dev
```

## Deploy

Auto-deploys to Vercel on push to `main`.

Set `KV_*` env vars from Vercel KV integration before going live.
