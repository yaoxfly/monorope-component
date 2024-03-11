/** @description  自动按需导出
 * @author yx
 */
import fs from 'fs'
import { resolve } from '../build.mjs'
function autoExport (config) {
  const { path, output } = config || {}
  const otherContents = resolve(path)
  const index = resolve(output)
  const components = []
  const files = fs.readdirSync(otherContents)
  files.forEach(function (item) {
    const stat = fs.statSync(`${otherContents}/${item}`)
    if (stat.isDirectory() === true) {
      components.push(item)
    }
  })
  fs.writeFileSync(index, '/** 当前文件不需要任何手动编辑，已做了自动化处理 */\n')
  components.forEach(res => {
    fs.appendFileSync(index, `export * from './${res}/src'\n`)
  })
}
export default autoExport
