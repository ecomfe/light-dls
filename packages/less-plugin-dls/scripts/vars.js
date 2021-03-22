import fs from 'fs'
import path from 'path'
import camelCase from 'lodash.camelcase'
import { parse } from 'postcss-values-parser'
import { getVariables, getTuples } from '../lib/utils/evaluate'

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
