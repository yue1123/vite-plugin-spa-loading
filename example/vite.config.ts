import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { spaLoading } from 'vite-plugin-spa-loading'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    spaLoading('text', {
      cssPath: './public/loading.css',
      errorTip: 'Error occurred, It may be caused by cache, try to force refresh',
      onError: function () {
        // 错误重试
        const search = window.location.search
        const reloadNum = +search.match(/slr=(\d+)/)?.[1] || 1
        if (reloadNum < 3) window.location.search = `slt=${Date.now()}&slr=${reloadNum + 1}`
      }
    })
  ]
})
