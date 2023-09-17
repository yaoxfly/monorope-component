import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/assets/css/index.css'
import ElementPlus from 'element-plus'
import ComponentPc from 'component-pc'
// import ComponentPc from '../../../packages/component-pc/index'
createApp(App)
  .use(router)
  .use(createPinia())
  .use(ElementPlus)
  .use(ComponentPc)
  .mount('#app')
