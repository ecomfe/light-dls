import path from 'path'
import fs from 'fs'

const SELF_MODULE_PATH = path.resolve(__dirname, '..')
const ENTRY_LESS = path.resolve(__dirname, '../tokens/index.less')
const THEME_DIR = path.resolve(__dirname, '../tokens/themes')

class Injector {
  constructor ({ theme }) {
    this.theme = theme
  }

  process(src, extra) {
    // Don't inject self
    if (
      extra.fileInfo.filename !== 'input' &&
      path
        .resolve(process.cwd(), extra.fileInfo.filename)
        .indexOf(SELF_MODULE_PATH) >= 0
    ) {
      return src
    }

    let relative = path.relative(
      path.dirname(extra.fileInfo.filename),
      ENTRY_LESS
    )

    const themeLess = path.resolve(THEME_DIR, `${this.theme}.less`)
    let themeRelative = fs.existsSync(themeLess) ? path.relative(
      path.dirname(extra.fileInfo.filename),
      themeLess
    ) : null

    // less requires relative path to starts with ./
    if (relative.charAt(0) !== '.') {
      relative = `./${relative}`
    }
    if (themeRelative && themeRelative.charAt(0) !== '.') {
      themeRelative = `./${themeRelative}`
    }

    let injected = `@import "${relative}";\n`
    injected += themeRelative ? `@import "${themeRelative}";\n` : ''

    const ignored = extra.imports.contentsIgnoredChars
    const fileInfo = extra.fileInfo
    ignored[fileInfo.filename] = ignored[fileInfo.filename] || 0
    ignored[fileInfo.filename] += injected.length
    return injected + src
  }
}

export default function inject(_, pluginManager) {
  const { inject = true, theme } = this.options || {}

  if (inject) {
    pluginManager.addPreProcessor(new Injector({ theme }))
  }
}
