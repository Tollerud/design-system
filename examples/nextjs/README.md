# Next.js Example

A minimal starter showing a homelab dashboard page built with `@tollerud/ui`.

## Quickstart

```bash
npm install @tollerud/ui clsx tailwind-merge tailwindcss
# Only needed if you use NoirGlowBackground:
npm install @paper-design/shaders-react
```

### Tailwind v3

```ts
// tailwind.config.ts
import tollerudPreset from '@tollerud/ui/preset'

export default {
  presets: [tollerudPreset],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@tollerud/ui/dist/**/*.{js,mjs}',
  ],
}
```

### Tailwind v4

```css
/* app/globals.css */
@import "tailwindcss";
@config "../../node_modules/@tollerud/ui/preset";
@source "../../node_modules/@tollerud/ui/dist";
```

## Import

```tsx
import { Button, Card, Badge, StatusDot, Input, NoirGlowBackground } from '@tollerud/ui'
// …or any of the 61 exports — see GETTING_STARTED.md for the full list
```

## What's in app/page.tsx

- `NoirGlowBackground` hero with WebGL shader
- Glass nav bar (`tollerud-glass`)
- Server status cards with `StatusDot`
- Terminal-style CTAs (`variant="terminal"`)
- Gradient accent bars
- `CodeBlock` component
- Responsive layout via `Container`

> **Note:** This example uses relative imports via `components/ui.ts` (a monorepo convenience).
> In a real project you import directly from `@tollerud/ui`.
