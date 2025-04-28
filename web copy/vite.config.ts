import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 26000,
    host: true,
    proxy: {
      "/api-proxy": {
        target: "http://localhost:26001/",
        changeOrigin: true,
        pathRewrite: {
          "^/api-proxy": "",
        },
      },
    },
  },
});
