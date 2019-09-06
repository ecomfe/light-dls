import path from 'path'

const SELF_MODULE_PATH = path.resolve(__dirname, '..')
const INJECT_HINT = /@dls-|\bdls(-\w+)+\(/
const ENTRY_LESS = path.resolve(__dirname, '../tokens/index.less')

class Injector {
  process (src, extra) {
    // Don't inject self
    if (
      extra.fileInfo.filename.indexOf(SELF_MODULE_PATH) >= 0 ||
      !INJECT_HINT.test(src)
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
    let injected = `@import "${relative}";\n`
    let ignored = extra.imports.contentsIgnoredChars
    let fileInfo = extra.fileInfo
    ignored[fileInfo.filename] = ignored[fileInfo.filename] || 0
    ignored[fileInfo.filename] += injected.length
    return injected + src
  }
}

export default function inject (less, pluginManager) {
  pluginManager.addPreProcessor(new Injector())
}
