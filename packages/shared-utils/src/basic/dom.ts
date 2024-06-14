import { uniq, findIndex } from 'lodash'

export function focus (elem: NonNullable<any>) {
  if (!elem || typeof elem.focus !== 'function') {
    return
  }
  elem.focus()
}

/**
 * 判断一个元素是否匹配某个指定的选择器。

 * @param {Element} elem 指定元素
 * @param {string} selector 选择器字符串
 * @return {boolean} 是否匹配
 */
 export function matches (elem: Element, selector: string) {
  return (
    elem.matches ||
    //@ts-ignore
    elem.matchesSelector ||
    //@ts-ignore
    elem.mozMatchesSelector ||
    //@ts-ignore
    elem.msMatchesSelector ||
    //@ts-ignore
    elem.oMatchesSelector ||
    elem.webkitMatchesSelector
  ).call(elem, selector)
}

const FOCUSABLE_SELECTOR = `
a[href],
area[href],
input:not([disabled]),
select:not([disabled]),
textarea:not([disabled]),
button:not([disabled]),
iframe,
[tabindex],
[contentEditable=true]`

function isPreventFocus (el: HTMLElement) {
  return (
    !matches(el, '[tabindex="-1"]') &&
    (el.offsetWidth || el.offsetHeight || el.getClientRects().length)
  )
}

/**
 * 获取目标元素下所有可以获取焦点的元素
 *
 * @param {Element} elem 需要查找的目标元素
 * @param {string=} selector 可选的用于查找的选择器
 * @returns {Array.<Element>} 可以获取焦点的元素数组
 */
 export function getFocusable (elem: Element, selector = FOCUSABLE_SELECTOR) {
  return ([...elem.querySelectorAll(selector)] as HTMLElement[]).filter(isPreventFocus)
}

/**
 * 将焦点移入指定元素内的第一个可聚焦的元素
 *
 * @param {Element} elem 需要查找的指定元素
 * @param {number=} index 聚焦元素在可聚焦元素的位置
 * @param {Boolean=} ignoreAutofocus 是否忽略 autofocus
 * @returns {Boolean} 是否找到可聚焦的元素
 */
 export function focusIn (elem: Element, index = 0, ignoreAutofocus = false) {
  if (!ignoreAutofocus) {
    let auto =
      getFocusable(elem, '[data-autofocus]')[0] ||
      getFocusable(elem, '[autofocus]')[0]
    if (auto) {
      focus(auto)
      return true
    }
  }

  let focusable = getFocusable(elem)
  if (index === 0) {
    let first = focusable[0]
    if (first) {
      focus(first)
      return true
    }
  }

  let count = focusable.length
  if (!count) {
    return false
  }

  focus(focusable[(index + count) % count])
  return true
}

/**
 * 切换指定元素的某个类名
 *
 * @param {HTMLElement} el 目标元素
 * @param {string} className 需要切换的类名
 * @param {boolean} force 强制添加/删除，为 true 则添加，为 false 则删除
 */
 export function toggleClass (el: HTMLElement, className: string, force?: boolean) {
  if (el.classList) {
    return el.classList.toggle(className, force)
  }

  let klass = el.getAttribute('class') || ''
  let klasses = uniq(klass.trim().split(/\s+/))
  let index = findIndex(klasses, k => k === className)
  if (index !== -1) {
    if (force === true) {
      return
    }
    klasses.splice(index, 1)
    el.setAttribute('class', klasses.join(' '))
    return
  }

  if (force === false) {
    return
  }
  el.setAttribute('class', klasses.concat([className]).join(' '))
}
