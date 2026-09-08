import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        story: resolve(import.meta.dirname, 'story/index.html'),
        indiaElectronicsArticle: resolve(import.meta.dirname, 'articles/india-electronics-manufacturing/index.html'),
        tap: resolve(import.meta.dirname, 'tap/index.html'),
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    css: false,
  },
})
