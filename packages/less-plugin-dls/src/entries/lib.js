import enhancers from '../enhancers'
import functions from '../functions'

export default {
  install(...args) {
    enhancers.apply(this, args)
    functions.apply(this, args)
  }
}
