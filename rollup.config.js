import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import pkg from './package.json'
import strip from '@rollup/plugin-strip';
export default [
  // UMD for browser-friendly build
  {
    input: 'src/index.ts',
    output: {
      name: 'mep',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve({
        browser: true,
        extensions: ['.ts', '.mjs', '.js', '.json', '.node']
      }),
      commonjs(),
      typescript(),
      strip({
        labels: ['unittest']
      })
    ]
  },
  // CommonJS for Node and ES module for bundlers build
  {
    input: 'src/index.ts',
    plugins: [
      resolve({
        browser: true,
        extensions: ['.ts', '.mjs', '.js', '.json', '.node']
      }),
      commonjs(),
      typescript(),
      strip({
        include:['**/*.js','**/*.ts'],
        labels: ['unittest'],
        functions:[ 'console.*', 'assert.*' ]
      })
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
]

