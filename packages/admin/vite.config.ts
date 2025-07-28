import ui from "@nuxt/ui/vite";
import vue from "@vitejs/plugin-vue";
import {
  resolve,
} from "node:path";
import {
  defineConfig,
} from "vite";

export default defineConfig({
  root: resolve(__dirname),
  plugins: [
    vue(),
    ui({
      ui: {
        colors: {
          neutral: "neutral",
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@root": resolve(__dirname, "../../src"),
      "@admin": resolve(__dirname, "./src"),
      "@nuxt/ui/dist/runtime/components": "@nuxt/ui/components",
    },
  },
  server: {
    port: 5174,
  },
  build: {
    outDir: resolve(__dirname, "../../dist-admin"),
  },
});
