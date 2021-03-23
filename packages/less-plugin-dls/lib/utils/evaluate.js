import fs from 'fs'
import less from 'less'
import dls from '../../dist'
import { VariablesOutputVisitor } from './visitors'

const SELECTOR = 'DLS_VARS'

export async function getVariables (path) {
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

  return visitor.variables.map((v) => v.slice(1))
}

export async function getTuples (variables) {
  const src = [
    `${SELECTOR}{`,
    variables.map((v) => `${v}: @${v}`).join(';'),
    '}'
  ].join('')

  const { css } = await less.render(src, {
    plugins: [dls()]
  })

  return css
    .replace(new RegExp(`^[\\s\\S]*${SELECTOR}[\\s\\n]*{[\\s\\n]*`), '')
    .replace(/}[\n\s]*$/, '')
    .split(/;[\n\s]*/)
    .filter((v) => v)
    .map((decl) => decl.split(/:\s*/))
}
