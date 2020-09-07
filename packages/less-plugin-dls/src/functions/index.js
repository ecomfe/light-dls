import shade from './shade'
import contextual from './contextual'
import sum from './sum'
import even from './even'
import lineHeight from './line-height'

export default function install (...args) {
  ;[shade, contextual, sum, even, lineHeight].forEach(install =>
    install.apply(this, args)
  )
}
