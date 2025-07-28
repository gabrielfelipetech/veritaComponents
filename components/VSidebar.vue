<template>
  <aside class="w-64 bg-blue-900 text-white h-full">
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
