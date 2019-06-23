import inject from '../inject'
import enhancers from '../enhancers'
import functions from '../functions'

class Plugin {
  constructor (options) {
    this.options = options
  }

  install (...args) {
    inject.apply(this, args)
    enhancers.apply(this, args)
    functions.apply(this, args)
  }
}

export default function dls (options) {
  return new Plugin(options)
}
