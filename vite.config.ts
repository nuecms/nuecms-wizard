import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import config from './wizard.config'
export default defineConfig({
  plugins: [vue()],
  server: {
    watch: {
      // Ignore specific file or directory (supports glob patterns)
      ignored: [
        'node_modules/**',
        'config.json',
        'src/config.ts'
      ]
    }
  },
  ...config.vite
})

