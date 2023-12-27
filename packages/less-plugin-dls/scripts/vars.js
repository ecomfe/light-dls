import fs from 'fs'
import path from 'path'
import camelCase from 'lodash.camelcase'
import { parse } from 'postcss-values-parser'
import { getVariables, getTuples } from '../lib/utils/evaluate'

async function generate({ theme } = {}) {
  try {
    const allVariables = await getVariables('./tokens/index.less')
    const globalVariables = await getVariables('./tokens/global.less')
    const themeVariables = await getVariables(`./tokens/themes/${theme}.less`)

    const tuples = await getTuples(allVariables.concat(themeVariables), {
      theme
    })

    const themeTail = theme ? `.${theme}` : ''

    // generate variables.less
    fs.writeFileSync(
      path.resolve(__dirname, '..', `variables${themeTail}.less`),
      tuples.map(([key, value]) => `@${key}: ${value};`).join('\n') + '\n',
      'utf8'
    )

    fs.writeFileSync(
      path.resolve(__dirname, '..', `variables${themeTail}.js`),
      tuples
        .map(([key, value]) => `export const ${camelCase(key)} = '${value}'`)
        .join('\n') + '\n',
      'utf8'
    )

    // generate variables.json
    fs.writeFileSync(
      path.resolve(__dirname, '..', `variables${themeTail}.json`),
      JSON.stringify(
        tuples
          .map(([key, value]) => ({
            [key]: {
              value,
              type: getTypeByName(key) || getTypeByValue(value),
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

    console.log(`${tuples.length} variables generated for theme [${theme || 'default'}].`)
  } catch (e) {
    console.error(e)
  }
}

const TOKEN_TYPES = {
  color: 'color',
  'font-family': 'font',
  'font-weight': 'numeric',
  gutter: 'length',
  spacing: 'length',
  size: 'length',
  padding: 'length',
  width: 'length',
  height: 'length',
  indent: 'length',
  radius: 'length',
  shadow: 'complex',
  opacity: 'numeric'
}

const TOKEN_TYPE_KEYS = Object.keys(TOKEN_TYPES)

function getTypeByName(name) {
  const key = TOKEN_TYPE_KEYS.find((key) => name.includes(key))
  return key ? TOKEN_TYPES[key] || null : null
}

// https://code.visualstudio.com/api/references/vscode-api#CompletionItemKind
function getTypeByValue(value) {
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

  if (
    value.toLowerCase() === 'transparent' ||
    value.toLowerCase() === 'currentcolor' ||
    node.isColor
  ) {
    return 'color'
  }

  if (node.isVar) {
    return 'variable'
  }

  if (node.type === 'func') {
    if (node.name === 'calc') {
      return 'length'
    }

    return 'function'
  }

  return 'unknown'
}

async function run() {
  await generate()
  await generate({ theme: 'ai' })
}

run()
