import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'

const ENTRIES = ['main', 'lib']

export default ENTRIES.map((entry) => ({
  input: `src/entries/${entry}.js`,
  output: {
    file: `dist/${entry}.js`,
    format: 'cjs',
    exports: 'auto'
  },
  external: ['path', 'fs'],
  plugins: [nodeResolve(), commonjs()]
}))
