import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    include: ['packages/admin/src/**/*.spec.ts']
  },
  resolve: {
    alias: {
      '@root': fileURLToPath(new URL('./src', import.meta.url)),
      '@nuxt/ui/dist/runtime/components': '@nuxt/ui/components',
      '@admin': fileURLToPath(new URL('./packages/admin/src', import.meta.url))
    }
  },
  css: { postcss: null }
})
