import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { spaLoading } from 'vite-plugin-spa-loading'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../build/react'
  },
  base: '/vite-plugin-spa-loading/react/',
  plugins: [react(), spaLoading('svg', { rootElementId: 'root', path: './public/loading.svg' })]
})
