# Getting Started

## Install

### Full design system

Copy-paste — installs `@tollerud/ui` and all required peers:

```bash
npm install @tollerud/ui clsx tailwind-merge tailwindcss@4 \
  @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-progress \
  @radix-ui/react-slot @radix-ui/react-tabs @radix-ui/react-tooltip \
  lucide-react framer-motion sonner
```

As of **v2.0.0**, Radix, Lucide, Framer Motion, and Sonner are **required peer dependencies**.

`@paper-design/shaders-react` is an **optional** peer dependency — only needed if you use `NoirGlowBackground`. All other components work without it.

```bash
npm install @paper-design/shaders-react
```

### Footer only (minimal)

If you only need the branded footer — no Tailwind, Radix, or other design-system peers:

```bash
npm install @tollerud/footer
```

```tsx
import { Footer } from '@tollerud/footer'

<Footer />
```

`@tollerud/footer` bundles `clsx` and `tailwind-merge` as dependencies. Use `@tollerud/ui` when you need the full component set.

---

## Tailwind Setup (v4)

**Recommended** — package-owned `@source` (works with npm, pnpm, Yarn workspaces, and Bun):

```css
/* app/globals.css */
@import "@tollerud/ui/globals.css";
@import "@tollerud/ui/source.css";
```

`globals.css` bundles Tailwind v4, design tokens, and all component layer styles. `source.css` points Tailwind at the installed package `dist` folder so component utility classes are not purged — no fragile `../node_modules` paths.

### Manual `@source` path (monorepos / custom layouts)

If you prefer an explicit path, resolve it **relative to your CSS file** to `node_modules/@tollerud/ui/dist`:

| Layout | Example CSS file | `@source` path |
|--------|------------------|----------------|
| Next.js App Router (default) | `app/globals.css` | `../node_modules/@tollerud/ui/dist` |
| `src/` app dir | `src/app/globals.css` | `../../node_modules/@tollerud/ui/dist` |
| Turborepo / npm workspace app | `apps/web/app/globals.css` | `../../../node_modules/@tollerud/ui/dist` |
| pnpm (package in workspace) | `app/globals.css` | Prefer `@import "@tollerud/ui/source.css"` — hoisting varies |
| Bun | `app/globals.css` | Prefer `@import "@tollerud/ui/source.css"` |

```css
@import "@tollerud/ui/globals.css";
@source "../node_modules/@tollerud/ui/dist";
```

If styles disappear in production, the `@source` path is wrong — switch to `@tollerud/ui/source.css` or fix the relative path.

**Optional preset shim** — for extra theme tokens from `@tollerud/ui/preset` (`tollerud-preset.cjs`):

```ts
// tailwind.config.ts
import tollerudPreset from '@tollerud/ui/preset'
export default { presets: [tollerudPreset] }
```

```css
@import "tailwindcss";
@config "./tailwind.config.ts";
@import "@tollerud/ui/tokens.css";
@import "@tollerud/ui/globals-layers.css";
@import "@tollerud/ui/source.css";
```

### Tailwind v3 (legacy)

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import tollerudPreset from '@tollerud/ui/preset'

const config: Config = {
  presets: [tollerudPreset],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@tollerud/ui/dist/**/*.{js,mjs}',
  ],
}

export default config
```

```css
/* app/globals.css */
@import "tailwindcss/preflight";
@import "tailwindcss/utilities";
@import "@tollerud/ui/globals-v3.css";
```

---

## Subpath imports (tree-shaking)

Import individual components without pulling the full barrel:

```tsx
import { Button } from '@tollerud/ui/button'
import { cn } from '@tollerud/ui/utils'
```

See [COMPONENTS.md](COMPONENTS.md) for the full prop reference.

---

## Server Components

`@tollerud/ui` ships client bundles with `'use client'`. Importing components (or `cn`, `buttonVariants`) from a Server Component file is safe — the import does not force your file to become a Client Component.

Use subpath imports (`@tollerud/ui/button`) for smaller client boundaries when splitting files manually.

---

## AI agents

If you're using Claude Code or Cursor, sync [SKILL.md](SKILL.md) into your project skills folder — it reflects the actual current exports and known gotchas.

See `README.md` for the complete setup guide.
