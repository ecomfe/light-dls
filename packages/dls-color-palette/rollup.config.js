import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.min.js',
      format: 'esm',
      sourcemap: true,
      plugins: [terser()]
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.cjs.min.js',
      format: 'cjs',
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      // see https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
      babelHelpers: 'bundled'
      // exclude: 'node_modules/**' is not set because color-converters need to be transform
    })
  ]
  // external: [/@babel\/runtime/] is not set to prevent @babel/runtime version conflicts
}
