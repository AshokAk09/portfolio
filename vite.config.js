import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Firebase Hosting serves from dist/ — see firebase.json
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2020',
  },
})
