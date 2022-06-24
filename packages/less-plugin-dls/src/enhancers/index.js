import reduceCalc from './reduce-calc'

export default function install(...args) {
  ;[reduceCalc].forEach((install) => install.apply(this, args))
}
