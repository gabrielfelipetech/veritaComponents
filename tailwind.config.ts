import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
    './.storybook/**/*.{js,ts,mdx}',
    './node_modules/verita-components/dist/**/*.{js,ts}',
  ],
  safelist: [
    'h-8',
    'text-sm',
    'px-4',
    'h-10',
    'text-base',
    'px-5',
    'h-12',
    'text-lg',
    'px-6',
    'w-full',
    'w-auto',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#facc15',
      },
    },
  },
};

export default config;
