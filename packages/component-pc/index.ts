import { components, install } from './src/export/component'
export * from './src/component' // 实现按需
export default {
  ...components,
  install
}
