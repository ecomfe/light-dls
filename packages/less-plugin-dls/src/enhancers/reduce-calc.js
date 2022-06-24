import reduce from 'reduce-css-calc'
import memoize from 'lodash.memoize'

const reduceMemo = memoize(reduce)

export default function install(less) {
  const { reduceCalc = true } = this.options || {}

  if (reduceCalc) {
    // Overriding `Call.prototype.genCSS`
    const { genCSS } = less.tree.Call.prototype
    less.tree.Call.prototype.genCSS = function (context, output) {
      if (this.calc) {
        const buffer = []
        const proxy = {
          add: (chunk) => buffer.push(chunk),
          isEmpty: () => buffer.length === 0
        }
        genCSS.call(this, context, proxy)
        output.add(reduceMemo(buffer.join('')))
        return
      }

      genCSS.call(this, context, output)
    }
  }
}
