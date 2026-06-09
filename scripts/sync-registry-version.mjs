#!/usr/bin/env node
/**
 * Keeps registry.json version aligned with package.json before publish.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const registryPath = join(root, 'registry.json')
const registry = JSON.parse(readFileSync(registryPath, 'utf8'))

if (registry.version === pkg.version) {
  console.log(`registry.json already at v${pkg.version}`)
  process.exit(0)
}

registry.version = pkg.version
writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`)
console.log(`Synced registry.json version → v${pkg.version}`)
