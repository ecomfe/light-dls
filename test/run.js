import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import less from 'less'
import strip from 'strip-css-comments'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import dls from '../dist'
const diff = require('diff')

const INCLUDE_PATH = path.resolve(__dirname, '../src')
const SPEC_DIR = path.resolve(__dirname, 'specs')
const SNAPSHOT_DIR = path.resolve(__dirname, 'snapshots')
const SRC_DIR = path.resolve(__dirname, '../tokens/components')

function logDiff (left, right) {
  diff.diffLines(left, right).forEach(item => {
    if (item.added || item.removed) {
      let text = item.value
        .replace('\n', '\u00b6\n')
        .replace('\ufeff', '[[BOM]]')
      log(chalk[item.added ? 'green' : 'red'](text))
    } else {
      let value = item.value.replace('\ufeff', '[[BOM]]')
      let lines = value.split('\n')

      // max line count for each item
      let keepLines = 6
      // lines to be omitted
      let omitLines = lines.length - keepLines
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
  let pattern = new RegExp('([^\\/\\\\]+)\\.' + ext + '$', 'i')
  let match = file.match(pattern)
  return match ? match[1] : null
}

function log (msg) {
  process.stdout.write(msg)
}

function logLine (msg) {
  log(msg + '\n')
}

function getTests (specDir) {
  /**
   * Get all modules
   */
  let modules = [
    'global',
    'functions',
    ...fs
      .readdirSync(SRC_DIR)
      .map(moduleFile => extractName(moduleFile, 'less'))
      .filter(m => m)
  ]

  /**
   * Get test suites
   */
  let suites = []
  let noTests = []

  modules.forEach(module => {
    let moduleDir = path.join(specDir, module)
    if (!fs.existsSync(moduleDir)) {
      noTests.push(module)
      return
    }
    if (fs.statSync(moduleDir).isDirectory()) {
      let files = fs.readdirSync(moduleDir)
      if (files.length === 0) {
        noTests.push(module)
      }
      files.forEach(partFile => {
        let part = extractName(partFile, 'less')
        if (!part) {
          // .css files
          return
        }
        let src = fs.readFileSync(path.resolve(moduleDir, partFile), {
          encoding: 'utf8'
        })

        let expected = ''
        if (fs.existsSync(path.resolve(moduleDir, part + '.css'))) {
          expected = fs.readFileSync(path.resolve(moduleDir, part) + '.css', {
            encoding: 'utf8'
          })
        }

        suites.push({
          title: chalk.bold(module) + chalk.white('.') + part,
          module,
          part,
          src,
          expected
        })
      })
    }
  })
  if (noTests.length) {
    logLine(
      '\u2731 No test specs found for the following module' +
        (noTests.length > 1 ? 's' : '') +
        ':\n' +
        noTests.join('\n') +
        '\n'
    )
  } else {
    logLine('\u2731 Great. Each module has got test specs.\n')
  }

  /**
   * Prepare tests
   */
  return suites.map(suite => {
    return done => {
      less
        .render(suite.src, {
          paths: [INCLUDE_PATH],
          javascriptEnabled: true,
          plugins: [dls()]
        })
        .then(
          result => {
            let passed = true
            let actual = strip(result.css, { preserve: false })
              .replace(/\n+/g, '\n')
              .replace(/^\n/, '')

            let snapshotDir = path.join(SNAPSHOT_DIR, suite.module)
            if (!fs.existsSync(snapshotDir)) {
              mkdirp.sync(snapshotDir)
            }
            fs.writeFileSync(path.join(snapshotDir, `${suite.part}.css`), actual, 'utf8')

            let expected = suite.expected
            if (actual !== expected) {
              logLine(chalk.red('\u2718 ' + suite.title))
              logDiff(actual, expected)
              passed = false
            } else {
              logLine(chalk.green('\u2714 ' + suite.title))
            }
            done(passed)
          },
          err => {
            logLine(chalk.red('\u2718 ' + suite.title))
            logLine('Less compile error:')
            logLine(err)
            done(false)
          }
        )
    }
  })
}

class TestRunner {
  constructor (tests, endCallback) {
    this.tests = tests
    this.total = tests.length
    this.failed = 0
    this.endCallback = endCallback
  }

  next () {
    let runner = this.tests.shift()
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
      logLine(
        'All ' + this.total + ' spec' + (this.total > 1 ? 's' : '') + ' passed.'
      )
    } else {
      let passed = this.total - this.failed
      logLine(
        passed +
          ' spec' +
          (passed > 1 ? 's' : '') +
          ' passed, ' +
          this.failed +
          ' spec' +
          (this.failed > 1 ? 's' : '') +
          ' failed.'
      )

      // exit with code 1
      process.on('exit', () => {
        process.reallyExit(1)
      })
    }

    this.endCallback && this.endCallback()
  }

  start () {
    this.next()
  }
}

rimraf.sync(SNAPSHOT_DIR)
new TestRunner(getTests(SPEC_DIR)).start()
