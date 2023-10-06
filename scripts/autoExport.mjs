/** @description  按需导出
 * @author yx
 */
import fs from 'fs'
import { resolve } from './build.mjs'
function autoExport () {
  const otherContents = resolve('packages/component-pc/src/component')
  const index = resolve('packages/component-pc/src/component/index.ts')
  const components = []
  const files = fs.readdirSync(otherContents)
  files.forEach(function (item) {
    const stat = fs.statSync(`${otherContents}/${item}`)
    if (stat.isDirectory() === true) {
      components.push(item)
    }
  })
  fs.writeFileSync(index, '')
  components.forEach(res => {
    fs.appendFileSync(index, `export * from './${res}'\n`)
  })
}
export default autoExport
