import { toggleClass } from '../../src/basic/dom'

describe('utils/dom', () => {
  it('should toggle classes correctly', () => {
    let el = document.createElement('div')
    el.className = 'a  b    c d  '
    document.body.appendChild(el)

    toggleClass(el, 'a')
    toggleClass(el, 'b', true)
    toggleClass(el, 'c')
    toggleClass(el, 'd')
    toggleClass(el, 'e')
    toggleClass(el, 'f', true)
    toggleClass(el, 'g', false)
    expect(el.classList.contains('a')).toBe(false)
    expect(el.classList.contains('b')).toBe(true)
    expect(el.classList.contains('c')).toBe(false)
    expect(el.classList.contains('d')).toBe(false)
    expect(el.classList.contains('e')).toBe(true)
    expect(el.classList.contains('f')).toBe(true)
    expect(el.classList.contains('g')).toBe(false)

    el.parentNode!.removeChild(el)
  })
});
