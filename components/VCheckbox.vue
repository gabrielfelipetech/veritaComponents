<template>
  <label
    :class="[
      'checkbox-wrapper',
      sizeClass,
      colorClass,
      disabled ? 'disabled' : '',
      isChecked ? 'checked' : '',
    ]"
  >
    <span v-if="labelText && labelPosition === 'left'" class="checkbox-label">
      {{ labelText }}
    </span>

    <input
      type="checkbox"
      class="sr-only"
      :name="name"
      :value="value"
      :disabled="disabled"
      :checked="isChecked"
      @change="onChange"
    />

    <span class="checkbox-box"></span>

    <span v-if="labelText && labelPosition === 'right'" class="checkbox-label">
      {{ labelText }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: boolean | any[];
    value?: any;
    name?: string;
    labelText?: string;
    labelPosition?: 'left' | 'right';
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    color?:
      | 'primary-em'
      | 'secondary-em'
      | 'tertiary-em'
      | 'primary-bp'
      | 'secondary-bp'
      | 'tertiary-bp';
  }>(),
  {
    labelPosition: 'right',
    size: 'md',
    color: 'primary-em',
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean | any[]): void;
}>();

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.value !== undefined && props.modelValue.includes(props.value);
  }
  return !!props.modelValue;
});

function onChange(e: Event) {
  const input = e.target as HTMLInputElement;
  if (Array.isArray(props.modelValue)) {
    const arr = [...props.modelValue];
    if (input.checked) {
      if (!arr.includes(props.value)) arr.push(props.value);
    } else {
      const idx = arr.indexOf(props.value);
      if (idx > -1) arr.splice(idx, 1);
    }
    emit('update:modelValue', arr);
  } else {
    emit('update:modelValue', input.checked);
  }
}

const sizeClass = computed(() => `checkbox-${props.size || 'md'}`);
const colorClass = computed(() => `checkbox-${props.color || 'primary-em'}`);
const name = computed(() => props.name || '');
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use 'sass:color';

$checkbox-sizes: (
  sm: 1rem,
  md: 1.25rem,
  lg: 1.5rem,
);

$checkbox-colors-light: (
  primary-em: (
    bg: #3d89bc,
  ),
  secondary-em: (
    bg: #f5f8fd,
  ),
  tertiary-em: (
    bg: transparent,
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

$checkbox-colors-dark: (
  primary-em: (
    bg: #2a5e85,
  ),
  secondary-em: (
    bg: #1a1f29,
  ),
  tertiary-em: (
    bg: transparent,
  ),
  primary-bp: (
    bg: #005959,
  ),
  secondary-bp: (
    bg: #0f7e7e,
  ),
  tertiary-bp: (
    bg: transparent,
  ),
);

.checkbox-wrapper {
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
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .checkbox-label {
    margin: 0 0.5rem;
    user-select: none;
  }

  .checkbox-box {
    position: relative;
    border: 2px solid #ccc;
    border-radius: 0.25rem;
    transition:
      border-color 0.2s,
      background 0.2s;

    &::before {
      content: '';
      position: absolute;
      border-left: 2px solid #fff;
      border-bottom: 2px solid #fff;
      width: 50%;
      height: 25%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg) scale(0);
      transition: transform 0.2s;
    }
  }
}

@each $size, $dim in $checkbox-sizes {
  .checkbox-#{$size} .checkbox-box {
    width: $dim;
    height: $dim;
  }
}

@each $name, $props in $checkbox-colors-light {
  .checkbox-#{$name}.checked .checkbox-box {
    background: map.get($props, bg);
    border-color: map.get($props, bg);

    &::before {
      transform: translate(-50%, -50%) rotate(-45deg) scale(1);
    }
  }
}

@each $name, $props in $checkbox-colors-dark {
  .theme-dark .checkbox-#{$name}.checked .checkbox-box {
    background: map.get($props, bg);
    border-color: map.get($props, bg);

    &::before {
      transform: translate(-50%, -50%) rotate(-45deg) scale(1);
    }
  }
}
</style>
