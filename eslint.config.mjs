// import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
//
// import _import from 'eslint-plugin-import'
//
//
// import globals from 'globals'
// import path from 'node:path'
// import { fileURLToPath } from 'node:url'
// import js from '@eslint/js'
// import { FlatCompat } from '@eslint/eslintrc'
//
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// const compat = new FlatCompat({
//   baseDirectory: __dirname,
//   recommendedConfig: js.configs.recommended,
//   allConfig: js.configs.all,
// })
//
// export default [
//   ...fixupConfigRules(
//     compat.extends(
//       'plugin:import/recommended',
//       'plugin:import/typescript',
//
//     ),
//   ),
//   {
//     plugins: {
//
//       import: fixupPluginRules(_import),
//
//     },
//
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//       },
//
//       ecmaVersion: 13,
//       sourceType: 'script',
//     },
//
//     settings: {
//       'import/resolver': {
//         typescript: true,
//         node: true,
//       },
//     },
//
//     rules: {
//       'prefer-const': 'warn',
//       'prettier/prettier': 1,
//       'import/no-duplicates': 0,
//       'import/no-named-as-default-member': 0,
//       'import/order': 0,
//       'import/no-unresolved': [
//         1,
//         {
//           ignore: ['^@/', '^api'],
//         },
//       ],
//       'import/default': 'off',
//       'prefer-destructuring': [
//         1,
//         {
//           object: true,
//           array: false,
//         },
//       ],
//
//       '@typescript-eslint/no-unused-vars': 1,
//       '@typescript-eslint/no-require-imports': 0,
//       '@typescript-eslint/explicit-member-accessibility': 'off',
//     },
//   },
//   {
//     files: ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.tsx'],
//
//     rules: {
//       '@typescript-eslint/explicit-member-accessibility': 'error',
//     },
//   },
// ]
