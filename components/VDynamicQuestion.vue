<template>
  <VInput
    v-if="field.type === 'text' || field.type === 'number'"
    v-model="valueRef"
    :type="field.type"
    :label="field.label"
    :placeholder="field.placeholder"
    :color="props.color"
    :size="props.size"
  />

  <VRange
    v-else-if="field.type === 'range'"
    v-model="valueRef"
    :min="(field as any).min ?? 0"
    :max="(field as any).max ?? 5"
    :step="(field as any).step ?? 1"
    :show-ticks="Boolean((field as any).showTicks)"
    :tick-step="(field as any).tickStep ?? 1"
    :color="mapRangeColor(props.color)"
    :size="props.size"
  />

  <template v-else>
    <fieldset class="mb-6">
      <legend class="mb-2 font-medium">{{ field.label }}</legend>

      <div :class="optionsLayoutClass">
        <div
          v-for="opt in field.options"
          :key="String(opt.value)"
          class="option-item flex flex-col gap-2"
        >
          <component
            :is="{ radio: VRadio, checkbox: VCheckbox, toggle: VToggle }[field.type]"
            v-model="valueRef"
            :label-text="opt.label"
            :label-position="field.labelPosition"
            :name="field.key"
            :value="opt.value"
            :color="props.color"
            :size="props.size"
          />
          <div
            v-if="
              (field.type === 'radio' && valueRef === opt.value) ||
              (field.type === 'checkbox' && Array.isArray(valueRef) && valueRef.includes(opt.value))
            "
            :class="['pl-7 mt-3 w-full', childrenLayoutClass(opt)]"
          >
            <VDynamicQuestion
              v-for="child in opt.children || []"
              :key="child.key"
              :node="child"
              :model="childModel(opt)"
              :color="props.color"
              :size="props.size"
              :layout="props.layout"
              :child-layout="props.childLayout"
              class="child-item"
            />
          </div>
        </div>
      </div>

      <VOtherList
        v-if="props.model[`${field.key}__otherEnabled`]"
        v-model="model[field.key]"
        :color="props.color"
        :size="props.size"
        class="mt-2"
        @add="addCustom"
      />
    </fieldset>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import VInput from '@/components/VInput.vue';
import VRadio from '@/components/VRadio.vue';
import VCheckbox from '@/components/VCheckbox.vue';
import VToggle from '@/components/VToggle.vue';
import VOtherList from '@/components/VOtherList.vue';
import VRange from '@/components/VRange.vue';
import type { QuestionNode } from '@/components/types';

const props = withDefaults(
  defineProps<{
    node: QuestionNode;
    model: Record<string, any>;
    color?:
      | 'primary-em'
      | 'secondary-em'
      | 'tertiary-em'
      | 'primary-bp'
      | 'secondary-bp'
      | 'tertiary-bp';
    size?: 'sm' | 'md' | 'lg';
    layout?: 'row' | 'col' | `grid-${1 | 2 | 3 | 4 | 5 | 6}`;
    childLayout?: 'row' | 'col' | `grid-${1 | 2 | 3 | 4 | 5 | 6}`;
  }>(),
  { color: 'primary-bp', size: 'md', layout: 'row', childLayout: 'row' },
);

function mapRangeColor(c?: string): 'primary' | 'secondary' | 'tertiary' {
  if (!c) return 'primary';
  if (c.includes('secondary')) return 'secondary';
  if (c.includes('tertiary')) return 'tertiary';
  return 'primary';
}

const field = computed(() => props.node as any);

const asObjects = computed<boolean>(() => Boolean(field.value.asObjects));
const objectKey = computed<string>(() => field.value.objectKey || 'option');

