<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :format="format"
    :quality="quality"
    :placeholder="placeholder"
    :lazy="lazy"
    :provider="provider"
    class="rounded-lg overflow-hidden"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">

const props = defineProps<{
  src:   string
  alt?:  string
  width?: number
  height?: number
  format?: 'jpeg' | 'png' | 'webp' | 'avif'
  quality?: number
  placeholder?: 'empty' | 'blur' | 'dominant'
  lazy?: boolean
  provider?: string
}>()

const {
  src,
  alt = '',
  width = undefined,
  height = undefined,
  format = undefined,
  quality = 75,
  placeholder = 'blur',
  lazy = true,
  provider = undefined
} = props
</script>

<style scoped>
.nuxt-image {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
