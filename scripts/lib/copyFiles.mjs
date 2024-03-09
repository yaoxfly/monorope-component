import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import chalk from 'chalk'
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
const copyFile = promisify(fs.copyFile)
const mkdir = promisify(fs.mkdir)
async function copyFiles ({ sourceDir, targetDir, fileExtensions, tips, exclude = [] }) {
  try {
    await mkdir(targetDir, { recursive: true })
    const files = await readdir(sourceDir)
    for (const file of files) {
      const filePath = path.join(sourceDir, file)
      const fileStat = await stat(filePath)
      if (exclude.includes(file)) return // 排除某个文件夹
      if (fileStat.isDirectory()) {
        await copyFiles({ sourceDir: filePath, targetDir, fileExtensions, tips, exclude })
      } else {
        const fileExtension = path.extname(file).toLowerCase()
        if (fileExtensions.includes(fileExtension)) {
          const targetFilePath = path.join(targetDir, file)
          try {
            await copyFile(filePath, targetFilePath)
            const regExp = new RegExp(`.*?(${tips}[\\\\\/].*?$)`)
            const trimmedSourcePath = filePath.replace(regExp, '$1') // 使用正则表达式截取路径
            const trimmedTargetPath = targetFilePath.replace(regExp, '$1') // 使用正则表达式截取路径
            console.log(`Copied ${trimmedSourcePath} ${chalk.cyan('to')} ${chalk.magenta(trimmedTargetPath)}`)
          } catch (copyError) {
            console.error(`Error copying file ${filePath}:`, copyError)
          }
        }
      }
    }
  } catch (error) {
    console.error('Error while copying files:', error)
  }
}

export default copyFiles
