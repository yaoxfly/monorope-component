module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'standard',
    './.eslintrc-auto-import.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    indent: ['off', 2],
    /* --vue相关-- */
    'vue/multi-word-component-names': 0,
    'vue/comment-directive': 0,
    'no-unused-vars': 0,
    'vue/no-parsing-error': [
      2,
      {
        'x-invalid-end-tag': false,
        'missing-semicolon-after-character-reference': false
      }
    ],
    'vue/max-attributes-per-line': 0,
    'vue/first-attribute-linebreak': 0,
    'vue/html-indent': 0,
    'vue/html-closing-bracket-newline': 0,
    // 'vue/component-definition-name-casing': 0,
    'vue/no-unused-vars': 1,
    'vue/no-use-v-if-with-v-for': 0,

    /* --ECMAScript 6 ES6-- */
    'no-useless-escape': 0, // 关闭转义
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true }
    ],
    'no-multiple-empty-lines': 0,

    /* --typescript -- */
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 0 // 不写成0，setup里写的，在template里使用会报警告

  }
}
