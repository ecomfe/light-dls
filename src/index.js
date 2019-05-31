import shade from './shade'
import contextual from './contextual'

export default {
  install (...args) {
    shade(...args)
    contextual(...args)
  }
}
