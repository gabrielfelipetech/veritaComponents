<template>
  <button
    :class="computedClass"
    :type="type"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-label="ariaLabel"
    v-bind="attrs"
  >
    <template v-if="iconPosition === 'left' && (icon || loading)">
      <IconAdapter
        :name="loading ? 'mdi:loading' : icon"
        class="mr-2"
        :class="{ 'animate-spin': loading }"
      />
    </template>

    <slot />

    <template v-if="iconPosition === 'right' && (icon || loading)">
      <IconAdapter
        :name="loading ? 'mdi:loading' : icon"
        class="ml-2"
        :class="{ 'animate-spin': loading }"
      />
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import IconAdapter from './IconAdapter.vue'

const attrs = useAttrs()

const {
  type = 'button',
  size = 'md',
  fullWidth = true,
  color = 'primary-bp',
  ariaLabel,
  disabled = false,
  icon,
  iconPosition = 'left',
  loading = false,
  isThemeDark = false
} = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
  color?:
    | 'primary-em' | 'secondary-em' | 'tertiary-em'
    | 'primary-bp' | 'secondary-bp' | 'tertiary-bp'
  ariaLabel?: string
  disabled?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  isThemeDark?: boolean
}>()

const sizeClass = computed(() => ({
  sm: 'size-sm',
  md: 'size-md',
  lg: 'size-lg'
}[size]))

const widthClass = computed(() => fullWidth ? 'w-full' : 'w-auto')
const colorClass = computed(() => `btn-${color}`)
const themeClass = computed(() => isThemeDark ? 'theme-dark' : '')

const computedClass = computed(() =>
  [ 'btn', colorClass.value, 'default', sizeClass.value, widthClass.value, themeClass.value ]
    .filter(Boolean)
    .join(' ')
)
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "sass:map";

$btn-colors-light: (
  primary-em:   (bg: #3D89BC, text: #fff, hover: color.adjust(#3D89BC, $lightness: -5%)),
  secondary-em: (bg: #F5F8FD, text: #122238, hover: color.adjust(#F5F8FD, $lightness: -5%)),
  tertiary-em:  (bg: transparent, text: #4E7086, hover: rgba(#28496A, .12)),
  primary-bp:   (bg: #008080, text: #fff, hover: color.adjust(#008080, $lightness: -5%)),
  secondary-bp: (bg: #20B2AA, text: #fff, hover: color.adjust(#20B2AA, $lightness: -5%)),
  tertiary-bp:  (bg: #E0FFFF, text: #333, hover: color.adjust(#E0FFFF, $lightness: -5%))
);

$btn-colors-dark: (
  primary-em:   (bg: #2A5E85, text: #fff, hover: color.adjust(#2A5E85, $lightness: -5%)),
  secondary-em: (bg: #1A1F29, text: #ddd, hover: color.adjust(#1A1F29, $lightness: 5%)),
  tertiary-em:  (bg: transparent, text: #A0B9D6, hover: rgba(#A0B9D6, .12)),
  primary-bp:   (bg: #005959, text: #fff, hover: color.adjust(#005959, $lightness: -5%)),
  secondary-bp: (bg: #0F7E7E, text: #fff, hover: color.adjust(#0F7E7E, $lightness: -5%)),
  tertiary-bp:  (bg: transparent, text: #BBB, hover: rgba(#BBB, .12))
);

@each $name, $props in $btn-colors-light {
  .btn-#{$name} {
    background-color: map.get($props, bg);
    color:            map.get($props, text);
    border:           1px solid map.get($props, hover);
    transition:       background-color .2s ease;

    &:hover:not(:disabled) {
      background-color: map.get($props, hover);
    }
  }
}

@each $name, $props in $btn-colors-dark {
  .theme-dark.btn-#{$name} {
    background-color: map.get($props, bg);
    color:            map.get($props, text);
    border:           1px solid map.get($props, hover);
    transition:       background-color .2s ease;

    &:hover:not(:disabled) {
      background-color: map.get($props, hover);
    }
  }
}

.default {
  @apply flex items-center rounded-md transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed;
}
.size-sm { @apply h-8 text-sm px-4 }
.size-md { @apply h-10 text-base px-5 }
.size-lg { @apply h-12 text-lg px-6 }
</style>
