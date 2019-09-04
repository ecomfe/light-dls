import arg from 'arg'
import { resolve } from 'path'
import check from './commands/check'

const DEFAULT_DIR = '.'
const DEFAULT_EXCLUDE = 'node_modules,test'

export function cli (args) {
  const options = parseArgs(args)

  switch (options.command) {
    case 'check':
      check(options)
      break
    default:
      break
  }
}

function parseArgs (rawArgs) {
  const args = arg(
    {
      '--dir': String,
      '--components': Boolean,
      '--exclude': String,
      '--output': String,
      '-d': '--dir',
      '-c': '--components',
      '-x': '--exclude',
      '-o': '--output'
    },
    {
      argv: rawArgs.slice(2)
    }
  )

  return {
    command: args._[0],
    dir: resolve(args['--dir'] || DEFAULT_DIR),
    exclude: (args['--exclude'] || DEFAULT_EXCLUDE).split(','),
    componentsOnly: args['--components'],
    output: args['--output'] || false
  }
}
