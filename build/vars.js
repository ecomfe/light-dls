import fs from 'fs'
import path from 'path'
import less from 'less'
import camelCase from 'lodash.camelcase'
import { parse } from 'postcss-values-parser'
import dls from '../dist'

class VariablesOutputVisitor {
  constructor () {
    this._visitor = new less.visitors.Visitor(this)
  }

  run (root) {
    // `-dls` prefixed variables are private
    this.variables = Object.keys(root.variables()).filter(
      v => v.charAt(1) !== '-'
    )
    return this._visitor.visit(root)
  }
}

const SELECTOR = 'DLS_VARS'

async function getVariables (path) {
  const visitor = new VariablesOutputVisitor()

  await less.render(fs.readFileSync(path, 'utf-8'), {
    plugins: [
      dls({
        inject: false
      }),
      {
        install (_, pluginManager) {
          pluginManager.addVisitor(visitor)
        }
      }
    ],
    paths: ['tokens']
  })

  return visitor.variables.map(v => v.slice(1))
}

async function getTuples (variables) {
  const src = [
    `${SELECTOR}{`,
    variables.map(v => `${v}: @${v}`).join(';'),
    '}'
  ].join('')

  const { css } = await less.render(src, {
    plugins: [dls()]
  })

  return css
    .replace(new RegExp(`^[\\s\\S]*${SELECTOR}[\\s\\n]*{[\\s\\n]*`), '')
    .replace(/}[\n\s]*$/, '')
    .split(/;[\n\s]*/)
    .filter(v => v)
    .map(decl => decl.split(/:\s*/))
}

async function generate () {
  try {
    const allVariables = await getVariables('./tokens/index.less')
    const globalVariables = await getVariables('./tokens/global.less')

    const tuples = await getTuples(allVariables)

    // generate variables.less
    fs.writeFileSync(
      path.resolve(__dirname, '..', 'variables.less'),
      tuples.map(([key, value]) => `@${key}: ${value};`).join('\n') + '\n',
      'utf8'
    )

    fs.writeFileSync(
      path.resolve(__dirname, '..', 'variables.js'),
      tuples
        .map(([key, value]) => `export const ${camelCase(key)} = '${value}'`)
        .join('\n') + '\n',
      'utf8'
    )

    // generate variables.json
    fs.writeFileSync(
      path.resolve(__dirname, '..', 'variables.json'),
      JSON.stringify(
        tuples
          .map(([key, value]) => ({
            [key]: {
              value,
              type: getType(value),
              global: globalVariables.includes(key)
            }
          }))
          .reduce((acc, cur) => {
            Object.assign(acc, cur)
            return acc
          }, {}),
        null,
        '  '
      ),
      'utf8'
    )

    console.log(`${tuples.length} variables generated.`)
  } catch (e) {
    console.error(e)
  }
}

// https://code.visualstudio.com/api/references/vscode-api#CompletionItemKind
function getType (value) {
  if (['inherit', 'initial', 'unset', 'revert'].includes(value)) {
    return 'keyword'
  }

  const root = parse(value)

  if (root.nodes.length > 1) {
    return 'complex'
  }

  const node = root.nodes[0]

  if (!node) {
    return 'unknown'
  }

  if (node.type === 'numeric') {
    if (node.unit) {
      return 'length'
    }
    return 'numeric'
  }

  if (node.type === 'quoted') {
    return 'string'
  }

  if (value === 'transparent' || value === 'currentColor' || node.isColor) {
    return 'color'
  }

  if (node.type === 'function') {
    return 'function'
  }

  return 'unknown'
}

generate()
