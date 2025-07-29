import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

export default defineConfig({
  root: __dirname,
  plugins: [vue()],
  test: {
    environment: 'jsdom'
  },
  resolve: {
    alias: {
      '@root': fileURLToPath(new URL('../../src', import.meta.url)),
      '@nuxt/ui/dist/runtime/components': '@nuxt/ui/components'
    }
  },
  css: { postcss: null }
})
