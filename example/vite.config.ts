import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { spaLoading } from 'vite-plugin-spa-loading'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    spaLoading('text', {
      cssPath: './public/loading.css',
      onError: function () {
        const href = window.location.href
        if (href.indexOf('?t=') === -1) window.location.href = `${window.location.href}?t=${Date.now()}`
      }
    })
  ]
})
