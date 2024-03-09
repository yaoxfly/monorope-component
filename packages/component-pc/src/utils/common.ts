export const toKebabCase = (str: string | undefined) => str?.replace(/[A-Z]/g, match => '-' + match.toLowerCase()).slice(1)
