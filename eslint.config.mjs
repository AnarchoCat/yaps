// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here

).override('nuxt/vue/rules', {
  rules: {
    'vue/singleline-html-element-content-newline': 'off'
  }
}).override('nuxt/stylistic', {
  rules: {
    '@stylistic/eol-last': 'off'
  }
})
