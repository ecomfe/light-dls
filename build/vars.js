import fs from 'fs'
import path from 'path'
import less from 'less'
import { parse } from 'postcss-values-parser'
import dls from '../dist'

class VariablesOutputVisitor {
  constructor () {
    this._visitor = new less.visitors.Visitor(this)
  }

  run (root) {
    this.variables = Object.keys(root.variables())
    return this._visitor.visit(root)
  }
}

const SELECTOR = 'DLS_VARS'
const visitor = new VariablesOutputVisitor()

less
  .render(fs.readFileSync('./tokens/index.less', 'utf-8'), {
    plugins: [
      dls(),
      {
        install (less, pluginManager) {
          pluginManager.addVisitor(visitor)
        }
      }
    ],
    paths: ['tokens']
  })
  .then(() => {
    let src = [
      `${SELECTOR}{`,
      visitor.variables.map(v => `${v.slice(1)}: ${v}`).join(';'),
      '}'
    ].join('')
    return less.render(src, {
      plugins: [dls()]
    })
  })
  .then(({ css }) => {
    fs.writeFileSync(
      path.resolve(__dirname, '..', 'variables.json'),
      JSON.stringify(
        css
          .replace(new RegExp(`^[\\s\\S]*${SELECTOR}[\\s\\n]*{[\\s\\n]*`), '')
          .replace(/}[\n\s]*$/, '')
          .split(/;[\n\s]*/)
          .filter(v => v)
          .map(decl => {
            let [key, value] = decl.split(/:\s*/)
            return {
              [key]: {
                value,
                type: getType(value)
              }
            }
          })
          .reduce(
            (acc, cur) => ({
              ...acc,
              ...cur
            }),
            {}
          ),
        null,
        '  '
      )
    )
  })

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
