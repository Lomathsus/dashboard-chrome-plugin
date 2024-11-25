import path from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import copy from 'rollup-plugin-copy'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    copy({
      targets: [
        { src: 'src/plugins/manifest.json', dest: 'dist' }, // 复制 manifest.json 到 dist 目录
        { src: 'src/assets/icons/**', dest: 'dist/icons' }, // 复制 src/icons/** 到 dist/icons 目录
      ],
    }),
  ],
  css: {
    postcss: './postcss.config.js',
    preprocessorOptions: {
      less: {},
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        // popup: path.resolve(__dirname, 'src/popup/index.html'),
        // contentPage: path.resolve(__dirname, 'src/contentPage/index.html'),
        // content: path.resolve(__dirname, 'src/content/content.ts'),
        // background: path.resolve(__dirname, 'src/background/service-worker.ts'),
        tab: path.resolve(__dirname, 'src/tab/index.html'),
      },
      output: {
        assetFileNames: 'assets/[name]-[hash].[ext]', // 静态资源
        chunkFileNames: 'js/[name]-[hash].js', // 代码分割中产生的 chunk
        entryFileNames: (chunkInfo) => {
          console.log(chunkInfo)
          // 入口文件
          const baseName = chunkInfo.facadeModuleId
            ? path.basename(chunkInfo.facadeModuleId, path.extname(chunkInfo.facadeModuleId))
            : ''
          const saveArr = ['content', 'service-worker']
          return `[name]/${saveArr.includes(baseName) ? baseName : chunkInfo.name}.js`
        },
        name: '[name].js',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  root: 'src',
  server: {
    port: 3000,
    host: true,
    open: true,
    strictPort: false,
  },
})
