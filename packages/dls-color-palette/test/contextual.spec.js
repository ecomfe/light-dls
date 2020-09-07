/**
 * @file    getContextual test
 * @date    2020-09-07 14:05:13
 */
import getContextual from '../src/contextual'

const brandColor = '#0052cc'

test('get cold contextual color: info', () => {
  expect(getContextual(brandColor, 'info')).toBe('#0052cc')
})

test('get cold contextual color: success', () => {
  expect(getContextual(brandColor, 'success')).toBe('#00bf5c')
})

test('get cold contextual color: warning', () => {
  expect(getContextual(brandColor, 'warning')).toBe('#ff9100')
})

test('get cold contextual color: error', () => {
  expect(getContextual(brandColor, 'error')).toBe('#cc1800')
})
