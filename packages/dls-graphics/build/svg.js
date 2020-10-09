import Svgo from 'svgo'
import { parse, stringify } from 'svgson'
import { process as processCss } from './css'
import { createHash } from 'crypto'

const svgo = new Svgo({
  plugins: [
    { removeViewBox: false },
    { inlineStyles: false },
    { convertStyleToAttrs: false },
    { minifyStyles: false },
    { sortAttrs: true },
    { removeDimensions: false }
  ]
})

export async function process (content, { extractCss = false }) {
  const shasum = createHash('sha1')
  shasum.update(content)
  const id = shasum.digest('hex').substring(0, 5)

  try {
    const { data } = await svgo.optimize(content)
    const el = await parse(data)

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

    const svg = stringify(el)
    const css = styleContents.length
      ? await processCss(styleContents.join(''), id)
      : null

    return {
      svg,
      css
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
