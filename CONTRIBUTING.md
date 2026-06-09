# Contributing

## Before you open a PR

```bash
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
```

Or run the full gate in one step:

```bash
npm run validate
```

Docs site E2E (requires `npx playwright install chromium` once):

```bash
npm run test:e2e
```

Draft a CHANGELOG entry from git commits:

```bash
npm run changelog:draft
```

## Adding or changing components

Follow the checklist in [AGENTS.md](AGENTS.md):

1. Component source in `components/`
2. Export from `components/index.ts`
3. Registry entry in `registry.json`
4. Live demo in `docs-app/components/pages/page-*.jsx` (Next.js static export → `_site/`)

## Releases

Preferred flow (Changesets):

```bash
npm run changeset          # after merging feature PRs
npm run version:release    # bumps package.json + CHANGELOG + registry.json
npm run validate
```

`version:release` runs `changeset version` then `sync:registry`. Push to `main`; the publish workflow runs gates and `npm publish` when the version is new.

Fallback: manual version bump in `package.json`, `npm run changelog:draft`, and `npm run sync:registry`.

Prop reference drift: `npm run docs:props` regenerates `PROPS.generated.md`; `npm run test:props` runs in `validate`.

See [AGENTS.md](AGENTS.md) for version bump rules and CHANGELOG format.
