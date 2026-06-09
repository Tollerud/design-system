# npm package hardening — work plan

**Target:** 2026-06-11  
**Package:** `@tollerud/ui` v4.0.3  
**Status:** Priority 1 complete (2026-06-09) — OIDC configured for both packages

---

## Prompt (audit request)

> Can you review the whole code and project and tell me whats missing to make this a fully usable UI based on best practises?

This plan captures the audit outcome and a prioritized execution order for making `@tollerud/ui` a production-grade npm package.

---

## Already in good shape

The package is **usable today** for Next.js + Tailwind teams that follow `GETTING_STARTED.md`. These are done:

- Modern **export map** — ESM-only, subpaths (`@tollerud/ui/button`), CSS / preset / brand exports
- **Build quality gates** — `publint`, `@arethetypeswrong/cli`, size budgets, tarball smoke test (`fixtures/consumer`)
- **Peer dependency model** — Radix, Lucide, Framer Motion, Sonner externalized
- **Shipped consumer docs** — `GETTING_STARTED.md`, `COMPONENTS.md`, `CHANGELOG.md`, `SKILL.md` in tarball
- **Release hygiene** — Changesets, version sync, `prepublishOnly` checks, CI `validate`
- **RSC story documented** — client boundaries + subpath imports
- **Living docs** — [design.tollerud.dev](https://design.tollerud.dev/)
- **Repo cleanup (v4.0.2)** — npm-only install, `fixtures/consumer`, docs under `docs-app/`, `registry.json` repo-only

---

## Priority 1 — Ship-blockers / trust (do first)

### 1.1 Align publish pipeline with `validate`

`npm run validate` runs `test:consumer` and `verify:footer-sync`, but **`prepublishOnly` and `.github/workflows/publish-npm.yml` do not**.

- [x] Add `npm run test:consumer` to `prepublishOnly`
- [x] Add `npm run verify:footer-sync` to `prepublishOnly`
- [x] Add both steps to `publish-npm.yml` before `npm publish`

**Files:** `package.json`, `.github/workflows/publish-npm.yml`

### 1.2 Auto-publish `@tollerud/footer`

Changesets links `@tollerud/ui` and `@tollerud/footer`, but CI only publishes `@tollerud/ui`. Footer can drift on npm.

- [x] Add `packages/footer` build + publish step to `publish-npm.yml` (same version gate)
- [ ] Or document footer as manual-only and remove npm links from README (not recommended)

**Files:** `.github/workflows/publish-npm.yml`, optionally `packages/footer/package.json`

### 1.3 Fix `tollerud-preset.js` CJS in ESM package

`publint` warns: preset is `.js` but interpreted as ESM in a `"type": "module"` package.

- [x] Rename to `tollerud-preset.cjs` (or ship dual ESM/CJS)
- [x] Update `package.json` exports + `files`
- [x] Update `GETTING_STARTED.md`, `README.md`, `SKILL.md`, `AGENTS.md` import examples
- [x] Re-run `npm run test:package`

### 1.4 Selective `'use client'` instead of blanket prepend

`tsup` `onSuccess` adds `'use client'` to **all** `dist/*.js`, including `utils.js` (`cn`).

- [x] Audit which entrypoints need client boundary (interactive vs static)
- [x] Stop prepending to `utils` (`utils.js` only for now)
- [x] Update `scripts/verify-subpath-exports.mjs` expectations per entry
- [x] Verify Next.js RSC + `fixtures/consumer` still pass

**Files:** `tsup.config.ts`, possibly per-component source directives

### 1.5 Remove misleading `engines.node`

`"engines": { "node": ">=20" }` applies to consumers installing a browser library.

- [x] Remove `engines` from `package.json` (keep `.nvmrc` for contributors)
- [x] Document Node 24 + npm 11.16 in `CONTRIBUTING.md` only

### 1.6 npm provenance (supply chain)

Publish workflow disables provenance (classic `NPM_TOKEN`).

- [x] Configure **Trusted Publishers (OIDC)** on npmjs.com for `@tollerud/ui` and `@tollerud/footer` (`Tollerud/ui` · `publish-npm.yml`)
- [x] Enable `--provenance` in `publish-npm.yml`
- [x] Remove NPM_TOKEN path once OIDC works

---

## Priority 2 — Export & install reliability

### 2.1 Expand subpath export verification

`test:subpath` only checks 4 entries; ~69 subpaths ship.

- [ ] Assert every `entries/manifest.json` key resolves to `dist/{name}.js` + `.d.ts`
- [ ] Optionally run attw against all public subpaths (or a generated list)

**Files:** `scripts/verify-subpath-exports.mjs`

### 2.2 Tailwind `@source` docs for monorepos

```css
@source "../node_modules/@tollerud/ui/dist";
```

Breaks with pnpm, Yarn PnP, Bun, nested CSS paths.

- [ ] Add pnpm / workspace / Bun examples to `GETTING_STARTED.md`
- [ ] Consider `@tollerud/ui/source` CSS entry or documented PostCSS helper

### 2.3 Peer install friction

8+ required peers beyond `@tollerud/ui`.

- [ ] Single copy-paste install block in README (already partial — verify complete)
- [ ] Optional: `@tollerud/ui-peers` meta-package or `npx` setup script
- [ ] Document minimal install (footer-only path via `@tollerud/footer`)

---

## Priority 3 — Ecosystem & DX polish

### 3.1 `@tollerud/footer` dependency model

Footer bundles `clsx` + `tailwind-merge` as **dependencies**, not peers — duplicate risk in apps using both packages.

- [ ] Move to `peerDependencies` (breaking for footer-only users — changeset major?)
- [ ] Or document that footer is self-contained by design

### 3.2 Footer TypeScript alignment

`packages/footer` uses TypeScript 5.8; main package uses 6.x.

- [ ] Align `packages/footer` devDependency to TS 6

### 3.3 Starter template

`fixtures/consumer` is CI-only, not human-facing.

- [ ] Add `examples/next-starter/` or external `create-tollerud-app` repo
- [ ] Link from README and docs Getting Started

### 3.4 Migration guide (copy-paste → package)

`AGENTS.md` covers this for AI; humans need a short section.

- [ ] Add “Migrating from copied components” to `GETTING_STARTED.md`
- [ ] Grep recipe + prop drift checklist (link to `SKILL.md`)

---

## Priority 4 — Quality & trust (longer term)

| Area | Today | Target |
|------|--------|--------|
| Unit tests | ~16 test files / 68+ components | Cover forms, overlays, DataTable edge cases |
| a11y | `vitest-axe` in one suite | Per-interactive-component or docs e2e expansion |
| attw coverage | 4 subpaths | All public subpaths or generated manifest |
| SECURITY.md | Repo only | Fine — keep on GitHub |

- [ ] Add tests for untested interactive components (Combobox, DatePicker, CommandMenu)
- [ ] Extend Playwright for subpath-import smoke page in docs or fixture

---

## Suggested order for tomorrow

1. **1.1** Publish pipeline parity (`test:consumer` + `verify:footer-sync`)
2. **1.3** Preset `.cjs` rename
3. **1.2** Footer publish in CI
4. **2.1** Full subpath export test
5. **1.5** Remove `engines.node`
6. **1.4** Selective `'use client'` (larger — split if timeboxed)
7. **1.6** OIDC provenance (needs npm dashboard access)

Cut a **patch release (4.0.3)** after 1.1 + 1.3 + 2.1. Save 1.4 and 1.6 for a minor if behavior changes.

---

## Verification before release

```bash
npm run validate
npm pack --dry-run   # confirm no registry.json, preset resolves
cd fixtures/consumer && npm run build  # or npm run test:consumer from root
```

---

## References

- Audit conversation: 2026-06-10
- Related roadmap: [COMPLETENESS_ROADMAP.md](./COMPLETENESS_ROADMAP.md) → “npm package hardening (planned)”
- Consumer fixture: `fixtures/consumer/`
- Publish workflow: `.github/workflows/publish-npm.yml`
