#!/usr/bin/env node
/**
 * Installs the packed tarball in examples/consumer and runs a production build.
 * Syncs examples/consumer/package.json to the current package version before pack.
 */
import { execSync } from 'node:child_process'
import { readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const consumer = join(root, 'examples/consumer')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const tgzName = `tollerud-ui-${pkg.version}.tgz`

const consumerPkgPath = join(consumer, 'package.json')
const consumerPkg = JSON.parse(readFileSync(consumerPkgPath, 'utf8'))
consumerPkg.dependencies['@tollerud/ui'] = `file:../../${tgzName}`
writeFileSync(consumerPkgPath, `${JSON.stringify(consumerPkg, null, 2)}\n`)

for (const file of readdirSync(root)) {
  if (file.startsWith('tollerud-ui-') && file.endsWith('.tgz')) {
    unlinkSync(join(root, file))
  }
}

execSync('npm pack --pack-destination .', { cwd: root, stdio: 'inherit' })

const tgz = readdirSync(root).find((f) => f.startsWith('tollerud-ui-') && f.endsWith('.tgz'))
if (!tgz) throw new Error('npm pack did not produce a tarball')
if (tgz !== tgzName) {
  throw new Error(`Expected tarball ${tgzName}, got ${tgz}`)
}

execSync('rm -rf node_modules .next out', { cwd: consumer, stdio: 'inherit' })
execSync(`npm install ../../${tgz}`, { cwd: consumer, stdio: 'inherit' })
execSync('npm run build', { cwd: consumer, stdio: 'inherit' })

console.log('Consumer smoke test passed.')
