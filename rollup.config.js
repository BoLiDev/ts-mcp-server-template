import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';
import path from 'path';
import autoExternal from 'rollup-plugin-auto-external';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'es',
    banner: '#!/usr/bin/env node',
  },
  plugins: [
    autoExternal({
      packagePath: './package.json',
    }),
    alias({
      entries: [{ find: '@src', replacement: path.resolve(__dirname, 'src') }],
    }),
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist',
      rootDir: './src',
    }),
  ],
  external: [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
    'fs',
    'path',
    'os',
    'crypto',
    'util',
    'events',
    'stream',
    'buffer',
    'url',
    'querystring',
    'http',
    'https',
    'net',
    'tls',
    'zlib',
    'readline',
    'child_process',
    'cluster',
    'worker_threads',
  ],
};
