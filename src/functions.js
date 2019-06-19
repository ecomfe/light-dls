import shade from './shade'
import contextual from './contextual'
import sum from './sum'

export default {
  install (...args) {
    shade(...args)
    contextual(...args)
    sum(...args)
  }
}
