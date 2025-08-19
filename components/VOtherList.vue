<template>
  <div class="flex items-start gap-2 w-full">
    <VInput
      v-model="draft"
      :placeholder="placeholder"
      :color="props.color"
      :size="props.size"
      class="flex-1 min-w-0"
      @keyup.enter="append"
    />
    <VButton
      type="button"
      :color="props.color"
      :size="props.size"
      :disabled="!canAppend"
      class="flex-none shrink-0 !w-auto !min-w-[120px] whitespace-nowrap v-otherlist__btn"
      @click="append"
    >
      {{ buttonText }}
    </VButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import VInput from '../components/VInput.vue';
import VButton from '../components/VButton.vue';

const props = withDefaults(
  defineProps<{
    color?:
      | 'primary-em'
      | 'secondary-em'
      | 'tertiary-em'
      | 'primary-bp'
      | 'secondary-bp'
      | 'tertiary-bp';
    size?: 'sm' | 'md' | 'lg';
    placeholder?: string;
    buttonText?: string;
  }>(),
  {
    color: 'primary-bp',
    size: 'md',
    placeholder: 'Digite outro item e Enter ⏎',
    buttonText: 'Adicionar',
  },
);

const draft = ref('');
const canAppend = computed(() => draft.value.trim().length > 0);

const emit = defineEmits<{ (e: 'add', label: string): void }>();

function append() {
  const txt = draft.value.trim();
  if (!txt) return;
  emit('add', txt);
  draft.value = '';
}
</script>

<style scoped>
.v-otherlist__btn {
  width: auto !important;
  min-width: 120px;
}
</style>
