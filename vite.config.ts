import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'
import config from './wizard.config'
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue', // Automatically imports from Vue
      ],
      dts: 'src/auto-imports.d.ts', // Optionally generate TypeScript declaration file
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    watch: {
      // Ignore specific file or directory (supports glob patterns)
      ignored: [
        'node_modules/**',
        'data/**'
      ]
    }
  },
  ...config.vite
})

