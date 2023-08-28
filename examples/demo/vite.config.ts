import { defineConfig, loadEnv, UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import { createHtmlPlugin } from 'vite-plugin-html'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer' // 性能分析，打开stats.html，查看打包情况
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import postcssImport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
// import progress from 'vite-plugin-progress'
import browserslist from 'browserslist' // 统一js/css兼容性
import checker from 'vite-plugin-checker'
import externalGlobals from 'rollup-plugin-external-globals'
const browserslistConfig = browserslist.loadConfig({ path: '../../' }) // npx browserslist "> 0.04%, last 2 versions,Firefox ESR,not dead" 查询兼容的浏览器
const externalGlobalsConfig = {
  vue: 'Vue',
  axios: 'axios',
  'vue-demi': 'VueDemi', // 用了pinia必须配置
  'vue-router': 'VueRouter',
  qs: 'qs',
  pinia: 'Pinia',
  '@vueuse/core': 'VueUse',
  'element-plus': 'ElementPlus'

}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ mode, command }: ConfigEnv): UserConfigExport => defineConfig({
  // 部署在二级目录下，也需要加个二级目录
  base: loadEnv(mode, process.cwd()).VITE_APP_PUBLIC_PATH,
  /**
   * 这是因为在本地包上工作时（通过检测包路径是否包含 node_modules ），Vite 假定它是源代码，所以 HMR 也在那里工作，
   * 但这也意味着本地包需要导出 ESM。如果不是ESM格式的(例如umd)，那么我们需要将包添加到 optimizeDeps.include .
   * 这个东西缓存有点严重,要用esm一定要去除这个配置
   * */
  // optimizeDeps: {
  //   include: [
  //     'component-pc'
  //   ],
  //   force: true
  // },
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      entry: 'src/main.ts',
      template: './index.html',
      inject: {
        data: {
          title: 'Vue App',
          //  出现souceMap找不情况，需换链接, 如果是把资源文件放在自己的库中，需下载对应的map文件。
          cdn: {
            css: [
              // element-plus
              { url: 'https://cdn.jsdelivr.net/npm/element-plus@2.2.16/dist/index.css' }
            ],
            js: [
              {
                // vue
                url: 'https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.prod.js'
              },
              {
                // vue-demi pinia 前置插件
                url: 'https://cdn.jsdelivr.net/npm/vue-demi@0.13.11/lib/index.iife.js'
              },
              {
                // pinia
                url: 'https://cdn.jsdelivr.net/npm/pinia@2.1.6/dist/pinia.iife.prod.js'
              },
              {
                // vue-router
                url: 'https://cdn.jsdelivr.net/npm/vue-router@4.2.4/dist/vue-router.global.prod.js'
              },
              {
                // axios
                url: 'https://cdn.jsdelivr.net/npm/axios@1.4.0/dist/axios.min.js'
              },
              {
                // qs
                url: 'https://cdn.jsdelivr.net/npm/qs@6.11.2/dist/qs.min.js'
              },
              {
                // shared  vueuse/core 前置插件
                url: 'https://cdn.jsdelivr.net/npm/@vueuse/shared@10.2.1/index.iife.min.js'
              },
              {
                // @vueuse/core
                url: 'https://cdn.jsdelivr.net/npm/@vueuse/core@10.2.1/index.iife.min.js'
              },
              {
                // element-plus
                url: 'https://cdn.jsdelivr.net/npm/element-plus@2.2.16'
              }
            ]
          }
        }
      }
    }),
    vueJsx(),
    eslintPlugin({
      exclude: ['./node\_modules/**', './dist'],
      cache: false
    }),
    compression(),
    visualizer({
      open: true, // 注意这里要设置为true，否则无效
      gzipSize: true, // 从源代码中收集 gzip 大小并将其显示在图表中
      brotliSize: true, // 从源代码中收集 brotli 大小并将其显示在图表中
      emitFile: true, // 在打包完的dist，否则在项目目录下
      filename: 'stats.html' // 分析图生成的文件名

    }),
    legacy({
      targets: browserslistConfig,
      renderLegacyChunks: true,
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      // 现代浏览器 --根据兼容的浏览器按需添加
      modernPolyfills: [
        'es.string.replace-all',
        'es.promise.finally',
        'es.array.flat-map',
        'es.object.values'
      ],
      // 传统浏览器 --根据兼容的浏览器按需添加
      polyfills: [
        'es.symbol',
        'es.array.filter',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.for-each',
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all',
        'es.array.flat-map',
        'es.object.values'
      ]
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
            'createWebHistory'
          ]
        },
        {
          '@vueuse/core': [
            'useStorage'
          ]
        }
      ],
      dts: 'src/auto-import.d.ts',
      vueTemplate: false,
      ignore: ['h'], // 解决开发环境h报错
      eslintrc: {
        enabled: true,
        filepath: '../../.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    viteMockServe({
      // default
      mockPath: 'src/mock',
      watchFiles: true
    }),
    // progress(), //打包进度条，会覆盖掉打包详情信息，暂时不用了
    checker({
      typescript: true // 检查ts类型
    }),
    {
      ...externalGlobals(externalGlobalsConfig),
      enforce: 'post', // 放置最后执行，解决和unplugin-auto-import插件冲突问题
      apply: 'build'
    }
  ],
  build: {
    target: 'es2015',
    outDir: './dist/',
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    chunkSizeWarningLimit: 1000, // chunks 大小限制
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks: id => {
          if (id.includes('node_modules')) { // 超大静态资源拆分
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      },
      external: Object.keys(externalGlobalsConfig)
    }
  },
  server: {
    // 指定服务网络,不然只会显示本地的
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: '127.0.0.1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
  css: {
    postcss: {
      plugins: [
        postcssImport,
        autoprefixer,
        tailwindcss
      ]
    }
  }
})
