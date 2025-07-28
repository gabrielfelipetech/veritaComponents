<template>
  <li>
    <div
      @click="isGroup ? toggle() : null"
      class="flex items-center justify-between p-2 rounded hover:bg-blue-700 cursor-pointer select-none"
    >
      <div class="flex items-center space-x-2">
        <IconAdapter v-if="item.icon" :name="item.icon" />
        <template v-if="item.to">
          <VLink
            :to="item.to"
            :external="item.external"
            class="flex-1"
          >{{ item.label }}</VLink>
        </template>
        <template v-else>
          <span class="flex-1">{{ item.label }}</span>
        </template>
      </div>
      <IconAdapter
        v-if="isGroup"
        name="mdi:chevron-down"
        class="transition-transform"
        :class="{ 'rotate-180': open }"
      />
    </div>

    <ul v-if="isGroup && open" class="pl-6 space-y-1 mt-1">
      <VSidebarItem
        v-for="child in item.children"
        :key="child.label"
        :item="child"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import IconAdapter from './IconAdapter.vue'
import VLink from './VLink.vue'
import type { NavItem } from './types'

const props = defineProps<{
  item: NavItem
}>()

const open = ref(false)
const isGroup = computed(() => Array.isArray(props.item.children))

function toggle() {
  open.value = !open.value
}
</script>
