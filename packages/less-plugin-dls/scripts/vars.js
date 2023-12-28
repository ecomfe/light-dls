import fs from 'fs'
import path from 'path'
import camelCase from 'lodash.camelcase'
import { parse } from 'postcss-values-parser'
import { getVariables, getTuples } from '../lib/utils/evaluate'

const paletteRe = /^dls-color-(?:brand|info|success|warning|error|gray|translucent)(?:-\d+)?$/

function getFilePath (type, { scope, theme } = {}) {
  return path.resolve(__dirname, '..', `variables${scope ? `.${scope}` : ''}${theme ? `.${theme}` : ''}.${type}`)
}

function genLess (tuples, options) {
  const filePath = getFilePath('less', options)

  fs.writeFileSync(
    filePath,
    tuples.map(([key, value]) => `@${key}: ${value};`).join('\n') + '\n',
    'utf8'
  )
}

function genJS (tuples, options) {
  const filePath = getFilePath('js', options)

  fs.writeFileSync(
    filePath,
    tuples
      .map(([key, value]) => `export const ${camelCase(key)} = '${value}'`)
      .join('\n') + '\n',
    'utf8'
  )
}

function genJSON (tuples, options) {
  const filePath = getFilePath('json', options)
  fs.writeFileSync(
    filePath,
    JSON.stringify(
      tuples
        .map(([key, value]) => ({
          [key]: {
            value,
            type: getTypeByName(key) || getTypeByValue(value),
            global: options.globals.includes(key)
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
}

async function generate({ theme } = {}) {
  try {
    const allVariables = await getVariables('./tokens/index.less')
    const globalVariables = await getVariables('./tokens/global.less')
    const paletteVariables = globalVariables.filter(v => paletteRe.test(v))

    const allTuples = await getTuples(allVariables, { theme })
    const globalTuples = await getTuples(globalVariables, { theme })
    const paletteTuples = await getTuples(paletteVariables, { theme })

    genLess(allTuples, { theme })
    genLess(globalTuples, { scope: 'global', theme })
    genLess(paletteTuples, { scope: 'palette', theme })

    genJS(allTuples, { theme })
    genJS(globalTuples, { scope: 'global', theme })
    genJS(paletteTuples, { scope: 'palette', theme })


    genJSON(allTuples, { theme, globals: globalVariables })
    genJSON(globalTuples, { scope: 'global', theme, globals: globalVariables })
    genJSON(paletteTuples, { scope: 'palette', theme, globals: paletteVariables })

    console.log(
      `${allTuples.length} variables generated for theme [${
        theme || 'default'
      }].`
    )
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
