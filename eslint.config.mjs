// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default withNuxt().append(
  {
    rules: {
      'vue/require-default-prop': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/attribute-hyphenation': 'off',
    },
  },

  eslintConfigPrettier,
)
