/** defaults  cjs、iife、umd */
import { install as installs } from './src/export/component'
export const install = installs
export default install

/** esm */
// 有导出所有类型
export * from './src/component/index'
