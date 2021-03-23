import less from 'less'

export class VariablesOutputVisitor {
  constructor () {
    this.native = new less.visitors.Visitor(this)
  }

  run (root) {
    // `-dls` prefixed variables are private
    this.variables = Object.keys(root.variables()).filter(
      v => v.charAt(1) !== '-'
    )
    return this.native.visit(root)
  }
}
