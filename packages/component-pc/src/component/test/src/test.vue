<template>
  <div :class="className">
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
import { toKebabCase } from '../../../utils/common'
defineOptions({
  name: 'YxTest'
})
const className = computed(() => toKebabCase(getCurrentInstance()?.proxy?.$options.name))
console.log(className)
console.log('按需测试')
const text = ref('按需测试')
</script>
