import fs from 'fs'
import { resolve, basename, extname } from 'path'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import { process } from './svg'

const { readdir, readFile, writeFile } = fs.promises

const SRC_DIR = resolve(__dirname, '../src')
const DIST_DIR = resolve(__dirname, '../dist')
const SEPARATED_DIR = resolve(__dirname, '../dist/separated')

function clearDir (dir) {
  rimraf.sync(dir)
  mkdirp.sync(dir)
}

async function build () {
  clearDir(DIST_DIR)
  clearDir(SEPARATED_DIR)

  const files = await readdir(SRC_DIR)

  await Promise.all(files.map(async file => {
    const inputFile = resolve(SRC_DIR, file)
    const content = await readFile(inputFile, 'utf8')

    return Promise.all([
      processContent(file, content, { extractCss: false }),
      processContent(file, content, { extractCss: true })
    ])
  }))

  console.log('Build complete.')
}

async function processContent (file, content, { extractCss }) {
  const { svg, css } = await process(content, { extractCss })
  const base = basename(file, extname(file))
  const outputDir = extractCss ? SEPARATED_DIR : DIST_DIR
  const outputSvgFile = resolve(outputDir, `${base}.svg`)
  const outputCssFile = resolve(outputDir, `${base}.css`)
  await writeFile(outputSvgFile, svg, 'utf8')
  if (css) {
    await writeFile(outputCssFile, css, 'utf8')
  }
}

build()
