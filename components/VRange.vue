<template>
  <div
    class="v-range"
    :class="[`v-range--${color}`, `v-range--${size}`, { 'v-range--disabled': disabled }]"
  >
    <input
      class="v-range__input"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :value="localValue"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="localValue"
      @input="onInput"
      @change="onChange"
    />

    <div class="v-range__track">
      <div class="v-range__fill" :style="{ width: percentStr }" />
      <div class="v-range__thumb" :style="{ left: percentStr }">
        <span v-if="showThumbValue" class="v-range__thumb-value">{{ displayValue }}</span>
      </div>
    </div>

    <div v-if="showTicks" class="v-range__ticks" aria-hidden="true">
      <div
        v-for="t in ticks"
        :key="t.value"
        class="v-range__tick"
        :class="{
          'v-range__tick--start': t.edge === 'start',
          'v-range__tick--end': t.edge === 'end',
        }"
        :style="{ left: `${t.percent}%` }"
      >
        <span class="v-range__tick-mark" />
        <span class="v-range__tick-label">{{ formatTick(t.value) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

type Color =
  | 'primary-em'
  | 'secondary-em'
  | 'tertiary-em'
  | 'primary-bp'
  | 'secondary-bp'
  | 'tertiary-bp'
  | 'primary'
  | 'secondary'
  | 'tertiary';
type Size = 'sm' | 'md' | 'lg';

const props = withDefaults(
  defineProps<{
    modelValue: number;
    min?: number;
    max?: number;
    step?: number;
    tickStep?: number;
    showTicks?: boolean;
    showThumbValue?: boolean;
    color?: Color;
    size?: Size;
    disabled?: boolean;
  }>(),
  {
    min: 0,
    max: 5,
    step: 1,
    tickStep: 1,
    showTicks: false,
    showThumbValue: true,
    color: 'primary',
    size: 'md',
    disabled: false,
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', v: number): void;
  (e: 'change', v: number): void;
}>();

const localValue = ref<number>(clamp(props.modelValue));
watch(
  () => props.modelValue,
  (v) => {
    if (v !== localValue.value) localValue.value = clamp(v);
  },
);
watch([() => props.min, () => props.max, () => props.step], () => {
  localValue.value = clamp(localValue.value);
});

function clamp(v: number): number {
  const a = Number(props.min),
    b = Number(props.max);
  if (a === b) return a;
  const low = Math.min(a, b),
    high = Math.max(a, b);
  const step = Math.max(1e-12, Number(props.step));
  const snapped = Math.round((v - low) / step) * step + low;
  return Math.min(high, Math.max(low, snapped));
}
function onInput(e: Event) {
  const v = Number((e.target as HTMLInputElement).value);
  localValue.value = clamp(v);
  emit('update:modelValue', localValue.value);
}
function onChange() {
  emit('change', localValue.value);
}

const span = computed(() => props.max - props.min || 1);
const percent = computed(() => ((localValue.value - props.min) / span.value) * 100);
const percentStr = computed(() => `${percent.value}%`);
const displayValue = computed(() => (Number.isFinite(localValue.value) ? localValue.value : 0));

type Tick = { value: number; percent: number; edge: 'start' | 'end' | null };
const ticks = computed<Tick[]>(() => {
  if (!props.showTicks) return [];
  const start = props.min,
    end = props.max,
    dir = start <= end ? 1 : -1;
  const step = Math.max(1e-12, Math.abs(props.tickStep));
  const maxTicks = 21;
  const total = Math.floor(Math.abs(end - start) / step) + 1;
  const values: number[] = [];
  if (total <= maxTicks) {
    for (let v = start; dir > 0 ? v <= end : v >= end; v += dir * step)
      values.push(Number(v.toFixed(10)));
    if (values[0] !== start) values.unshift(start);
    if (values.at(-1) !== end) values.push(end);
  } else {
    for (let i = 0; i < maxTicks; i++)
      values.push(Number((start + (end - start) * (i / (maxTicks - 1))).toFixed(10)));
  }
  return values.map((v, i, arr) => ({
    value: v,
    percent: Math.min(100, Math.max(0, ((v - props.min) / span.value) * 100)),
    edge: i === 0 ? 'start' : i === arr.length - 1 ? 'end' : null,
  }));
});

function formatTick(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${Math.sign(n) < 0 ? '-' : ''}${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${Math.sign(n) < 0 ? '-' : ''}${(abs / 1_000).toFixed(1)}k`;
  const s = Number(n.toFixed(4)).toString();
  return s.replace(/\.0+$/, '');
}
</script>

<style scoped>
:host,
.v-range {
  --bp-primary: #1e90ff;
  --bp-secondary: #6c757d;
  --bp-tertiary: #f8f9fa;

  --vr-track-bg: #e9ecef;
  --vr-thumb-bg: #ffffff;
  --vr-tick: #6b7280;
  --vr-text: #111827;

  --vr-track-h: 12px;
  --vr-thumb-d: 32px;
  --vr-hit-h: 44px;
}

.v-range--sm {
  --vr-track-h: 10px;
  --vr-thumb-d: 28px;
  --vr-hit-h: 40px;
}
.v-range--md {
  --vr-track-h: 12px;
  --vr-thumb-d: 32px;
  --vr-hit-h: 44px;
}
.v-range--lg {
  --vr-track-h: 16px;
  --vr-thumb-d: 40px;
  --vr-hit-h: 52px;
}

.v-range {
  position: relative;
  width: 100%;
  user-select: none;
}
.v-range--disabled {
  opacity: 0.6;
  pointer-events: none;
}

.v-range__input {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: var(--vr-hit-h);
  z-index: 3;
  opacity: 0;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}

.v-range__track,
.v-range__thumb,
.v-range__ticks {
  pointer-events: none;
}

.v-range__track {
  position: relative;
  width: 100%;
  height: var(--vr-track-h);
  border-radius: 9999px;
  background: var(--vr-track-bg);
}
.v-range__fill {
  height: 100%;
  border-radius: 9999px;
}

.v-range__thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: var(--vr-thumb-d);
  height: var(--vr-thumb-d);
  border-radius: 9999px;
  background: var(--vr-thumb-bg);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border: 2px solid currentColor;
  display: grid;
  place-items: center;
}
.v-range__thumb-value {
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  color: var(--vr-text);
}

.v-range__ticks {
  position: relative;
  margin-top: 10px;
  height: 28px;
}
.v-range__tick {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  display: grid;
  justify-items: center;
}
.v-range__tick--start {
  transform: translateX(0);
}
.v-range__tick--end {
  transform: translateX(-100%);
}
.v-range__tick-mark {
  width: 1px;
  height: 12px;
  background: var(--vr-tick);
  display: block;
}
.v-range__tick-label {
  margin-top: 4px;
  font-size: 0.75rem;
  color: var(--vr-tick);
}

.v-range--primary {
  color: var(--bp-primary);
}
.v-range--secondary {
  color: var(--bp-secondary);
}
.v-range--tertiary {
  color: var(--bp-tertiary);
}
.v-range--primary .v-range__fill {
  background: var(--bp-primary);
}
.v-range--secondary .v-range__fill {
  background: var(--bp-secondary);
}
.v-range--tertiary .v-range__fill {
  background: var(--bp-tertiary);
}
</style>
