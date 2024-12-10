import path from 'path'
import loadEnv from './lib/dotenv.mjs'
import { fileURLToPath } from 'url'
import { build, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import AutoImport from 'unplugin-auto-import/vite'
import { visualizer } from 'rollup-plugin-visualizer' // 性能分析，打开stats.html，查看打包情况
import autoExport from './lib/autoExport.mjs'
import checker from 'vite-plugin-checker'
import buildConfig from './lib/buildConfig.mjs'
import copyFiles from './lib/copyFiles.mjs'
const __filenameNew = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filenameNew)
const outDir = path.resolve(__dirname, '../packages/component-pc/dist')
// 根目录
const rootDir = path.resolve(__dirname, '../')
export function resolve (...urlOrUrls) {
  return path.resolve(rootDir, ...urlOrUrls)
}
autoExport({
  path: 'packages/component-pc/src/component',
  output: 'packages/component-pc/src/component/index.ts'
}) // 一定要放置在resolve之后

const baseConfig = defineConfig(env => {
  return {
    mode: env.VITE_APP_CURRENT_MODE,
    resolve: {
      alias: {
        '@yaoxfly': resolve('packages')
      }
    },
    plugins: [
      vue(),
      dts({
        include: [resolve('packages/component-pc')],
        outDir: resolve(outDir, 'types/packages/component-pc'),
        tsConfigFilePath: '../tsconfig.json',
        rollupTypes: true
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
      drop: env.VITE_APP_CURRENT_MODE === 'production' ? ['console', 'debugger'] : []
    }
  }
})

async function main () {
  const env = await loadEnv()
  await build(baseConfig(env))
  await copyFiles(
    {
      sourceDir: resolve('packages/component-pc/dist'),
      targetDir: resolve('packages/component-pc/dist/theme-chalk'),
      fileExtensions: ['.css'],
      tips: 'packages',
      exclude: ['cjs']
    }
  )

  await copyFiles(
    {
      sourceDir: resolve('packages/theme-chalk/src'),
      targetDir: resolve('packages/component-pc/dist/theme-chalk/src'),
      fileExtensions: ['.scss'],
      tips: 'packages',
      exclude: ['theme-chalk']
    }
  )
}

main()
