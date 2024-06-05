<template>
  <div v-show="isShow" :class="componentName">
    {{ text }}
    <div :class="bem('test', ['gray', 'small'])">
      bem hook测试
      <div :class="bem('test-left')">
        1
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ButtonProps } from './index'
import { useBem } from '../../../hook'
const COMPONENT_NAME = 'YxButton'
defineOptions({
  name: COMPONENT_NAME
})
const { componentName, createBEM } = useBem({ name: COMPONENT_NAME })
const bem = createBEM(COMPONENT_NAME)
const props = withDefaults(defineProps<ButtonProps>(), {
  isShow: true
})
console.log()
console.log('我是按钮组件')
const text = ref('我是按钮组件')
console.log(import.meta.env, '环境变量')
</script>
