#!/usr/bin/env node
/**
 * Ensures PROPS.generated.md matches components/*.tsx prop interfaces.
 */
import { execSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const generated = join(root, 'PROPS.generated.md')

if (!existsSync(generated)) {
  console.error('Missing PROPS.generated.md — run: npm run docs:props')
  process.exit(1)
}

const before = readFileSync(generated, 'utf8')
execSync('node scripts/generate-props.mjs', { cwd: root, stdio: 'pipe' })
const after = readFileSync(generated, 'utf8')

if (before !== after) {
  console.error('PROPS.generated.md is out of date. Run: npm run docs:props')
  process.exit(1)
}

console.log('PROPS.generated.md is up to date.')
