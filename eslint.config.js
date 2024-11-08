import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormatting,

  {
    rules: {
      'prefer-const': 'warn',
      'prefer-destructuring': [
        1,
        {
          object: true,
          array: false,
        },
      ],
      'import/no-duplicates': 0,
      'import/no-named-as-default-member': 0,
      'import/order': 0,
      'import/no-unresolved': [
        1,
        {
          ignore: ['^@/', '^api'],
        },
      ],
      'import/default': 'off',
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/explicit-member-accessibility': 'error',
    },
  },
]
