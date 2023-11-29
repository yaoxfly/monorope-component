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
        include: [resolve('packages/component-pc')],
        outDir: resolve(outDir, 'types'),
        tsConfigFilePath: '../tsconfig.json',
        rollupTypes: true // 将所有声明合并到一个文件中
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
