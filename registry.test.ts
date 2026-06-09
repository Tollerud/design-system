import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import pkg from './package.json'

describe('registry.json', () => {
  const registry = JSON.parse(readFileSync('registry.json', 'utf8')) as {
    version: string
    components: Record<string, { files: string[] }>
  }

  it('version matches package.json', () => {
    expect(registry.version).toBe(pkg.version)
  })

  it('every entry points at an existing component file', () => {
    for (const [key, entry] of Object.entries(registry.components)) {
      for (const file of entry.files) {
        expect(file.startsWith('components/'), `registry entry "${key}" has unexpected path: ${file}`).toBe(true)
        expect(existsSync(file), `registry entry "${key}" missing file: ${file}`).toBe(true)
      }
    }
  })
})
