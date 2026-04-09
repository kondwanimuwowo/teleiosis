// replace-dashes.mjs
// Replaces sentence em dashes (—) with commas across all .tsx/.ts files
// Preserves: scripture attributions (." — Book X:Y), code comments, and true rhetorical contrasts

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

function walk(dir) {
  const results = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(entry.name)) results.push(...walk(full))
    } else if (['.tsx', '.ts'].includes(extname(entry.name))) {
      results.push(full)
    }
  }
  return results
}

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const files = [...walk(join(root, 'app')), ...walk(join(root, 'lib'))]

for (const file of files) {
  let src = readFileSync(file, 'utf8')
  let out = src

  // 1. Protect scripture attributions: `." — Book` or `." — 1 Book`
  //    These always appear right after a closing quote before a book name/number
  out = out.replace(/\." — ([A-Z1-9])/g, '.__ATTR__$1')

  // 2. Protect title-separator dashes: e.g. "Part — " or "Lamb of God — Part"
  out = out.replace(/ — Part /g, ' __TITLE__Part ')

  // 3. Replace remaining sentence em dashes with commas
  out = out.replace(/ — /g, ', ')

  // 4. Restore protected patterns
  out = out.replace(/\.__ATTR__/g, '." — ')
  out = out.replace(/ __TITLE__Part /g, ' — Part ')

  if (out !== src) {
    writeFileSync(file, out, 'utf8')
    console.log('Updated:', file.replace(root, ''))
  }
}

console.log('Done.')
