<template>
  <div :class="componentName">
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
import { useBem } from '../../../hook'
const COMPONENT_NAME = 'YxTest'
defineOptions({
  name: COMPONENT_NAME
})
const { componentName, createBEM } = useBem({ name: COMPONENT_NAME })
const bem = createBEM(COMPONENT_NAME)
console.log(componentName)
console.log('按需测试')
const text = ref('按需测试')
</script>
