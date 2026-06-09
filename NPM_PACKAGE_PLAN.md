# @tollerud/ui — NPM package remediation plan

Last updated: 2026-06-09 · Target: production-grade npm package

Status key: `[ ]` todo · `[~]` in progress · `[x]` done

---

## Phase 1 — Single source of truth (docs = npm) `[x]`

### 1a — Next.js docs site + npm bridge `[x]`

### 1b — Eliminate duplicate component files `[x]`

### 1c — Docs site layout taxonomy `[x]`

```
docs-app/components/
  docs-shell.jsx
  pages/page-*.jsx
  kit/          primitives, icons, cmd-registry, motion
  blocks/       rich-datatable.jsx
```

### 1d — Ship charts & marketing blocks `[x]`

- [x] Charts + marketing blocks in npm (v1.4.0)
- [x] Retired `grain-gl.jsx` — docs use `NoirGlowBackground`

---

## Phase 2 — Consumer integration test `[x]`

---

## Phase 3 — Publish pipeline parity `[x]`

- [x] `test:subpath` in `prepublishOnly` and publish workflow
- [x] E2E in publish gate (build:docs + Playwright)
- [x] `npm run sync:registry` in publish workflow + `prepublishOnly`

---

## Phase 4 — Clean installs `[x]`

---

## Phase 5 — Peer dependency model `[x]`

- [x] Peers: `@radix-ui/*`, `lucide-react`, `framer-motion`, `sonner`
- [x] `class-variance-authority` stays a dependency
- [x] README install one-liner documents required peers
- [x] Major bump **v2.0.0**

---

## Phase 6 — Quality gates `[x]`

- [x] Vitest coverage expanded (Select, Tabs, Sheet, Combobox, FileUpload)
- [x] `vitest-axe` assertions for Button, Input, Dialog
- [x] `publint` + `@arethetypeswrong/cli` via `npm run test:package`
- [x] `size-limit` on `dist/button.js` and `dist/index.js`
- [x] `@tollerud/ui/tailwind.css` helper export

---

## Phase 7 — Documentation & release hygiene `[x]`

- [x] `SKILL.md` + `COMPONENTS.md` remain prop references; `test:drift` guards exports (Typedoc deferred — SKILL is source of truth)
- [x] `npm run sync:registry` + `npm run changelog:draft` for release hygiene (Changesets deferred)
- [x] `CODE_OF_CONDUCT.md`
- [x] Footer vs `@tollerud/footer` clarified in README
- [x] Forward-looking section in `COMPLETENESS_ROADMAP.md`

---

## Deferred (not blocking production npm)

| Item | Why deferred |
|------|----------------|
| Typedoc / generated props | `SKILL.md` + drift test cover exports; manual `COMPONENTS.md` updated on releases |
| Changesets / release-please | `sync:registry` + `changelog:draft` + manual version bump workflow |
| Full `DataTable` parity | Incremental — docs keep `rich-datatable.jsx` |
| ESM-only drop of CJS | Consumers still use both |
| Storybook | Playwright E2E + Vitest sufficient |

---

## Out of scope

- Light mode in npm components (dark-only by design)
