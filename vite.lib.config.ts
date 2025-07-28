import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts({
      include: ['components/**/*.{ts,vue}'],
      exclude: ['**/*.stories.ts', '**/*.spec.ts', '**/__tests__/**']
    })],
  build: {
    lib: {
      entry: './components/index.ts', 
      name: 'VeritaComponents',
      
      fileName: (format) => `verita-components.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'], 
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
