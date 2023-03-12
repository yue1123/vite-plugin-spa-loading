import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { spaLoading } from 'vite-plugin-spa-loading'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../build/vue'
  },
  base: '/vite-plugin-spa-loading/vue/',
  plugins: [vue(), spaLoading('svg', { path: './public/loading.svg' })]
})
