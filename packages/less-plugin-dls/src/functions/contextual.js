import memoize from 'lodash.memoize'
import { rgbToHex } from 'color-converters'
import { getContextual } from 'dls-color-palette'

const getColorValue = memoize(
  (hex, type) => {
    return getContextual(hex, type)
  },
  (hex, type) => `${hex}#${type}`
)

export default function install(less, _, functions) {
  functions.add('dls-contextual', (base = {}, type = {}) => {
    if (
      !type.value ||
      ['info', 'success', 'warning', 'error'].indexOf(
        type.value.trim().toLowerCase()
      ) === -1
    ) {
      throw new Error(
        '`type` must be one of `info`, `success`, `warning` and `error`.'
      )
    }
    const color = getColorValue(rgbToHex(base.rgb), type.value)
    return less.color(color.slice(1))
  })
}
