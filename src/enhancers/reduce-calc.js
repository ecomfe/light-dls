import reduce from 'reduce-css-calc'

export default function install (less) {
  const { reduceCalc = true } = this.options || {}

  if (reduceCalc) {
    // Overriding `Call.prototype.genCSS`
    const { genCSS } = less.tree.Call.prototype
    less.tree.Call.prototype.genCSS = function (context, output) {
      if (this.calc) {
        let buffer = []
        const proxy = {
          add: chunk => buffer.push(chunk),
          isEmpty: () => buffer.length === 0
        }
        genCSS.call(this, context, proxy)
        output.add(reduce(buffer.join('')))
        return
      }

      genCSS.call(this, context, output)
    }
  }
}
