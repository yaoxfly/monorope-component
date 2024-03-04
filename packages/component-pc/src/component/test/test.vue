<template>
  <div :class="$options.name">
    <el-button> {{ text }}</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
defineOptions({
  name: 'YxTest'
})
console.log('按需测试')
const text = ref('按需测试')

</script>
