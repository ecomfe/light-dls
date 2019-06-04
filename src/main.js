import inject from './inject'
import shade from './shade'
import contextual from './contextual'

class Plugin {
  constructor (options) {
    this.options = options
  }

  install (...args) {
    inject.apply(this, args)
    shade.apply(this, args)
    contextual.apply(this, args)
  }
}

export default function dls (options) {
  return new Plugin(options)
}
