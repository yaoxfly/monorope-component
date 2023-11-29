import { install } from './src/export/component'
export * from './src/component/index' // 实现按需
export * from './src/export/component' // 一定要这种方式导出否则组件无法导出install,umd无法使用
export default {
  install
}
