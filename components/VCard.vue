<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const {
  size = 'md',
  backgroundColor = 'tertiary-em'
} = defineProps<{
  size?: 'sm' | 'md' | 'lg'
  backgroundColor?:
    | 'primary-em'   | 'secondary-em'   | 'tertiary-em'
    | 'primary-bp'   | 'secondary-bp'   | 'tertiary-bp'
}>()

const sizeClass = computed(() => `card-${size}`)
const bgClass   = computed(() => `card-${backgroundColor}`)
const classes   = computed(() => ['card', sizeClass.value, bgClass.value].join(' '))
</script>

<style lang="scss" scoped>
@use "sass:map";

$card-sizes: (
  sm: 1rem,
  md: 1.5rem,
  lg: 2rem
);

$card-bg-colors: (
  primary-em:   #3D89BC,
  secondary-em: #F5F8FD,
  tertiary-em:  #FFFFFF,
  primary-bp:   #008080,
  secondary-bp: #20B2AA,
  tertiary-bp:  #E0FFFF
);

.card {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

@each $size, $padding in $card-sizes {
  .card-#{$size} {
    padding: $padding;
  }
}

@each $name, $bg in $card-bg-colors {
  .card-#{$name} {
    background-color: $bg;
  }
}
</style>
