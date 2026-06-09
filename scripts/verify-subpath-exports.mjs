#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs'

const mustHaveUseClient = ['button', 'card', 'dialog']
const mustNotHaveUseClient = ['utils']

for (const name of [...mustHaveUseClient, ...mustNotHaveUseClient]) {
  const js = `dist/${name}.js`
  const dts = `dist/${name}.d.ts`
  if (!existsSync(js)) {
    console.error(`Missing subpath bundle: ${js}`)
    process.exit(1)
  }
  if (!existsSync(dts)) {
    console.error(`Missing subpath types: ${dts}`)
    process.exit(1)
  }
  const source = readFileSync(js, 'utf8')
  const hasUseClient = source.startsWith("'use client'")

  if (mustHaveUseClient.includes(name) && !hasUseClient) {
    console.error(`${js} is missing 'use client' directive`)
    process.exit(1)
  }
  if (mustNotHaveUseClient.includes(name) && hasUseClient) {
    console.error(`${js} must not include 'use client' (server-safe subpath)`)
    process.exit(1)
  }
}

console.log(`Verified ${mustHaveUseClient.length + mustNotHaveUseClient.length} subpath exports in dist/`)
