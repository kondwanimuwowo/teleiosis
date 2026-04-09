// update-contact.mjs
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'

const oldPhone = '+260 97 6 779 008'
const newPhoneUI = '+260 977 964 076'
const newPhoneHref = '+260977964076'

const oldFB = 'https://facebook.com'
const newFB = 'https://web.facebook.com/Rhemaword27'

function walk(dir) {
  let results = []
  const list = readdirSync(dir, { withFileTypes: true })
  for (const file of list) {
    const fullPath = join(dir, file.name)
    if (file.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(file.name)) {
        results = results.concat(walk(fullPath))
      }
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      results.push(fullPath)
    }
  }
  return results
}

const root = process.cwd()
const files = walk(join(root, 'app'))

for (const file of files) {
  let content = readFileSync(file, 'utf8')
  let original = content
  
  // Replace Phone
  content = content.replace(/\+260 97 6 779 008/g, newPhoneUI)
  content = content.replace(/tel:\+260976779008/g, `tel:${newPhoneHref}`)
  
  // Replace Facebook
  content = content.replace(/https:\/\/facebook.com/g, newFB)

  if (content !== original) {
    writeFileSync(file, content, 'utf8')
    console.log(`Updated: ${file.replace(root, '')}`)
  }
}
console.log('Done.')
