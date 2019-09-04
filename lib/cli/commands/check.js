import { promisify } from 'util'
import fs from 'fs'
import { resolve, basename } from 'path'
import fg from 'fast-glob'
import variables from '../../../variables.json'

const readFile = promisify(fs.readFile)
const readdir = promisify(fs.readdir)

const COMPONENTS_DIR = resolve(__dirname, '../../../tokens/components')

export default async function check ({ dir, exclude, componentsOnly, output }) {
  const components = componentsOnly
    ? (await readdir(COMPONENTS_DIR)).map(file => basename(file, '.less'))
    : null

  const keys = Object.keys(variables)
    .map(key => `@${key}`)
    .filter(isToCheck)

  const seen = keys.reduce((acc, cur) => {
    acc[cur] = false
    return acc
  }, {})

  async function processFile (file) {
    try {
      const content = await readFile(file, 'utf8')

      keys.forEach(key => {
        if (seen[key]) {
          return
        }
        const pattern = new RegExp(`${key}(?![_-\\w\\d])`)
        if (content && pattern.test(content)) {
          seen[key] = true
        }
      })
    } catch (err) {
      console.error(err)
    }
  }

  function isToCheck (key) {
    return (
      components === null ||
      components.some(name => key.indexOf(`@dls-${name}-`) === 0)
    )
  }

  const paths = await fg(['**/*.less'], {
    cwd: resolve(process.cwd, dir),
    ignore: exclude
  })

  const files = paths.map(path => resolve(dir, path))
  for (let file of files) {
    await processFile(file)
  }

  const missing =
    Object.keys(seen)
      .reduce((acc, cur) => {
        if (!seen[cur]) {
          acc.push(cur)
        }
        return acc
      }, [])
      .join('\n') + '\n'

  if (output) {
    const file = resolve(process.cwd, output)
    fs.writeFile(file, missing, 'utf8')
  } else {
    console.log(missing)
  }
}
