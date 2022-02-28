import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import pkg from './package.json'
import strip from '@rollup/plugin-strip';
import dts from "rollup-plugin-dts";
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
      typescript({ tsconfig: './tsconfig.json' }),
      // dts(),
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
      typescript({ tsconfig: './tsconfig.json' }),
      // dts(),
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  },
  {
    input: 'src/index.ts',
    plugins: [
      resolve({
        browser: true,
        extensions: ['.ts', '.mjs', '.js', '.json', '.node']
      }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      dts(),
    ],
    output: [
      { file: pkg.types, format: 'esm' },
    ]
  }
]

