/**
 * @file    rollup config
 * @date    2020-09-04 14:43:26
 */
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'es/index.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'es/index.min.js',
      format: 'esm',
      sourcemap: true,
      plugins: [terser()]
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.min.js',
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
      babelHelpers: 'runtime',
      exclude: 'node_modules/**'
    })
  ],
  external: [/@babel\/runtime/]
}
