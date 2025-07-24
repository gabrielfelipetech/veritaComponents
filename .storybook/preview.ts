import type { Preview } from '@storybook/vue3'
import './storybook.css'
import '../assets/css/tailwind.css';
const decorators = [
  (story) => ({
    components: { 
      Icon: {
        props: ['name', 'class'],
        template: `
          <span :class="class">
            <template v-if="name === 'eos-icons:loading'">
              🔄 <!-- Simula loading -->
            </template>
            <template v-else>
              [icon: {{ name }}]
            </template>
          </span>
        `
      }
    },
    setup() {
      return { story }
    },
    template: '<story />'
  })
]

const preview: Preview = {
  decorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
