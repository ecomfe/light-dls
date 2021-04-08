import fs from 'fs'
import { resolve, basename, extname } from 'path'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import { compile } from 'ejs'
import stringify from 'stringify-object'
import { process } from './svg'
import { camelCase } from './utils'

const { readdir, readFile, writeFile } = fs.promises

const SRC_DIR = resolve(__dirname, '../src')
const DIST_DIR = resolve(__dirname, '../dist')
const SEPARATE_DIR = resolve(__dirname, '../dist/separate')
const README_PATH = resolve(__dirname, '../README.md')
const ENTRY_MODULE = resolve(DIST_DIR, 'index.js')
const EXPORT_TPL = resolve(__dirname, './export.ejs')
const BASE_PREVIEW_URL = 'https://raw.githubusercontent.com/ecomfe/light-dls/master/packages/dls-graphics/src/'

function clearDir (dir) {
  rimraf.sync(dir)
  mkdirp.sync(dir)
}

async function build () {
  clearDir(DIST_DIR)
  clearDir(SEPARATE_DIR)

  const exportStatements = []
  const graphs = []
  const renderExport = compile(await readFile(EXPORT_TPL, 'utf8'))
  const files = await readdir(SRC_DIR)

  await Promise.all(
    files.map(async (file) => {
      const inputFile = resolve(SRC_DIR, file)
      const content = await readFile(inputFile, 'utf8')

      const { data: dataSingle } = await processContent(file, content, {
        extractCss: false
      })
      const { data: dataSeparate, css } = await processContent(file, content, {
        extractCss: true
      })

      const variable = toVar(file)
      graphs.push({
        file,
        variable
      })
      exportStatements.push(
        renderExport({
          context: {
            variable,
            all: stringify(dataSingle),
            data: stringify(dataSeparate),
            css: stringify(css || '')
          }
        })
      )
    })
  )

  await writeFile(ENTRY_MODULE, exportStatements.join('\n'), 'utf8')

  const readme = await readFile(README_PATH, 'utf8')
  await writeFile(
    README_PATH,
    readme.replace(
      /<!-- assets-begin -->([\w\W]*?)<!-- assets-end -->/,
      () => `<!-- assets-begin -->\n${toDoc(graphs)}\n<!-- assets-end -->`
    )
  )

  console.log('Build complete.')
}

async function processContent (file, content, { extractCss }) {
  const result = await process(content, { extractCss })
  const { svg, css } = result
  const base = basename(file, extname(file))
  const outputDir = extractCss ? SEPARATE_DIR : DIST_DIR
  const outputSvgFile = resolve(outputDir, `${base}.svg`)
  const outputCssFile = resolve(outputDir, `${base}.css`)
  await writeFile(outputSvgFile, svg, 'utf8')
  if (extractCss) {
    await writeFile(outputCssFile, css || '', 'utf8')
  }

  return result
}

build()

function toVar (file) {
  return camelCase(basename(file, extname(file)))
}

function toDoc (graphs) {
  return graphs.sort((a, b) => a.file >= b.file ? 1 : -1).map(({ file, variable }) => `* **\`${variable}\`** (${file})

  ![${variable}](${BASE_PREVIEW_URL + file})
`).join('\n')
}
