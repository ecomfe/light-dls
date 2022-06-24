import { isInRanges, hexToHsv, hsvToHex } from './utils'

const CONTEXTUAL_RANGES = {
  info: [[210, 225]],
  success: [[95, 155]],
  warning: [[30, 45]],
  error: [
    [0, 10],
    [350, 360]
  ]
}

const CONTEXTUAL_COLORS = {
  info: [216, 100, 80],
  success: [149, 100, 75],
  warning: [34, 100, 100],
  error: [7, 100, 80]
}

function isInContextualRanges(h, type) {
  return isInRanges(h, CONTEXTUAL_RANGES[type])
}

export default function getContextual(color, type) {
  if (
    !type ||
    ['info', 'success', 'warning', 'error'].indexOf(
      type.trim().toLowerCase()
    ) === -1
  ) {
    throw new Error(
      '`type` must be one of `info`, `success`, `warning` or `error`.'
    )
  }
  const [h] = hexToHsv(color)
  if (isInContextualRanges(h, type)) {
    return color
  }

  return hsvToHex(CONTEXTUAL_COLORS[type])
}
