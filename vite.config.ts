import { defineConfig } from "vite";
import px2rem from "postcss-plugin-px2rem";
import react from "@vitejs/plugin-react";

const px2remOption = {
  rootValue: 14.4,
  unitPrecision: 5,
  mediaQuery: false,
  minPixelValue: 0,
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        math: "parens-division",
      },
    },
    modules: {
      localsConvention: "camelCase",
      scopeBehaviour: "local",
      generateScopedName: "[name]_[local]_[hash:5]",
      globalModulePaths: [],
    },
    postcss: {
      plugins: [px2rem(px2remOption)],
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api/": {
        target: "http://localhost:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 不可以省略rewrite
      },
    },
  },
});
