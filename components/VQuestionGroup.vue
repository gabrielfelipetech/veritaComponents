<template>
  <fieldset class="mb-6">
    <legend class="mb-2 font-medium">{{ label }}</legend>
    <div class="flex flex-col gap-2">
      <component
        v-for="opt in options"
        :key="opt.value"
        :is="inputComponent"
        v-model="modelValue"
        :name="name"
        :value="opt.value"
        :labelText="opt.label"
        :labelPosition="labelPosition"
        :disabled="disabled"
        size="md"
        :color="color"
      />
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import VRadio from './VRadio.vue'
import VCheckbox from './VCheckbox.vue'
import VToggle from './VToggle.vue'

interface Option {
  label: string
  value: string | number | boolean
}

const props = defineProps<{
  label: string
  name?: string
  options: Option[]
  type?: 'radio' | 'checkbox' | 'toggle'
  modelValue?: string | boolean | Array<string | number | boolean>
  labelPosition?: 'left' | 'right'
  disabled?: boolean
  color?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: any): void
}>()

const modelValue = toRef(props, 'modelValue')
modelValue.value 

const inputComponent = computed(() => {
  switch (props.type) {
    case 'toggle':    return VToggle
    case 'checkbox':  return VCheckbox
    default:          return VRadio
  }
})

const name = computed(() => props.name || props.label.replace(/\s+/g,'_').toLowerCase())
</script>

<style scoped>
fieldset {
  border: none;
  padding: 0;
  margin: 0;
}
</style>
