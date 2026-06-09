# Contributing

## Before you open a PR

```bash
npm ci --legacy-peer-deps
npm run typecheck
npm run lint
npm run test
npm run build
```

Or run the full gate in one step:

```bash
npm run validate
```

## Adding or changing components

Follow the checklist in [AGENTS.md](AGENTS.md):

1. Component source in `components/`
2. Export from `components/index.ts`
3. Registry entry in `registry.json`
4. Live demo in `docs/page-*.jsx` (site entry: `index.html`)

## Releases

Maintainers bump `package.json` version and push to `main`. The publish workflow runs typecheck, lint, test, build, and `npm publish` when the version is new.

See [AGENTS.md](AGENTS.md) for version bump rules and CHANGELOG format.
