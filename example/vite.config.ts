import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { spaLoading } from "vite-plugin-spa-loading";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    spaLoading("text", {
      cssPath: "./public/loading.css",
    }),
  ],
});
