<template>
  <label
    :class="[
      'radio-wrapper',
      `radio-${size}`,
      disabled ? 'disabled' : ''
    ]"
  >
    <span
      v-if="labelText && labelPosition === 'left'"
      class="radio-label"
    >
      {{ labelText }}
    </span>
    <input
      type="radio"
      class="sr-only"
      :name="name"
      :value="value"
      :disabled="disabled"
      v-model="modelValue"
    />
    <span class="radio-circle"></span>
    <span
      v-if="labelText && labelPosition === 'right'"
      class="radio-label"
    >
      {{ labelText }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const modelValue = defineModel<string>()

const {
  size = 'md',
  labelText = '',
  labelPosition = 'right',
  disabled = false,
  name,
  value
} = defineProps<{
  size?: 'sm' | 'md' | 'lg'
  labelText?: string
  labelPosition?: 'left' | 'right'
  disabled?: boolean
  name?: string
  value?: string
}>()
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "sass:color";

$radio-sizes: (
  sm: (dim: 1rem,  border: 2px, dot: 0.5rem),
  md: (dim: 1.25rem, border: 2px, dot: 0.625rem),
  lg: (dim: 1.5rem,  border: 2px, dot: 0.75rem)
);

$primary-em: #3D89BC;

.radio-wrapper {
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
    white-space: nowrap;
  }

  .radio-label {
    margin: 0 0.5rem;
    user-select: none;
  }
}

.radio-circle {
  display: inline-block;
  position: relative;
  background: #fff;
  border: 2px solid #ccc;
  border-radius: 50%;
  transition: border-color 0.2s, background-color 0.2s;

  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    background: $primary-em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.2s;
  }
}

input:checked + .radio-circle {
  border-color: $primary-em;
}

input:checked + .radio-circle::after {
  transform: translate(-50%, -50%) scale(1);
}

@each $size, $props in $radio-sizes {
  .radio-#{$size} {
    .radio-circle {
      width: map.get($props, dim);
      height: map.get($props, dim);
      border-width: map.get($props, border);
    }
    .radio-circle::after {
      width: map.get($props, dot);
      height: map.get($props, dot);
    }
  }
}
</style>
