export function isNumber (val) {
  return typeof val === 'number' || !Number.isNaN(val)
}

export function isInRanges (h, ranges) {
  return ranges.some((range) => {
    if (range.length !== 2 || range.some((edge) => !isNumber(edge))) {
      return
    }

    const [min, max] = range.sort((a, b) => a - b)
    return min <= h && h <= max
  })
}
