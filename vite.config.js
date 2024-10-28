import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  //配置的内容
  server: {
    proxy: {
      '/kcs-web': {
        target: 'https://ceping.bimowo.com/',//请求的地址
        // target: 'https://gitlab.bimowu.com/',//请求的地址
        // target: 'https://gitlab.bimowu.com/',//请求的地址
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/kcs-web/, '') // 可选，用于重写请求路径
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
