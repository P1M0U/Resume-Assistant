// @ts-check
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

/** @type {import('eslint').Linter.Config['languageOptions']['globals']} */
const browserGlobals = {
  window: 'readonly',
  document: 'readonly',
  console: 'readonly',
  localStorage: 'readonly',
  sessionStorage: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  setInterval: 'readonly',
  clearInterval: 'readonly',
  URL: 'readonly',
  Blob: 'readonly',
  FormData: 'readonly',
  File: 'readonly',
  DragEvent: 'readonly',
  HTMLInputElement: 'readonly',
  HTMLElement: 'readonly',
  HTMLTextAreaElement: 'readonly',
  Node: 'readonly',
  MutationObserver: 'readonly',
  Response: 'readonly',
  Request: 'readonly',
  Headers: 'readonly',
}

export default [
  // 全局忽略：dist、node_modules、vue-tsc 生成的类型文件
  {
    ignores: ['dist/**', 'node_modules/**', '*.d.ts', 'src/**/*.vue.js', 'src/**/*.js'],
  },

  // 基础 JS 推荐规则
  js.configs.recommended,

  // TypeScript 推荐规则（仅对 .ts 和 .vue 的 script 部分生效）
  ...tseslint.configs.recommended,

  // Vue 推荐规则
  ...pluginVue.configs['flat/recommended'],

  // 自定义覆盖配置
  {
    files: ['src/**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: browserGlobals,
    },
    rules: {
      // Vue 特有规则调整
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: { normal: 'any', void: 'always', component: 'always' },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    },
  },

  // 自定义 TypeScript 规则（仅对 .ts 文件）
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      globals: browserGlobals,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // 全项目通用规则
  {
    files: ['src/**/*.{ts,vue}'],
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
]
