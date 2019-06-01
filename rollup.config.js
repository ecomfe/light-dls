import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/plugin/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  plugins: [nodeResolve(), commonjs()]
}
