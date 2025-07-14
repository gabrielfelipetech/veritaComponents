import VInput from './VInput.vue'

export default {
  title: 'Components/VInput',
  component: VInput,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto acima do input'
    },
    placeholder: {
      control: 'text',
      description: 'Texto exibido como placeholder'
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'url', 'search', 'tel', 'date', 'datetime-local', 'time', 'week', 'month'],
      description: 'Tipo do input'
    },
    disabled: {
      control: 'boolean',
      description: 'Desativa o input'
    },
    readonly: {
      control: 'boolean',
      description: 'Define como somente leitura'
    },
    required: {
      control: 'boolean',
      description: 'Define como obrigatório'
    },
    error: {
      control: 'text',
      description: 'Mensagem de erro'
    },
    icon: {
      control: 'text',
      description: 'Nome do ícone (Iconify)'
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Posição do ícone'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Define se ocupará toda a largura'
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamanho do input'
    },
    color: {
      control: { type: 'select' },
      options: ['neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
      description: 'Cor do input'
    },
    modelValue: {
      control: 'text',
      description: 'Valor do input (v-model)'
    }
  }
}

const Template = (args: any) => ({
  components: { VInput },
  setup() {
    return { args }
  },
  template: `<VInput v-bind="args" />`
})

export const Default = Template.bind({})
Default.args = {
  label: 'Nome',
  placeholder: 'Digite seu nome',
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  error: '',
  icon: '',
  iconPosition: 'left',
  fullWidth: false,
  size: 'md',
  color: 'neutral',
  modelValue: ''
}

export const WithIconLeft = Template.bind({})
WithIconLeft.args = {
  ...Default.args,
  icon: 'mdi:account',
  iconPosition: 'left'
}

export const WithIconRight = Template.bind({})
WithIconRight.args = {
  ...Default.args,
  icon: 'mdi:eye',
  iconPosition: 'right'
}

export const Error = Template.bind({})
Error.args = {
  ...Default.args,
  error: 'Campo obrigatório'
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Default.args,
  disabled: true
}

export const FullWidth = Template.bind({})
FullWidth.args = {
  ...Default.args,
  fullWidth: true
}

export const Password = Template.bind({})
Password.args = {
  ...Default.args,
  type: 'password',
  placeholder: 'Digite sua senha',
  icon: 'mdi:lock',
  iconPosition: 'left'
}
