/* eslint-disable import/no-extraneous-dependencies */
// vite.config.ts
import path from 'path';
import { defineConfig } from 'vite';

import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [],
  build: {
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: path.resolve(__dirname, 'src/csv-to-apkg.ts'),
      fileName: 'csv-to-apkg',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [],
      plugins: [
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript({
          sourceMap: false,
          declaration: true,
          outDir: 'dist',
        }),
      ],
    },
  },
});
