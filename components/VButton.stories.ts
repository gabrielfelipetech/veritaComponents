import VButton from './VButton.vue'

export default {
  title: 'Components/VButton',
  component: VButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Define o tamanho do botão'
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Define se o botão ocupará toda a largura'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Define se o botão estará desabilitado'
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Descrição acessível para leitores de tela'
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'Tipo de botão'
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Estilo visual do botão'
    },
    icon: {
      control: { type: 'text' },
      description: 'Nome do ícone (Iconify), ex: uil:check'
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Posição do ícone'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Mostra ícone de carregamento'
    }
  }
}

const Template = (args: any) => ({
  components: { VButton },
  setup() {
    return { args }
  },
  template: '<VButton v-bind="args">Botão Exemplo</VButton>'
})

export const Primary = Template.bind({})
Primary.args = {
  size: 'md',
  fullWidth: false,
  disabled: false,
  ariaLabel: 'Botão Exemplo',
  type: 'button',
  color: 'primary',
  icon: '',
  iconPosition: 'left',
  loading: false
}

export const WithIconLeft = Template.bind({})
WithIconLeft.args = {
  ...Primary.args,
  icon: 'uil:check',
  iconPosition: 'left'
}

export const WithIconRight = Template.bind({})
WithIconRight.args = {
  ...Primary.args,
  icon: 'uil:arrow-right',
  iconPosition: 'right'
}

export const Loading = Template.bind({})
Loading.args = {
  ...Primary.args,
  loading: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Primary.args,
  disabled: true
}

export const FullWidth = Template.bind({})
FullWidth.args = {
  ...Primary.args,
  fullWidth: true
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...Primary.args,
  color: 'secondary'
}

export const Tertiary = Template.bind({})
Tertiary.args = {
  ...Primary.args,
  color: 'tertiary'
}
