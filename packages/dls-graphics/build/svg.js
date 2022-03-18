import { optimize } from 'svgo'
import { parse, stringify } from 'svgson'
import { process as processCss } from './css'
import { createHash } from 'crypto'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

const STRIP_ROOT_RE = /^[^>]*>|<[^<]*$/g

const DOMPurify = createDOMPurify(new JSDOM('').window)

function getSVGOConfig ({ id }) {
  return {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
            inlineStyles: false,
            convertStyleToAttrs: false,
            minifyStyles: false,
            removeDimensions: false,
            cleanupIDs: {
              prefix: `dls-${id}-`
            }
          }
        }
      },
      {
        name: 'sortAttrs'
      }
    ]
  }
}

export async function process (
  content,
  { extractCss = false }
) {
  const shasum = createHash('sha1')
  shasum.update(content)
  const id = shasum.digest('hex').substring(0, 5)

  try {
    const { data: optimized } = await optimize(content, getSVGOConfig({ id }))
    const el = await parse(optimized)

    const styleContents = []

    await walkElement(el, {
      async enter (node) {
        if (node.name === 'style') {
          const [textNode] = node.children
          if (textNode && textNode.value) {
            if (extractCss) {
              styleContents.push(textNode.value)
              const { parentNode } = node
              parentNode.children.splice(parentNode.children.indexOf(node), 1)
            } else {
              textNode.value = await processCss(textNode.value, id)
            }
          }
        }
      }
    })

    await walkElement(el, {
      async enter (node) {
        const { style } = node.attributes
        if (style) {
          node.attributes.style = await processCss(style, id)
        }
      }
    })

    const svg = DOMPurify.sanitize(stringify(el), {
      USE_PROFILES: { svg: true }
    })
    const css = styleContents.length
      ? await processCss(styleContents.join(''), id)
      : null

    const { xmlns, ...attrs } = { ...el.attributes }
    const data = {
      contents: svg.replace(STRIP_ROOT_RE, ''),
      attrs
    }

    return {
      svg,
      css,
      data
    }
  } catch (e) {
    console.error(e)
  }
}

async function walkElement (el, { enter, leave }) {
  if (typeof enter === 'function') {
    await enter(el)
  }
  if (el.children && el.children.length) {
    for (const child of el.children) {
      child.parentNode = el
      await walkElement(child, { enter, leave })
      delete child.parentNode
    }
  }
  if (typeof leave === 'function') {
    await leave(el)
  }
}
