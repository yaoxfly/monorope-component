import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/assets/css/index.css'
import ElementPlus, { ElButton } from 'element-plus'
import ComponentPc, { Button } from 'component-pc'
console.log(Button, ElButton)
// import ComponentPc from '../../../packages/component-pc/index'
createApp(App)
  .use(router)
  .use(createPinia())
  .use(ElementPlus)
  .use(Button)
  .mount('#app')
