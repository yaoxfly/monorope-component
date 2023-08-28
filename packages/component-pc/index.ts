import Button from './src/component/button'
import type { App, Plugin } from 'vue'
const components = [Button] as Plugin[]
const INSTALLED_KEY = Symbol('INSTALLED_KEY')
export const install = (app: App | any) => {
  if (app[INSTALLED_KEY]) return
  app[INSTALLED_KEY] = true
  components.forEach(comp => app.use(comp))
}
export * from './src/component' // 实现按需
export default {
  ...components,
  install
}
