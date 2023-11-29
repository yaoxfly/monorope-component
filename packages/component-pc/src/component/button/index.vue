<template>
  <div :class="$options.name">
    <el-button> {{ text }}</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
defineOptions({
  name: 'YxButton'
})

console.log('我是按钮组件')
const text = ref('我是按钮组件')
console.log(import.meta.env, '环境变量')

</script>
