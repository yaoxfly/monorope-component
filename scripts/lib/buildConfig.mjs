import path from 'path'
import { fileURLToPath } from 'url'
const __filenameNew = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filenameNew)
const entryDir = path.resolve(__dirname, '../../packages/component-pc')
const outDir = path.resolve(__dirname, '../../packages/component-pc/dist')
const rootDir = path.resolve(__dirname, '../../')
const resolve = (...urlOrUrls) => {
  return path.resolve(rootDir, ...urlOrUrls)
}
// lib只输出样式
const formats = ['iife', 'umd', 'cjs', 'es', 'lib']
const namespace = 'yx'
const buildConfig = {
  lib: {
    entry: resolve(entryDir, 'index.ts')
  },
  cssCodeSplit: true,
  rollupOptions: {
    output: formats.map(format => ({
      format: format === 'es' || format === 'lib' ? 'esm' : format,
      dir: resolve(outDir, format),
      entryFileNames: `[name].${format === 'es' ? 'mjs' : 'js'}`,
      assetFileNames: (assetInfo) => {
        // 获取文件的目录部分和文件名部分
        const dir = path.dirname(assetInfo.name)
        const fileName = path.basename(assetInfo.name)
        // 对于 CSS 文件，处理文件名
        if (fileName.endsWith('.css')) {
          // 如果不是 index.css，为文件名添加前缀
          const newFileName = fileName !== 'index.css' ? `${namespace}-${fileName}` : fileName
          return path.join(dir, newFileName) // 保持目录结构不变
        } else {
          // 对其他类型的文件使用默认的命名方案
          return path.join(dir, 'assets/[name].[hash][extname]')
        }
      },
      sourcemap: format !== 'lib',
      globals: {
        vue: 'Vue',
        'element-plus': 'ElementPlus',
        axios: 'axios',
        qs: 'qs'
      },
      ...((format === 'es' || format === 'cjs') && { preserveModules: true, preserveModulesRoot: 'component' }),
      ...(format === 'iife' || format === 'umd' || format === 'cjs') && { exports: 'named', name: 'ComponentPc' }
    })),
    plugins: [],
    external: [
      'vue',
      'element-plus',
      'axios',
      'qs'
    ]
  }
}
export default buildConfig
