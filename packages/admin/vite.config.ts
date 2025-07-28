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
  build: {
    outDir: resolve(__dirname, "../../dist-admin"),
  },
});
