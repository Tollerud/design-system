#!/usr/bin/env node
/**
 * Package quality gate: publint + @arethetypeswrong/cli on the built tarball layout.
 */
import { execSync } from 'node:child_process'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')

execSync('npx publint', { cwd: root, stdio: 'inherit' })
// CSS/assets/preset are intentionally untyped — check JS entrypoints only.
execSync(
  'npx attw --pack . --profile esm-only --entrypoints . @tollerud/ui/button @tollerud/ui/dialog @tollerud/ui/utils',
  { cwd: root, stdio: 'inherit' },
)

console.log('Package quality checks passed.')
