import postcss from 'postcss'
import cssnano from 'cssnano'
import rewriteKeyframes from './rewrite-keyframes'

export async function process (cssText, id) {
  return postcss([rewriteKeyframes({ id }), cssnano()])
    .process(cssText, { from: undefined })
    .then(({ css }) => css)
    .catch((error) => {
      console.error(error)
    })
}
