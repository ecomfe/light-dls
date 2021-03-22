import path from 'path'

const SELF_MODULE_PATH = path.resolve(__dirname, '..')
const ENTRY_LESS = path.resolve(__dirname, '../tokens/index.less')

class Injector {
  process (src, extra) {
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
    // less requires relative path to starts with ./
    if (relative.charAt(0) !== '.') {
      relative = `./${relative}`
    }
    const injected = `@import "${relative}";\n`
    const ignored = extra.imports.contentsIgnoredChars
    const fileInfo = extra.fileInfo
    ignored[fileInfo.filename] = ignored[fileInfo.filename] || 0
    ignored[fileInfo.filename] += injected.length
    return injected + src
  }
}

export default function inject (_, pluginManager) {
  const { inject = true } = this.options || {}

  if (inject) {
    pluginManager.addPreProcessor(new Injector())
  }
}
