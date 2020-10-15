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
const SEPARATED_DIR = resolve(__dirname, '../dist/separated')

const ENTRY_MODULE = resolve(DIST_DIR, 'index.js')
const EXPORT_TPL = resolve(__dirname, './export.ejs')

function clearDir (dir) {
  rimraf.sync(dir)
  mkdirp.sync(dir)
}

async function build () {
  clearDir(DIST_DIR)
  clearDir(SEPARATED_DIR)

  const renderExport = compile(await readFile(EXPORT_TPL, 'utf8'))
  const exports = []
  const files = await readdir(SRC_DIR)

  await Promise.all(files.map(async file => {
    const inputFile = resolve(SRC_DIR, file)
    const content = await readFile(inputFile, 'utf8')

    const data = await processContent(file, content, { extractCss: false })
    await processContent(file, content, { extractCss: true })

    const variable = camelCase(basename(file, extname(file)))
    exports.push(renderExport({ variable, data: stringify(data) }))
  }))

  await writeFile(ENTRY_MODULE, exports.join('\n'), 'utf8')

  console.log('Build complete.')
}

async function processContent (file, content, { extractCss }) {
  const { svg, css, data } = await process(content, { extractCss })
  const base = basename(file, extname(file))
  const outputDir = extractCss ? SEPARATED_DIR : DIST_DIR
  const outputSvgFile = resolve(outputDir, `${base}.svg`)
  const outputCssFile = resolve(outputDir, `${base}.css`)
  await writeFile(outputSvgFile, svg, 'utf8')
  if (css) {
    await writeFile(outputCssFile, css, 'utf8')
  }

  return data
}

build()
