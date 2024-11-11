import importPlugin from 'eslint-plugin-import'
import pluginVue from 'eslint-plugin-vue'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  skipFormatting,
  importPlugin.flatConfigs.recommended,
  ...compat.extends('alloy', 'alloy/vue', 'alloy/typescript'),
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  {
    rules: {
      'prefer-const': 'warn',
      'prefer-destructuring': [
        'warn',
        {
          object: true,
          array: false,
        },
      ],
      'no-unused-vars': 'warn',
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: ['ts', 'tsx'],
            allowNoLang: true,
          },
        },
      ],
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
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
