import path from 'path'
import { fileURLToPath } from 'url'
const __filenameNew = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filenameNew)
const entryDir = path.resolve(__dirname, '../packages/component-pc')
const outDir = path.resolve(__dirname, '../packages/component-pc/dist')
const rootDir = path.resolve(__dirname, '../')
const resolve = (...urlOrUrls) => {
  return path.resolve(rootDir, ...urlOrUrls)
}

const formats = ['iife', 'umd', 'cjs', 'es']
const buildConfig = {
  lib: {
    entry: resolve(entryDir, 'index.ts')
  },
  rollupOptions: {
    output: formats.map(format => ({
      format: format === 'es' ? 'esm' : format,
      dir: resolve(outDir, format),
      entryFileNames: `[name].${format === 'es' ? 'mjs' : 'js'}`,
      sourcemap: true,
      globals: {
        vue: 'Vue',
        'element-plus': 'ElementPlus',
        axios: 'axios',
        qs: 'qs'
      },
      ...(format === 'es' && { preserveModules: true, preserveModulesRoot: 'src' }),
      ...(format === 'iife' || format === 'umd' || format === 'cjs') && { exports: 'named', name: 'ComponentPc' },
      ...(format === 'iife' || format === 'umd') && { name: 'ComponentPc' }

    })),
    external: [
      'vue',
      'element-plus',
      'axios',
      'qs'
    ]
  }
}

export default buildConfig
