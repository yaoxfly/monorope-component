import config from '@/config'
import { defineAsyncComponent, Suspense } from 'vue'
import homeStyle from './home.module.scss'
// import { YxButton, YxTest } from '@yaoxfly/component-pc'
export default defineComponent({
  name: 'Home',
  components: {
    // YxButton,
    // YxTest
    AsyncComponent: defineAsyncComponent(() => import('../test/child'))
  },
  setup () {
    // 主题切换
    const setTheme = () => {
      document.documentElement.style.setProperty('--color-primary-base', '16,185,129')
    }

    setTheme()
    const input = useStorage('input-value', '可同步数据到localstorage的输入框') // vueuse的api，自动将ref同步到localstorage,实现双向绑定
    return () => {
      const route = useRoute()
      console.log(route.query, '传递给home页面的参数')
      return (
        <>
          <yx-button></yx-button>
          <yx-test ></yx-test>
          <div class='tw-flex tw-justify-center  tw-items-center  tw-bg-gray-50  tw-text-black'>
            <span > 我是首页{config.server}</span>
          </div>

          <div class={['tw-container', 'tw-m-16', 'tw-text-large', 'tw-bg-primary', 'tw-rounded', homeStyle.container] } >
            容器1
          </div>

          <div class='tw-container  tw-m-16  tw-text-base  tw-bg-primary-10  tw-text-regular tw-border-base  tw-border tw-leading-32 ' >
            容器2
          </div>

          <input v-model={input.value} class='tw-w-500 tw-border tw-border-solid tw-border-black' ></input>
          <Suspense>
            {{
              default: <async-component />,
              fallback: <div>Loading...</div>
            }}
          </Suspense>

        </>
      )
    }
  }
})
