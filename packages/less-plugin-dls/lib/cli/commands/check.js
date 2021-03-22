import { promisify } from 'util'
import fs from 'fs'
import { resolve, basename } from 'path'
import fg from 'fast-glob'
import pkgDir from 'pkg-dir'
import less from 'less'
import dls from '../../../dist'
import variables from '../../../variables.json'
import { VariableInterpolationVisitor, VariablesOutputVisitor } from '../../utils/visitors'
import { getTuples } from '../../utils/evaluate'

const readFile = promisify(fs.readFile)
const readdir = promisify(fs.readdir)
const writeFile = promisify(fs.writeFile)
const access = promisify(fs.access)

const COMPONENTS_DIR = resolve(__dirname, '../../../tokens/components')
const IGNORE_FILE = '.dlsignore'

async function getInterpolatedVariables (content) {
  const variablesOutputVisitor = new VariablesOutputVisitor()
  const variableInterpolationVisitor = new VariableInterpolationVisitor()

  await less.render(content, {
    plugins: [
      dls({
        inject: true
      }),
      {
        install (_, pluginManager) {
          pluginManager.addVisitor(variablesOutputVisitor)
          pluginManager.addVisitor(variableInterpolationVisitor)
        }
      }
    ]
  })

  const tuples = await getTuples(variablesOutputVisitor.variables.map(v => v.slice(1)), content)
  const allVariables = tuples.reduce((map, [key, val]) => {
    map.set(key, val)
    return map
  }, new Map())

  const interpolations = variableInterpolationVisitor.variableInterpolations

  const seenInInterpolations = new Set()
  interpolations.forEach(name => {
    const val = allVariables.get(name)
    if (val) {
      const [, strVal] = val.match(/^"([^"]+)"$/)
      if (strVal in variables) {
        seenInInterpolations.add(`@${strVal}`)
      }
    }
  })

  return seenInInterpolations
}

export default async function check ({ dir, exclude, components, output }) {
  const ignoreFile = resolve(await pkgDir(), IGNORE_FILE)
  const ignoreVars = new Set()

  try {
    await access(ignoreFile, fs.constants.R_OK)

    const content = await readFile(ignoreFile, 'utf8')
    content
      .trim()
      .split(/[\r\n]+/)
      .reduce((acc, cur) => {
        if (!cur.trim().startsWith('#')) {
          acc.add(cur.trim())
        }
        return acc
      }, ignoreVars)
  } catch (e) {
    // do nothing because ignore file is optional
  }

  const allComponents = (await readdir(COMPONENTS_DIR)).map(file =>
    basename(file, '.less')
  )
  if (components) {
    validateComponentNames(components, allComponents)
  }
  const componentNames = components
    ? components.length === 0
      ? allComponents
      : components
    : null

  const keys = Object.keys(variables)
    .map(key => `@${key}`)
    .filter(isToCheck)

  const seen = keys.reduce((acc, cur) => {
    acc.set(cur, false)
    return acc
  }, new Map())

  async function processFile (file) {
    try {
      const content = await readFile(file, 'utf8')

      const interpolated = await getInterpolatedVariables(content)

      keys.forEach(key => {
        if (seen.get(key)) {
          return
        }
        const pattern = new RegExp(`${key}(?![_-\\w\\d])`)
        if (content && pattern.test(content)) {
          seen.set(key, true)
        }
      })

      interpolated.forEach(key => seen.set(key, true))
    } catch (err) {
      console.error(err)
    }
  }

  function isToCheck (key) {
    return (
      componentNames === null ||
      componentNames.some(name => key.indexOf(`@dls-${name}-`) === 0)
    )
  }

  const paths = await fg(['**/*.less'], {
    cwd: resolve(process.cwd, dir),
    ignore: exclude
  })

  const files = paths.map(path => resolve(dir, path))
  for (const file of files) {
    await processFile(file)
  }

  const missing = Array.from(seen.keys()).reduce((acc, cur) => {
    if (!seen.get(cur) && !ignoreVars.has(cur)) {
      acc.push(cur)
    }
    return acc
  }, [])

  if (missing.length === 0) {
    console.log('Congratulations! No missing variable found.')
    return
  }

  const result = missing.join('\n') + '\n'

  if (output) {
    const file = resolve(process.cwd(), output)
    await writeFile(file, result, 'utf8')
    console.log(
      `${missing.length} missing variable${
        missing.length > 1 ? 's have' : ' has'
      } been successfully written into [${output}].`
    )
  } else {
    console.log(
      `Missing ${missing.length} variable${missing.length > 1 ? 's' : ''}:`
    )
    console.log('-'.repeat(32))
    console.log(result)
  }
}

function validateComponentNames (input, all) {
  return input.every(name => {
    if (!all.includes(name)) {
      console.warn(`[${name}] is not a valid component name.`)
      return false
    }
    return true
  })
}
