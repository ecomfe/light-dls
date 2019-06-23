import shade from './shade'
import contextual from './contextual'
import sum from './sum'
import lineHeight from './line-height'

export default function install (...args) {
  ;[shade, contextual, sum, lineHeight].forEach(install =>
    install.apply(this, args)
  )
}
