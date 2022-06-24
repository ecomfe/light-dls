import { hexToRgb, rgbToHsv, hsvToRgb, rgbToHex } from 'color-converters'

export function isNumber(val) {
  return typeof val === 'number' || !Number.isNaN(val)
}

export function isInRanges(h, ranges) {
  return ranges.some((range) => {
    if (range.length !== 2 || range.some((edge) => !isNumber(edge))) {
      return false
    }

    const [min, max] = range.sort((a, b) => a - b)
    return min <= h && h <= max
  })
}

export function normalizeHsv([h, s, b]) {
  return [h, s / 100, b / 100]
}

export function hexToHsv(v) {
  return rgbToHsv(hexToRgb(v))
}

export function hsvToHex(v) {
  return rgbToHex(hsvToRgb(normalizeHsv(v)))
}
