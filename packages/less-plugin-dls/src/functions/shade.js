import kolor from 'kolor'
import memoize from 'lodash.memoize'
import { isNumber } from '../utils'

const BASE_LEVEL = 7
const DARK_B_MAXES = [85, 65, 40]
const LIGHT_B_STEP = 20
const B_MAX = 100
const B_MIN = 0
const S_MAX = 100
const S_MIN = 5
const B_CLAMP_S_DEVIATION_RATIO = 0.2
const LOW_S_DEVIATION_RATIO = 0.4
const S_COEF = 3.2

function clamp (value, min, max) {
  if (min > max) {
    [min, max] = [max, min]
  }
  return Math.min(max, Math.max(min, value))
}

function getBrightness (base, level) {
  if (level === BASE_LEVEL) {
    return base
  }

  // dark shades
  if (level > BASE_LEVEL) {
    if (base <= B_MIN) {
      return base
    }

    return (
      B_MIN +
      ((DARK_B_MAXES[level - BASE_LEVEL - 1] - B_MIN) * (base - B_MIN)) /
        (B_MAX - B_MIN)
    )
  }

  // light shades
  return base + (BASE_LEVEL - level) * LIGHT_B_STEP
}

function getSatuation (base, level) {
  if (level === BASE_LEVEL) {
    return base
  }

  // light shades
  if (level > BASE_LEVEL) {
    level--
  }

  let pl = BASE_LEVEL - 1
  const portion =
    (S_COEF * level * level +
      ((100 - (pl * pl - 1) * S_COEF) * level) / (pl - 1) +
      ((pl * pl - 1) * S_COEF - 100) / (pl - 1) -
      S_COEF) /
    100

  if (base > S_MIN) {
    return (base - S_MIN) * portion + S_MIN
  }

  return portion * base
}

function getShade ([h, rawS, rawB], level) {
  const s = rawS * 100
  const b = rawB * 100

  if (level === BASE_LEVEL) {
    return [h, s, b]
  }

  let brightness = getBrightness(b, level)
  let deviation =
    s > 0 ? ((Math.log2(100 / s) * s) / 100) * s * LOW_S_DEVIATION_RATIO : 0

  if (level < BASE_LEVEL) {
    let bPrev = getBrightness(b, BASE_LEVEL - 1)
    // brightness may be clamped
    deviation +=
      bPrev > B_MAX
        ? ((bPrev - B_MAX) / LIGHT_B_STEP) * B_CLAMP_S_DEVIATION_RATIO * s
        : 0
  }

  let saturation = getSatuation(s - deviation, level)

  return [h, clamp(saturation, 0, S_MAX), clamp(brightness, B_MIN, B_MAX)]
}

function normalize ([h, s, b]) {
  return [Math.round(h), Math.round(s) / 100, Math.round(b) / 100]
}

const getColorValue = memoize((rgb, level) => {
  const color = normalize(
    getShade(
      kolor
        .rgb(rgb)
        .hsv()
        .toArray(),
      level
    )
  )

  return kolor
    .hsv(color)
    .hex()
    .slice(1)
}, (rgb, level) => `${rgb}#${level}`)

export default function install (less, _, functions) {
  functions.add('dls-shade', (base = {}, level = {}) => {
    if (!isNumber(level.value) || level.value < 1 || level.value > 10) {
      throw new Error('`level` should be a number that ≥ 1 and ≤ 10.')
    }

    return less.color(getColorValue(base.rgb, level.value))
  })
}
