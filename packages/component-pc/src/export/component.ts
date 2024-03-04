import type { App, Plugin } from 'vue'
const modules = import.meta.glob(['../component/**/*.ts', '!../component/index.ts'], { eager: true })
const components = [] as Plugin[]
for (const i in modules) {
  const item: any = modules[i]
  components.push(item.default)
}
const INSTALLED_KEY = Symbol('INSTALLED_KEY')
export const install = (app: App | any) => {
  if (app[INSTALLED_KEY]) return
  app[INSTALLED_KEY] = true
  components.forEach(comp => app.use(comp))
}
