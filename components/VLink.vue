<template>
  <component :is="tag"
             v-bind="linkProps"
             v-bind="$attrs">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  to: { type: String, required: true },
  external: { type: Boolean, default: false },
  replace: { type: Boolean, default: false },
  prefetch: { type: Boolean, default: true },
  target: { type: String, default: undefined },
  rel: { type: String, default: undefined }
})

const isExternal = computed(() =>
  props.external || /^(https?:|\/\/|mailto:|tel:|#)/.test(props.to)
)

const computedRel = computed(() =>
  props.rel ?? (props.target === '_blank' ? 'noopener noreferrer' : undefined)
)

const tag = computed(() => (isExternal.value ? 'a' : 'NuxtLink'))

const linkProps = computed(() =>
  isExternal.value
    ? { href: props.to, target: props.target, rel: computedRel.value }
    : { to: props.to, replace: props.replace, prefetch: props.prefetch }
)
</script>
