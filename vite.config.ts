import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import config from './wizard.config'
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue', // Automatically imports from Vue
      ],
      dts: 'src/auto-imports.d.ts', // Optionally generate TypeScript declaration file
    }),],
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

