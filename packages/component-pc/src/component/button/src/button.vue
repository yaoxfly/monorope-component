<template>
  <div :class="className">
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
import { toKebabCase } from '../../../utils/common'
defineOptions({
  name: 'YxButton'
})
const className = computed(() => toKebabCase(getCurrentInstance()?.proxy?.$options.name))
console.log('我是按钮组件')
const text = ref('我是按钮组件')
console.log(import.meta.env, '环境变量')
</script>
