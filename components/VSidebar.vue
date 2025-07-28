<template>
  <aside class="sidebar">
    <ul class="flex flex-col space-y-1 p-4">
      <VSidebarItem
        v-for="item in items"
        :key="item.label"
        :item="item"
      />
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import VSidebarItem from './VSidebarItem.vue'
import type { NavItem } from './types'
const props = defineProps<{
  items: NavItem[]
}>()
</script>
<style lang="scss">
.sidebar{
  @apply w-64 text-white h-full;
  background-color: #013352;
}
</style>
