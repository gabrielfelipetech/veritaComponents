<template>
  <Icon v-bind="attrs" :icon="props.name" inline />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { defineProps, useAttrs } from 'vue';

const props = defineProps<{ name: string }>();
const attrs = useAttrs();
</script>
