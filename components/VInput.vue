<template>
  <div :class="['form-control', widthClass]">
    <div class="relative">
      <IconAdapter
        v-if="iconLeft"
        :name="props.icon"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        v-model="modelValue"
        :type="props.type || 'text'"
        placeholder=" "
        :disabled="props.disabled"
        :readonly="props.readonly"
        :required="props.required"
        :class="`${inputClass} peer focus:outline-none focus:ring-0`"
      />
      <label
        v-if="props.label"
        class="
          absolute left-3
          top-1/2 -translate-y-1/2
          text-gray-500
          pointer-events-none
          transition-all
          peer-placeholder-shown:top-1/2
          peer-placeholder-shown:-translate-y-1/2
          peer-placeholder-shown:text-base
          peer-focus:top-0
          peer-focus:-translate-y-full
          peer-focus:text-xs
          peer-focus:text-primary
        "
      >
        {{ props.label }}
      </label>

      <!-- Ícone à direita -->
      <IconAdapter
        v-if="iconRight"
        :name="props.icon"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>

    <label v-if="props.error" class="label mt-1">
      <span class="label-text-alt text-error">{{ props.error }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IconAdapter from './IconAdapter.vue'

const modelValue = defineModel<string>()

const props = defineProps<{
  label?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: string
  icon?: string
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
}>()

const baseClass = 'input'
const sizeClass = computed(() => props.size ? `input-${props.size}` : 'input-md')
const colorClass = computed(() => props.color ? `input-${props.color}` : '')
const widthClass = computed(() => props.fullWidth ? 'w-full' : 'w-auto')

const iconLeft = computed(() => props.icon && props.iconPosition === 'left')
const iconRight = computed(() => props.icon && props.iconPosition === 'right')
const errorClass = computed(() => props.error ? 'input-error' : '')

// adiciona padding extra se houver ícone
const paddingClass = computed(() => {
  if (!props.icon) return ''
  return props.iconPosition === 'left' ? 'pl-10' : 'pr-10'
})

const inputClass = computed(() =>
  [ baseClass, sizeClass.value, colorClass.value, errorClass.value, paddingClass.value ]
    .filter(Boolean)
    .join(' ')
)
</script>
