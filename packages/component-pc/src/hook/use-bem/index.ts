import { computed } from 'vue'
type UseBemParam={
  name:string
}
type BEMFunction = (element?: string | null, modifier?: string | string[] | null) => string;
export const useBem = ({ name }:UseBemParam) => {
  /**
 * 将 CamelCase 转换为 kebab-case 的函数
 * @param str - 要转换的字符串
 * @returns 转换后的 kebab-case 字符串
 */
  const toKebabCase = (str: string): string => str?.replace(/[A-Z]/g, match => '-' + match.toLowerCase()).slice(1)
  const componentName = computed(() => toKebabCase(name))

  /**
   * 创建用于生成 BEM 类名的函数。
   * @param block 块名。
   * @returns 返回一个函数，该函数接受元素和修饰符作为参数，并生成完整的 BEM 类名。
   */
  const createBEM = (block: string): BEMFunction => {
    block = toKebabCase(block)
    /**
      * 生成BEM命名的函数。
      * @param element 可选。BEM的元素名称。
      * @param modifier 可选。BEM的修饰符，可以是单个修饰符或修饰符数组。
      * @returns 根据提供的元素和修饰符返回的BEM类名字符串。
    */
    return (element, modifier): string => {
      element = element || ''
      const elementClass: string = element ? `__${element}` : ''
      // 处理修饰符，支持单个修饰符或修饰符数组
      const generateModifierClass = (mod: string | string[]): string => {
        if (Array.isArray(mod)) {
          return mod.map(m => `${elementClass ? `${block}${elementClass}` : block}--${m}`).join(' ')
        } else {
          return `${elementClass ? `${block}${elementClass}` : block}--${mod}`
        }
      }
      const modifierClass: string = modifier ? generateModifierClass(modifier) : ''
      // 根据是否有元素或修饰符，构造并返回完整的类名
      return modifierClass || `${block}${elementClass}`.trim()
    }
  }

  return {
    componentName,
    createBEM
  }
}












