import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default [
  {
    input: 'src/main.js',
    output: {
      file: 'dist/main.js',
      format: 'cjs'
    },
    plugins: [nodeResolve(), commonjs()]
  },
  {
    input: 'src/functions.js',
    output: {
      file: 'dist/functions.js',
      format: 'cjs'
    },
    plugins: [nodeResolve(), commonjs()]
  }
]
