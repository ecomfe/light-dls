export default function install(less, _, functions) {
  functions.add('dls-even', (dim) => {
    return less.dimension(even(dim.value), dim.unit.numerator[0])
  })
}

function even(val) {
  return Math.round(val / 2) * 2
}
