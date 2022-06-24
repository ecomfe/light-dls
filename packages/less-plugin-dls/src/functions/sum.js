export default function install(less, _, functions) {
  functions.add('dls-sum', (...values) => {
    const valueDic = values.reduce((acc, value) => {
      if (value.calc) {
        if (!acc.calc) {
          acc.calc = []
        }
        acc.calc.push(...value.args)
        return acc
      }
      if (value.unit) {
        const unit = value.unit.numerator[0] || ''
        if (!acc[unit]) {
          acc[unit] = 0
        }
        acc[unit] += value.value
        return acc
      }
      return acc
    }, {})

    const units = Object.keys(valueDic)
    let merged
    const nonZero = units.filter(
      (unit) => valueDic[unit] !== 0 && unit !== 'calc'
    )
    if (nonZero.length === 1) {
      // unified units
      const unit = nonZero[0]
      merged = less.dimension(valueDic[unit], unit)
    } else if (nonZero.length === 0) {
      // all zero
      merged = less.dimension(0)
    } else {
      // different units
      merged = less.call(
        'calc',
        [sumExp(nonZero.map((unit) => less.dimension(valueDic[unit], unit)))],
        0,
        // eslint-disable-next-line no-undef
        typeof fileInfo === 'undefined' ? null : fileInfo
      )
    }

    if (!units.includes('calc')) {
      return merged
    }

    return less.call(
      'calc',
      [
        sumExp([
          ...valueDic.calc,
          ...(merged.calc ? merged.args : merged.value === 0 ? [] : [merged])
        ])
      ],
      0,
      // eslint-disable-next-line no-undef
      typeof fileInfo === 'undefined' ? null : fileInfo
    )
  })

  function sumExp(operands) {
    if (operands.length < 2) {
      return operands
    }
    if (operands.length === 2) {
      return less.operation('+', operands, true)
    }
    return less.operation(
      '+',
      [sumExp(operands.slice(0, -1)), operands[operands.length - 1]],
      true
    )
  }
}
