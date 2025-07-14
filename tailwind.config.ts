import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
    './.storybook/**/*.{js,ts}',   
    './node_modules/verita-components/dist/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#facc15'
      }
    }
  },
}

export default config
