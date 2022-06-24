import memoize from 'lodash.memoize'
import { rgbToHex } from 'color-converters'
import { getShade } from 'dls-color-palette'
import { isNumber } from '../utils'

const getColorValue = memoize(
  (hex, level) => {
    return getShade(hex, level)
  },
  (hex, level) => `${hex}#${level}`
)

export default function install(less, _, functions) {
  functions.add('dls-shade', (base = {}, level = {}) => {
    if (!isNumber(level.value) || level.value < 1 || level.value > 10) {
      throw new Error('`level` should be a number that ≥ 1 and ≤ 10.')
    }
    const color = getColorValue(rgbToHex(base.rgb), level.value)
    return less.color(color.slice(1))
  })
}
