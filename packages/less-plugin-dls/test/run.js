import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import less3 from 'less3'
import less from 'less'
import strip from 'strip-css-comments'
import arg from 'arg'
import dls from '../dist'
const diff = require('diff')

const args = arg(
  {
    '--update-snapshots': Boolean,
    '-u': '--update-snapshots'
  }
)

const snapshotUpdated = {}

const INCLUDE_PATH = path.resolve(__dirname, '../src')
const SPEC_DIR = path.resolve(__dirname, 'specs')
const SRC_DIR = path.resolve(__dirname, '../tokens')
const SRC_COMPONENTS_DIR = path.resolve(SRC_DIR, 'components')
const MANUAL_SPEC_MODULES = ['functions', 'global', 'ai']
const VAR_DEF_RE = /@([a-z]+(?:-[a-z0-9]+)*)\s*:/g

function extractVarDefs (file) {
  const content = fs.readFileSync(file, 'utf8')
  const varDefs = []
  let match
  while ((match = VAR_DEF_RE.exec(content)) !== null) {
    varDefs.push(match[1])
  }

  return varDefs
}

function logDiff (left, right) {
  diff.diffLines(left, right).forEach(item => {
    if (item.added || item.removed) {
      const text = item.value
        .replace('\n', '\u00b6\n')
        .replace('\ufeff', '[[BOM]]')
      log(chalk[item.added ? 'green' : 'red'](text))
    } else {
      const value = item.value.replace('\ufeff', '[[BOM]]')
      const lines = value.split('\n')

      // max line count for each item
      const keepLines = 6
      // lines to be omitted
      const omitLines = lines.length - keepLines
      if (lines.length > keepLines) {
        lines.splice(
          Math.floor(keepLines / 2),
          omitLines,
          chalk.gray('(...' + omitLines + ' lines omitted...)')
        )
      }
      log(lines.join('\n'))
    }
  })
  log('\n')
}

function extractName (file, ext) {
  const pattern = new RegExp('([^\\/\\\\]+)\\.' + ext + '$', 'i')
  const match = file.match(pattern)
  return match ? match[1] : null
}

function log (msg) {
  process.stdout.write(msg)
}

function logLine (msg) {
  log(msg + '\n')
}

function getTests () {
  /**
   * Get all modules
   */
  const modules = [
    ...MANUAL_SPEC_MODULES,
    ...fs
      .readdirSync(SRC_COMPONENTS_DIR)
      .map(moduleFile => extractName(moduleFile, 'less'))
      .filter(m => m)
  ]

  /**
   * Get tests
   */
  const tests = []
  const noTests = []

  for (const module of modules) {
    const moduleDir = path.resolve(SPEC_DIR, module)
    if (!fs.existsSync(moduleDir)) {
      noTests.push(module)
      continue
    }
    if (fs.statSync(moduleDir).isDirectory()) {
      const files = fs.readdirSync(moduleDir)
      if (files.length === 0) {
        noTests.push(module)
      }
      for (const partFile of files) {
        const part = extractName(partFile, 'less')
        if (!part) {
          // .css files
          continue
        }

        const specFile = path.resolve(moduleDir, partFile)

        const srcFile = !MANUAL_SPEC_MODULES.includes(module)
        ? path.resolve(SRC_COMPONENTS_DIR, module + '.less')
        : module === 'global'
        ? path.resolve(SRC_DIR, 'global.less')
        : module === 'ai'
        ? path.resolve(SRC_DIR, 'themes/ai.less')
        : null

        if (args['--update-snapshots']) {
          if (srcFile) {
            const vars = extractVarDefs(srcFile)
            if (vars.length) {
              fs.writeFileSync(specFile, 'div {\n' + vars.map(v => `  -${v}: @${v};`).join('\n') + '\n}\n')
            }
          }
        }
        const src = fs.readFileSync(specFile, 'utf8')

        let expected = ''
        if (fs.existsSync(path.resolve(moduleDir, part + '.css'))) {
          expected = fs.readFileSync(path.resolve(moduleDir, part) + '.css', 'utf8')
        }

        tests.push({
          title: chalk.bold(module) + chalk.white('.') + part,
          module,
          part,
          src,
          theme: module === 'ai' ? 'ai' : null,
          expected
        })
      }
    }
  }
  if (noTests.length) {
    logLine(`\u2731 No test specs found for the following module${noTests.length > 1 ? 's' : ''}:\n${noTests.join('\n')}\n`)
  } else {
    logLine('\u2731 Great. Each module has got test specs.\n')
  }

  return tests
}

function getSuite (name, tests, { less }) {

  /**
   * Prepare tests
   */
  return {
    name,
    tests: tests.map(test => {
      return done => {
        less
          .render(test.src, {
            paths: [INCLUDE_PATH],
            javascriptEnabled: true,
            plugins: [dls({ theme: test.theme })]
          })
          .then(
            result => {
              let passed = true
              const actual = strip(result.css, { preserve: false })
                .replace(/\n+/g, '\n')
                .replace(/^\n/, '')

              // should only update snapshots once for each test
              if (args['--update-snapshots'] && !snapshotUpdated[test.title]) {
                snapshotUpdated[test.title] = true

                const moduleDir = path.resolve(SPEC_DIR, test.module)
                fs.writeFileSync(path.resolve(moduleDir, `${test.part}.css`), actual, 'utf8')
                test.expected = actual
              }

              const expected = test.expected
              if (actual !== expected) {
                logLine(chalk.red('\u2718 ' + test.title))
                logDiff(actual, expected)
                passed = false
              } else {
                logLine(chalk.green('\u2714 ' + test.title))
              }
              done(passed)
            },
            err => {
              logLine(chalk.red('\u2718 ' + test.title))
              logLine('Less compile error:')
              logLine(err)
              done(false)
            }
          )
      }
    })
  }
}

class TestRunner {
  constructor ({ name, tests }, done) {
    this.name = name
    this.tests = tests
    this.total = tests.length
    this.failed = 0
    this.done = done
  }

  next () {
    const runner = this.tests.shift()
    if (runner) {
      runner(passed => {
        if (!passed) {
          this.failed++
        }
        this.next()
      })
      return
    }
    this.end()
  }

  end () {
    logLine('\n--------\n')
    if (!this.failed) {
      logLine(`All ${this.total} spec${this.total > 1 ? 's' : ''} passed.`)
    } else {
      const passed = this.total - this.failed
      logLine(`${passed} spec${passed > 1 ? 's' : ''} passed, ${this.failed} spec${this.failed > 1 ? 's' : ''} failed.`)

      // exit with code 1
      process.on('exit', () => {
        process.reallyExit(1)
      })
    }

    logLine(`Time elapsed: ${Date.now() - this.startTime}ms.`)

    this.done && this.done()
  }

  start () {
    logLine(`Start test suite [${this.name}]...`)
    this.startTime = Date.now()
    this.next()
  }
}

async function runSuite (suite) {
  return new Promise(resolve => {
    new TestRunner(suite, resolve).start()
  })
}

async function run () {
  const tests = getTests()

  await runSuite(getSuite('less@3', tests, { less: less3 }))
  logLine('\n========\n')
  await runSuite(getSuite('less@4', tests, { less }))
}

run()
