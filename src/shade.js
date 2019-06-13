import kolor from 'kolor'
import { isNumber } from './utils'

const S_MAX = 100
const S_MIN = 5
const S_INC_STEP = 5

const B_MAX = 100
const B_MIN = 0
const B_INC_STEP = 5
const B_DEC_STEP = 15

const H_STEP = 1

function wrap (value, min, max) {
  if (min > max) {
    max = min + max
    min = max - min
    max = max - min
  }
  const period = max - min
  return min + (((value % period) + period) % period)
}

function deg (value) {
  return wrap(value, 0, 360)
}

function getShade ([h, rawS, rawB], level) {
  const s = rawS * 100
  const b = rawB * 100
  const sDecStep = Math.round(s / 5)

  if (level <= 5) {
    let i = level - 1
    return [
      deg(Math.round(h + (5 - i) * H_STEP)),
      Math.round(Math.max(S_MIN, s - (5 - i) * sDecStep)) / 100,
      Math.round(Math.min(B_MAX, b + (5 - i) * B_INC_STEP)) / 100
    ]
  } else if (level === 6) {
    return [Math.round(h), Math.round(s) / 100, Math.round(b) / 100]
  } else {
    let i = level - 6
    return [
      deg(Math.round(h - i * H_STEP)),
      Math.round(Math.min(S_MAX, s + i * S_INC_STEP)) / 100,
      Math.round(Math.max(B_MIN, b - i * B_DEC_STEP)) / 100
    ]
  }
}

export default function shade (less, pluginManager, functions) {
  functions.add('dls-shade', (base = {}, level = {}) => {
    if (!isNumber(level.value) || level.value < 1 || level.value > 10) {
      throw new Error('`level` should be a number that ≥ 1 and ≤ 10.')
    }

    const color = getShade(
      kolor
        .rgb(base.rgb)
        .hsv()
        .toArray(),
      level.value
    )

    return less.color(
      kolor
        .hsv(color)
        .hex()
        .slice(1)
    )
  })
}
