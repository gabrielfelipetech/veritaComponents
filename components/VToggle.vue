<template>
  <label
    :class="[
      'toggle-wrapper',
      `toggle-${size}`,
      `toggle-${color}`,
      disabled ? 'disabled' : '',
      modelValue ? 'checked' : '',
    ]"
  >
    <input v-model="modelValue" type="checkbox" class="sr-only" :disabled="disabled" />
    <span class="track"></span>
    <span class="thumb"></span>
    <span v-if="labelText" class="toggle-text">{{ labelText }}</span>
  </label>
</template>

<script setup lang="ts">
const modelValue = defineModel<boolean>();
const {
  size = 'md',
  color = 'primary-bp',
  disabled = false,
  labelText = '',
} = defineProps<{
  size?: 'sm' | 'md' | 'lg';
  color?:
    | 'primary-em'
    | 'secondary-em'
    | 'tertiary-em'
    | 'primary-bp'
    | 'secondary-bp'
    | 'tertiary-bp';
  disabled?: boolean;
  labelText?: string;
}>();
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use 'sass:color';

$toggle-sizes: (
  sm: (
    trackW: 2rem,
    trackH: 1rem,
    thumb: 0.75rem,
    translate: 1rem,
  ),
  md: (
    trackW: 3rem,
    trackH: 1.5rem,
    thumb: 1.25rem,
    translate: 1.5rem,
  ),
  lg: (
    trackW: 4rem,
    trackH: 2rem,
    thumb: 1.75rem,
    translate: 2rem,
  ),
);

$btn-colors-light: (
  primary-em: (
    bg: #3d89bc,
  ),
  secondary-em: (
    bg: #6c757d,
  ),
  tertiary-em: (
    bg: #f8f9fa,
  ),
  primary-bp: (
    bg: #008080,
  ),
  secondary-bp: (
    bg: #20b2aa,
  ),
  tertiary-bp: (
    bg: #e0ffff,
  ),
);

.toggle-wrapper {
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .track {
    background: #ccc;
    border-radius: 9999px;
    transition: background 0.2s;
  }

  .thumb {
    position: absolute;
    background: #fff;
    border-radius: 50%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    transition: transform 0.2s;
  }

  .toggle-text {
    margin-left: 0.5rem;
    font-size: 0.875rem;
    user-select: none;
  }
}

@each $size, $dim in $toggle-sizes {
  .toggle-#{$size} {
    .track {
      width: map.get($dim, trackW);
      height: map.get($dim, trackH);
    }
    .thumb {
      width: map.get($dim, thumb);
      height: map.get($dim, thumb);
    }
    &.checked .thumb {
      transform: translateX(map.get($dim, translate)) translateY(-50%);
    }
  }
}

@each $name, $props in $btn-colors-light {
  .toggle-#{$name}.checked .track {
    background: map.get($props, bg);
  }
}
</style>
