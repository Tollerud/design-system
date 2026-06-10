#!/usr/bin/env node
/**
 * Package quality gate: publint + @arethetypeswrong/cli on the built tarball layout.
 */
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const manifest = JSON.parse(readFileSync(join(root, 'entries/manifest.json'), 'utf8'))

const subpaths = manifest
  .filter((entry) => entry.startsWith('entries/'))
  .map((entry) => {
    const name = entry.replace(/^entries\//, '').replace(/\.ts$/, '')
    return `@tollerud/ui/${name}`
  })

execSync('npx publint', { cwd: root, stdio: 'inherit' })

// CSS/assets/preset are intentionally untyped — check JS entrypoints only.
const entrypoints = ['.', ...subpaths].join(' ')
execSync(`npx attw --pack . --profile esm-only --entrypoints ${entrypoints}`, {
  cwd: root,
  stdio: 'inherit',
  shell: true,
})

console.log(`Package quality checks passed (${subpaths.length + 1} entrypoints).`)
