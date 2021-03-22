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

export class VariableInterpolationVisitor {
  constructor () {
    this.native = new less.visitors.Visitor(this)
    this.isPreEvalVisitor = true
    this.variableInterpolations = new Set()
  }

  run (root) {
    return this.native.visit(root)
  }

  visitVariable (node) {
    if (node.name.indexOf('@@') === 0) {
      this.variableInterpolations.add(node.name.slice(2))
    }
  }
}
