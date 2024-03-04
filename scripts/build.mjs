import path from 'path'
import loadEnv from './dotenv.mjs'
import { fileURLToPath } from 'url'
import { build, defineConfig, loadEnv as viteLoadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import DefineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { visualizer } from 'rollup-plugin-visualizer' // 性能分析，打开stats.html，查看打包情况
import autoExport from './autoExport.mjs'
import checker from 'vite-plugin-checker'
import buildConfig from './buildConfig.mjs'
const __filenameNew = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filenameNew)
// 根目录
const outDir = path.resolve(__dirname, '../packages/component-pc/dist')
const rootDir = path.resolve(__dirname, '../')
export function resolve (...urlOrUrls) {
  return path.resolve(rootDir, ...urlOrUrls)
}
autoExport() // 一定要放置在resolve之后

const baseConfig = defineConfig(({ mode }) => {
  const env = viteLoadEnv(mode, process.cwd())
  return {
    mode: env.VITE_USER_NODE_ENV,
    plugins: [
      vue(),
      dts({
        include: [resolve('packages/component-pc')],
        outDir: resolve(outDir, 'types'),
        tsConfigFilePath: '../tsconfig.json',
        rollupTypes: false
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],

        imports: [
          'vue',
          {
            'vue-router': [
              'useLink',
              'useRoute',
              'useRouter',
              'onBeforeRouteLeave',
              'onBeforeRouteUpdate',
              'createRouter',
              'createWebHistory',
              'createWebHashHistory'
            ]
          }
        ],
        dts: '../typings/auto-import.d.ts',
        vueTemplate: false,
        ignore: ['h'], // 解决开发环境h报错
        eslintrc: {
          enabled: true,
          filepath: '../.eslintrc-auto-import.json',
          globalsPropValue: true
        }
      }),
      DefineOptions(),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        emitFile: true, // 在打包完的dist，否则在项目目录下
        filename: 'stats.html' // 分析图生成的文件名
      }),
      checker({
        typescript: true // 检查ts类型
      })
    ],
    build: buildConfig,
    esbuild: {
      drop: env.VITE_USER_NODE_ENV === 'production' ? ['console', 'debugger'] : []
    }
  }
})

async function main () {
  const { NODE_ENV: mode } = await loadEnv()
  await build(baseConfig({ mode }))
}

main()
