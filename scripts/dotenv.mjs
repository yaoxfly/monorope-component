import dotenv from 'dotenv'
function load (parseEnvObj, prefix = '') {
  const { parsed } = parseEnvObj
  if (parsed && parsed instanceof Object) {
    Object.getOwnPropertyNames(parsed).forEach((item) => {
      if (item.indexOf(prefix) === 0) {
        process.env[item] = parsed[item]
      } else {
        process.env[item] = undefined
      }
    })
  }
}

function loadEnv (options = {}) {
  if (process.env.NODE_ENV === 'local') {
    // ↓如果第一个参数传入'local'，就报错：
    // ↓"local "不能用作模式名称，因为它与``.env文件的.local后缀冲突。
    throw new Error('"local" cannot be used as a mode name because it conflicts with ' +
      'the .local postfix for .env files.')
  }
  const { prefix = 'VITE_' } = options
  const baseDir = process.cwd()
  const env = {}
  const envFiles = [
    /** mode local file  .env.[mode].local */ `.env.${process.env.NODE_ENV}.local`,
    /** mode file .env.[mode] */ `.env.${process.env.NODE_ENV}`,
    /** local file .env.local */ '.env.local',
    /** default file  .env */ '.env'
  ]

  for (const key in process.env) {
    if (env[key] === undefined) {
      env[key] = process.env[key]
    }
  }

  for (const file of envFiles) {
    load(dotenv.config({ path: `${baseDir}/${file}` }), prefix)
  }

  return env
}
export default loadEnv
