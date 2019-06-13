import kolor from 'kolor'
import { isInRanges } from './utils'

const COLD_RANGES = [[64, 320]]

const CONTEXTUAL_RANGES = {
  info: [[215, 215]],
  success: [[95, 125]],
  warning: [[18, 24]],
  error: [[0, 5], [355, 360]]
}

const CONTEXTUAL_COLORS = {
  cold: {
    info: [215, 75, 95],
    success: [125, 70, 75],
    warning: [18, 70, 95],
    error: [355, 70, 90]
  },
  warm: {
    info: [215, 75, 95],
    success: [95, 70, 75],
    warning: [24, 75, 95],
    error: [5, 70, 90]
  }
}

function isCold (h) {
  return isInRanges(h, COLD_RANGES)
}

function isInContextualRanges (h, type) {
  return isInRanges(h, CONTEXTUAL_RANGES[type])
}

function getContextual (color, type) {
  const [h] = color
  if (isInContextualRanges(h, type)) {
    return [...color]
  }

  return (isCold(h) ? CONTEXTUAL_COLORS.cold : CONTEXTUAL_COLORS.warm)[
    type
  ].map((v, i) => (i === 0 ? v : v / 100))
}

export default function shade (less, pluginManager, functions) {
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

    const color = getContextual(
      kolor
        .rgb(base.rgb)
        .hsv()
        .toArray(),
      type.value
    )

    return less.color(
      kolor
        .hsv(color)
        .hex()
        .slice(1)
    )
  })
}
