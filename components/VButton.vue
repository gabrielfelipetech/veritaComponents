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
  fullWidth = false,
  color = 'primary',
  ariaLabel,
  disabled = false,
  icon,
  iconPosition = 'left',
 loading = false,
} = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean          
  fullWidth?: boolean
  color?: 'primary' | 'secondary' | 'tertiary'
  ariaLabel?: string
  disabled?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
}>()

const sizeClass = computed(() => {
  switch (size) {
    case 'sm':
      return 'h-8 text-sm px-4'
    case 'lg':
      return 'h-12 text-lg px-6'
    case 'md':
    default:
      return 'h-10 text-base px-5'
  }
})

const widthClass = computed(() => (fullWidth ? 'w-full' : 'w-auto'))

const colorClass = computed(() => {
  switch (color) {
    case 'secondary':
      return 'btn-secondary'
    case 'tertiary':
      return 'btn-accent'
    case 'primary':
    default:
      return 'btn-primary'
  }
})


const computedClass = computed(() => [
  'btn',
  colorClass.value,      
  'rounded-md',
  'transition-colors',
  'focus:outline-none',
  'disabled:opacity-50',
  'disabled:cursor-not-allowed',
  sizeClass.value,
  widthClass.value
].join(' '))

</script>
