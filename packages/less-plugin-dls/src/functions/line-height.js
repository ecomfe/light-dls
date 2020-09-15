export default function install (less, _, functions) {
  functions.add('dls-line-height', (lineHeight, fontSize) => {
    if (lineHeight.unit) {
      const unit = lineHeight.unit.numerator[0] || ''
      if (unit === '') {
        // pure number
        return less.dimension(
          lineHeight.value * fontSize.value,
          fontSize.unit.numerator[0]
        )
      }
      if (unit === '%') {
        return less.dimension(
          (lineHeight.value / 100) * fontSize.value,
          fontSize.unit.numerator[0]
        )
      }
      return lineHeight
    }
    return lineHeight
  })
}
