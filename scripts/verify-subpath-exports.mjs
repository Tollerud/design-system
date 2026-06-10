#!/usr/bin/env node
/**
 * Verifies every entries/manifest.json subpath resolves to dist/{name}.js + .d.ts
 */
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const manifest = JSON.parse(readFileSync(join(root, 'entries/manifest.json'), 'utf8'))

const mustHaveUseClient = new Set(['button', 'card', 'dialog'])
const mustNotHaveUseClient = new Set(['utils'])

const names = manifest.map((entry) => {
  if (entry === 'components/index.ts') return 'index'
  return entry.replace(/^entries\//, '').replace(/\.ts$/, '')
})

let failures = 0

for (const name of names) {
  const js = join(root, `dist/${name}.js`)
  const dts = join(root, `dist/${name}.d.ts`)

  if (!existsSync(js)) {
    const sourceEntry = manifest.find(
      (e) => e.endsWith(`/${name}.ts`) || (e === 'components/index.ts' && name === 'index'),
    )
    console.error(`Missing subpath bundle: dist/${name}.js${sourceEntry ? ` (${sourceEntry})` : ''}`)
    failures++
    continue
  }
  if (!existsSync(dts)) {
    console.error(`Missing subpath types: dist/${name}.d.ts`)
    failures++
    continue
  }

  const source = readFileSync(js, 'utf8')
  const hasUseClient = source.startsWith("'use client'")

  if (mustHaveUseClient.has(name) && !hasUseClient) {
    console.error(`dist/${name}.js is missing 'use client' directive`)
    failures++
  }
  if (mustNotHaveUseClient.has(name) && hasUseClient) {
    console.error(`dist/${name}.js must not include 'use client' (server-safe subpath)`)
    failures++
  }
}

if (failures > 0) {
  console.error(`Subpath verification failed (${failures} issue(s))`)
  process.exit(1)
}

console.log(`Verified ${names.length} subpath exports in dist/`)
