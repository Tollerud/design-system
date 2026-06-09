#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { DOC_SYMBOLS, REACT_HOOKS } from '../docs-app/lib/provide-symbols.js'

const dir = join(import.meta.dirname, '../docs-app/components')
const header = `'use client'
import React, { ${REACT_HOOKS.join(', ')} } from 'react'
import * as __p from '@/lib/provide-pages'
const { ${DOC_SYMBOLS.join(', ')} } = __p

`

for (const file of readdirSync(dir).filter((f) => f.startsWith('page-') && f.endsWith('.jsx'))) {
  let src = readFileSync(join(dir, file), 'utf8')
  src = src.replace(/^'use client'\n[\s\S]*?const \{[^}]+\} = __p\n\n/, '')
  src = src.replace(/^'use client'\n/, '')
  if (file === 'page-patterns.jsx') {
    src = src.replace(/^import \{ Timeline \} from '\.\/page-components'\n\n/, '')
  }
  writeFileSync(join(dir, file), header + src.trimStart())
}

console.log('inject-page-imports: patched page-*.jsx files')
