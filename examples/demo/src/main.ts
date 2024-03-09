import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/assets/css/index.css'
import ElementPlus from 'element-plus'
import ComponentPc from '@yaoxfly/component-pc'
import '@yaoxfly/component-pc/dist/theme-chalk/index.css'
// console.log(Test)
// import ComponentPc from '../../../packages/component-pc/index'
createApp(App)
  .use(router)
  .use(createPinia())
  .use(ElementPlus)
  .use(ComponentPc)
  .mount('#app')
