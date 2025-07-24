import path from 'path'
import { mergeConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { StorybookConfig } from '@storybook/vue3-vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const config: StorybookConfig = {
  framework: '@storybook/vue3-vite',
  stories: ['../components/**/*.stories.@(ts|js|mdx)'],
  addons: ['@storybook/addon-essentials'],
  docs: { autodocs: 'tag' },

  async viteFinal (cfg) {
    return mergeConfig(cfg as UserConfig, {
      plugins: [ vue() ],
      css: {
        postcss: {
          plugins: [
            tailwindcss(path.resolve(__dirname, '../tailwind.config.ts')),
            autoprefixer()
          ]
        }
      }
    })
  }
}

export default config
