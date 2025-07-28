<template>
  <component :is="isExternal ? 'a' : 'NuxtLink'"
             v-bind="merged">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()

const props = defineProps({
  to: { type: String, required: true },
  external: { type: Boolean, default: false },
  replace: { type: Boolean, default: false },
  prefetch: { type: Boolean, default: true },
  target: { type: String, default: undefined },
  rel: { type: String, default: undefined }
})

const isExternal = computed(
  () => props.external || /^(https?:|\/\/|mailto:|tel:|#)/.test(props.to)
)

const computedRel = computed(() => {
  if (props.rel) return props.rel
  if (props.target === '_blank') return 'noopener noreferrer'
})

const merged = computed(() =>
  isExternal.value
    ? { ...attrs, href: props.to, target: props.target, rel: computedRel.value }
    : { ...attrs, to: props.to, replace: props.replace, prefetch: props.prefetch }
)
</script>
