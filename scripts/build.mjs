import path from 'path'
import loadEnv from './dotenv.mjs'
import { fileURLToPath } from 'url'
import { build, defineConfig, loadEnv as viteLoadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import DefineOptions from 'unplugin-vue-define-options/vite'
import autoExport from './autoExport.mjs'
const __filenameNew = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filenameNew)
// 根目录
const rootDir = path.resolve(__dirname, '../')
export function resolve (...urlOrUrls) {
  return path.resolve(rootDir, ...urlOrUrls)
}
autoExport() // 一定要放置在resolve之后
const outDir = resolve('packages/component-pc/dist')
const baseConfig = defineConfig(({ mode }) => {
  const env = viteLoadEnv(mode, process.cwd())
  return {
    mode: env.VITE_USER_NODE_ENV,
    plugins: [
      vue(),
      dts({
        include: [resolve('packages/component-pc')], // 路径一定要从根目录开始，否则index.d.ts会生成不成功
        outDir: resolve(outDir, 'types'),
        tsConfigFilePath: resolve('packages/component-pc/tsconfig.json')
      }),
      DefineOptions()
    ],
    build: {
      lib: {
        entry: resolve('packages/component-pc/index.ts'),
        name: 'ComponentPc',
        fileName: format => `index.${format}.js`
      },
      outDir,
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: [
          'vue',
          'element-plus',
          'axios',
          'qs'
        ],
        output: {
          name: 'ComponentPc',
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
            'element-plus': 'ElementPlus',
            axios: 'axios',
            qs: 'qs'
          },
          exports: 'named' /** Disable warning for default imports */
        }
      }
    },
    esbuild: {
      drop: env.VITE_USER_NODE_ENV === 'production' ? ['console', 'debugger'] : []
    }
  }
})

async function main () {
  const { NODE_ENV: mode } = await loadEnv()
  await build(baseConfig({ mode }))
  // console.log(mode)
  // await copyFiles()
}

main()
