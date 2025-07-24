<template>
  <div :class="['form-control', widthClass, themeClass]">
    <label
      v-if="label && labelPosition === 'top'"
      class="mb-1 text-sm font-medium"
    >
      {{ label }}
    </label>

    <div
      :class="[
        'relative',
        labelPosition === 'left' ? 'flex items-center gap-2' : ''
      ]"
    >
      <label
        v-if="label && labelPosition === 'left'"
        class="text-sm font-medium whitespace-nowrap"
      >
        {{ label }}
      </label>

      <IconAdapter
        v-if="icon && iconPosition === 'left'"
        :name="icon"
        :class="['absolute left-3 top-1/2 -translate-y-1/2', iconColorClass]"
      />

      <input
        v-model="modelValue"
        :type="type || 'text'"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :class="inputClass"
      />

      <IconAdapter
        v-if="icon && iconPosition === 'right'"
        :name="icon"
        :class="['absolute right-3 top-1/2 -translate-y-1/2', iconColorClass]"
      />
    </div>

    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IconAdapter from './IconAdapter.vue'

const modelValue = defineModel<string>()

const {
  label,
  placeholder,
  type,
  disabled = false,
  readonly = false,
  required = false,
  error,
  icon,
  iconPosition = 'left',
  iconColor = 'text-gray-400',  
  fullWidth = true,
  size = 'md',
  color = 'primary-em',
  isThemeDark = false,
  labelPosition = 'top'
} = defineProps<{
  label?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: string
  icon?: string
  iconPosition?: 'left' | 'right'
  iconColor?: string              
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?:
    | 'primary-em' | 'secondary-em' | 'tertiary-em'
    | 'primary-bp' | 'secondary-bp' | 'tertiary-bp'
  isThemeDark?: boolean
  labelPosition?: 'top' | 'left'
}>()

const widthClass     = computed(() => (fullWidth ? 'w-full' : 'w-auto'))
const themeClass     = computed(() => (isThemeDark ? 'theme-dark' : ''))
const iconColorClass = computed(() => iconColor)

const sizeClass = computed(() => (size ? `input-${size}` : 'input-md'))

const inputClass = computed(() => {
  const base = ['input', sizeClass.value, widthClass.value, colorClass.value]
  if (icon) {
    if (iconPosition === 'left')  base.push('pl-12')
    if (iconPosition === 'right') base.push('pr-12')
  }
  return [...base].filter(Boolean).join(' ')
})

const colorClass = computed(() => `input-${color}`)
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "sass:map";

.input-sm { @apply px-5 py-1 text-sm; }
.input-md { @apply px-5 py-2 text-base; }
.input-lg { @apply px-5 py-3 text-lg; }

$btn-colors-light: (
  primary-em:   (bg: #3D89BC, hover: color.adjust(#3D89BC, $lightness: -5%)),
  secondary-em: (bg: #F5F8FD, hover: color.adjust(#F5F8FD, $lightness: -5%)),
  tertiary-em:  (bg: transparent, hover: rgba(#28496A, .12)),
  primary-bp:   (bg: #008080, hover: color.adjust(#008080, $lightness: -5%)),
  secondary-bp: (bg: #20B2AA, hover: color.adjust(#20B2AA, $lightness: -5%)),
  tertiary-bp:  (bg: #E0FFFF, hover: color.adjust(#E0FFFF, $lightness: -5%))
);

$btn-colors-dark: (
  primary-em:   (bg: #2A5E85, hover: color.adjust(#2A5E85, $lightness: -5%)),
  secondary-em: (bg: #1A1F29, hover: color.adjust(#1A1F29, $lightness: 5%)),
  tertiary-em:  (bg: transparent, hover: rgba(#A0B9D6, .12)),
  primary-bp:   (bg: #005959, hover: color.adjust(#005959, $lightness: -5%)),
  secondary-bp: (bg: #0F7E7E, hover: color.adjust(#0F7E7E, $lightness: -5%)),
  tertiary-bp:  (bg: transparent, hover: rgba(#BBB, .12))
);

@each $name, $props in $btn-colors-light {
  .input-#{$name} {
    border: 1px solid map.get($props, hover);
    border-radius: 0.375rem;
    background: if(map.get($props, bg) == transparent, transparent, #fff);
    color: #000;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 1px map.get($props, hover);
    }
  }
}
@each $name, $props in $btn-colors-dark {
  .theme-dark .input-#{$name} {
    border: 1px solid map.get($props, hover);
    background: #1F1F1F;
    color: #fff;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 1px map.get($props, hover);
    }
  }
}
</style>
