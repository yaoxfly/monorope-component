/// <reference types="vite/client" />


declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_USER_NODE_ENV: string
  readonly VITE_APP_CURRENT_MODE: string
  readonly VITE_APP_PUBLIC_PATH: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'qs'
declare module 'postcss-import'
declare module 'rollup-plugin-external-globals'
