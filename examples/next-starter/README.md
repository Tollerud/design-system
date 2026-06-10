# Tollerud UI — Next.js starter

Minimal **Next.js 16 + Tailwind v4** app wired for `@tollerud/ui`. Copy this folder into a new project or use it as a reference when bootstrapping.

> **CI tarball smoke test** lives in [`fixtures/consumer/`](../../fixtures/consumer/) — do not use that path for new apps.

## Quick start

```bash
cd examples/next-starter
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's included

| File | Purpose |
|------|---------|
| `app/globals.css` | `@tollerud/ui/globals.css` + `source.css` |
| `app/layout.tsx` | Dark page shell + `<Toaster />` |
| `app/page.tsx` | Sample components (Server Component + client boundaries) |
| `postcss.config.mjs` | Tailwind v4 PostCSS |
| `next.config.mjs` | Static export–ready defaults |

## Production build

```bash
npm run build
```

## Docs

- [GETTING_STARTED.md](https://github.com/Tollerud/ui/blob/main/GETTING_STARTED.md) — full install and Tailwind setup
- [design.tollerud.dev](https://design.tollerud.dev/) — live component reference