function getOtherOpt(n: QuestionNode) {
  return n.options?.find((o) => o.allowCustom);
}
function otherValue(n: QuestionNode) {
  return getOtherOpt(n)?.value;
}
function mapLayoutToClass(l?: string) {
  if (l === 'row') return 'child-row flex flex-wrap items-start gap-4';
  if (l === 'col') return 'flex flex-col gap-4';
  if (l?.startsWith('grid-')) {
    const n = Number(l.split('-')[1] || 2);
    return `grid grid-cols-${n} gap-4`;
  }
  return '';
}
const optionsLayoutClass = computed(() =>
  mapLayoutToClass((field.value as any).layout || props.layout),
);
function childrenLayoutClass(opt?: any) {
  const l = opt?.childrenLayout || (field.value as any).childrenLayout || props.childLayout;
  return mapLayoutToClass(l);
}

const valueRef = computed<any>({
  get() {
    if (field.value.type === 'checkbox' && asObjects.value) {
      const arr = Array.isArray(props.model[field.value.key]) ? props.model[field.value.key] : [];
      const vals = arr.map((o: any) => o?.[objectKey.value]).filter(Boolean);
      return props.model[`${field.value.key}__otherEnabled`]
        ? [...vals, otherValue(field.value)]
        : vals;
    }
    if (field.value.type === 'checkbox' && getOtherOpt(field.value)) {
      const base = props.model[field.value.key] ?? [];
      const oVal = otherValue(field.value);
      const hasOther = props.model[`${field.value.key}__otherEnabled`];
      return hasOther ? [...base, oVal] : base;
    }
    return props.model[field.value.key];
  },
  set(v) {
    if (field.value.type === 'checkbox' && asObjects.value) {
      const oVal = otherValue(field.value);
      const sel: string[] = Array.isArray(v) ? v.filter((x) => x !== oVal) : [];
      const cur: any[] = Array.isArray(props.model[field.value.key])
        ? props.model[field.value.key]
        : [];
      const next: any[] = cur.filter((o) => sel.includes(o[objectKey.value]));
      sel.forEach((val) => {
        if (!next.some((o) => o[objectKey.value] === val)) next.push({ [objectKey.value]: val });
      });
      props.model[field.value.key] = next;
      props.model[`${field.value.key}__otherEnabled`] = Array.isArray(v) && v.includes(oVal);
      return;
    }
    if (field.value.type === 'checkbox' && getOtherOpt(field.value)) {
      const oVal = otherValue(field.value);
      const otherEnabled = Array.isArray(v) && v.includes(oVal);
      const arr = Array.isArray(v) ? v.filter((x) => x !== oVal) : [];
      props.model[field.value.key] = arr;
      props.model[`${field.value.key}__otherEnabled`] = otherEnabled;
      return;
    }
    props.model[field.value.key] = v;
  },
});

function childModel(opt: any) {
  if (asObjects.value && field.value.type === 'checkbox') {
    const arr: any[] = props.model[field.value.key] || (props.model[field.value.key] = []);
    let obj = arr.find((o) => o?.[objectKey.value] === opt.value);
    if (!obj) {
      obj = { [objectKey.value]: opt.value };
      arr.push(obj);
    }
    return obj;
  }
  return props.model;
}

function addCustom(label: string) {
  if (asObjects.value && field.value.type === 'checkbox') {
    if (!Array.isArray(props.model[field.value.key])) props.model[field.value.key] = [];
    const arr = props.model[field.value.key] as any[];
    if (!arr.some((o) => o[objectKey.value] === label)) arr.unshift({ [objectKey.value]: label });
    if (!field.value.options?.some((o: any) => o.value === label))
      field.value.options?.unshift({ label, value: label });
    return;
  }
  if (!field.value.options?.some((o: any) => o.value === label))
    field.value.options?.unshift({ label, value: label });
  if (!Array.isArray(props.model[field.value.key])) props.model[field.value.key] = [];
  const arr = props.model[field.value.key] as string[];
  if (!arr.includes(label)) arr.unshift(label);
}
</script>

<style scoped>
.child-row > .child-item {
  flex: 1 1 0;
  min-width: 260px;
}
.child-item {
  min-width: 0;
}
</style>
