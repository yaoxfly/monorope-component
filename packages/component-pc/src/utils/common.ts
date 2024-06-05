import type { PropType } from 'vue'
export const definePropType = <T>(val: any): PropType<T> => val // 简洁写法，无需使用as断言
