import ui from "@nuxt/ui/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { resolve } from "path";

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
  build: {
    outDir: resolve(__dirname, "../dist-admin"),
  },
});
