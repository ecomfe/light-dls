/**
 * @file    test for getShade
 * @date    2020-09-04 18:00:24
 */
import { getShade } from '../src/index'

test('getShades', () => {
  const brandColor = '#0052cc'
  expect(getShade(brandColor, 1)).toBe('#f2f7ff')
  expect(getShade(brandColor, 2)).toBe('#e0edff')
  expect(getShade(brandColor, 3)).toBe('#bfd9ff')
  expect(getShade(brandColor, 4)).toBe('#8fbcff')
  expect(getShade(brandColor, 5)).toBe('#4f95ff')
  expect(getShade(brandColor, 6)).toBe('#0066ff')
  expect(getShade(brandColor, 7)).toBe('#0052cc')
  expect(getShade(brandColor, 8)).toBe('#0045ad')
  expect(getShade(brandColor, 9)).toBe('#003585')
  expect(getShade(brandColor, 10)).toBe('#002152')
})

test('getShade: level=7 equals to brandColor', () => {
  const brandColor = '#BD8552'
  expect(getShade(brandColor, 7)).toBe(brandColor)
})
