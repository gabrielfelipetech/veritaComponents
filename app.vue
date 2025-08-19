<template>
  <div class="space-y-8 p-6">
    <section class="p-4 border rounded-lg">
      <h1>Button Light</h1>
      <div class="flex gap-4">
        <VButton size="sm" icon="mdi:check" icon-position="left" color="primary-em"
          >Confirmar</VButton
        >
        <VButton size="md" icon="mdi:arrow-right" icon-position="right" color="secondary-em"
          >Continuar</VButton
        >
        <VButton size="lg" icon="line-md:loading-twotone-loop" color="tertiary-em"
          >Carregando</VButton
        >
        <VButton loading size="lg" icon="line-md:loading-twotone-loop" color="tertiary-em"
          >Carregando</VButton
        >
      </div>

      <h1 class="mt-4">Button Dark</h1>
      <div class="flex gap-4">
        <VButton
          size="sm"
          icon="mdi:check"
          icon-position="left"
          color="primary-em"
          :is-theme-dark="true"
          >Confirmasr</VButton
        >
        <VButton
          size="md"
          icon="mdi:arrow-right"
          icon-position="right"
          color="secondary-em"
          :is-theme-dark="true"
          >Continuar</VButton
        >
        <VButton
          size="lg"
          icon="line-md:loading-twotone-loop"
          color="tertiary-em"
          :is-theme-dark="true"
          >Carregando</VButton
        >
        <VButton
          loading
          size="lg"
          icon="line-md:loading-twotone-loop"
          color="tertiary-em"
          :is-theme-dark="true"
          >Carregando</VButton
        >
      </div>
    </section>

    <section class="p-4 border rounded-lg">
      <h1>Input Light</h1>
      <div class="flex gap-4">
        <VInput
          label="Nome"
          placeholder="Digite seu nome"
          icon="mdi:account"
          icon-position="left"
          color="primary-em"
        />
        <VInput
          label="E-mail"
          placeholder="foo@bar.com"
          type="email"
          size="md"
          color="secondary-em"
        />
        <VInput
          label="Senha"
          placeholder=""
          type="text"
          size="lg"
          color="tertiary-em"
          error="Mínimo 8 caracteres"
        />
      </div>

      <h1 class="mt-4">Input Dark</h1>
      <div class="flex gap-4 bg-gray-800 p-4">
        <VInput
          label="Nome"
          placeholder="Digite seu nome"
          icon="mdi:account"
          icon-position="left"
          color="primary-em"
          :is-theme-dark="true"
        />
        <VInput
          label="E-mail"
          placeholder="foo@bar.com"
          type="email"
          size="md"
          color="secondary-em"
          :is-theme-dark="true"
        />
        <VInput
          label="Senha"
          placeholder="••••••••"
          type="password"
          size="md"
          color="tertiary-em"
          error="Mínimo 8 caracteres"
          :is-theme-dark="true"
        />
      </div>
    </section>

    <section class="p-4 border rounded-lg">
      <h1>Radio Examples</h1>
      <div class="flex gap-4 items-center">
        <VRadio
          v-model="selectedRadio"
          name="exampleGroup"
          value="option1"
          size="sm"
          label-text="Option 1"
          label-position="right"
        />
        <VRadio
          v-model="selectedRadio"
          name="exampleGroup"
          value="option2"
          size="md"
          label-text="Option 2"
          label-position="right"
        />
        <VRadio
          v-model="selectedRadio"
          name="exampleGroup"
          value="option3"
          size="lg"
          label-text="Option 3"
          label-position="right"
        />
        <VRadio
          v-model="selectedRadio"
          name="exampleGroup"
          value="disabled"
          size="md"
          label-text="Disabled"
          label-position="right"
          :disabled
        />
      </div>
      <p class="mt-2">Selected: {{ selectedRadio }}</p>
    </section>

    <section class="p-4 border rounded-lg">
      <h1>Toggle Examples</h1>
      <div class="flex gap-4 items-center">
        <VToggle v-model="toggleSm" size="sm" color="primary-em" />
        <VToggle v-model="toggleMd" size="md" color="secondary-em" />
        <VToggle v-model="toggleLg" size="lg" color="tertiary-em" :disabled />
        <VToggle v-model="remindMe" size="md" color="primary-em" label-text="Lembre-me" />
        <VToggle v-model="active" size="sm" color="secondary-bp" label-text="Ativo" />
      </div>
      <p class="mt-2">toggleSm: {{ toggleSm }}</p>
      <p class="mt-1">toggleMd: {{ toggleMd }}</p>
      <p class="mt-1">toggleLg: {{ toggleLg }}</p>
      <p class="mt-1">remindMe: {{ remindMe }}</p>
      <p class="mt-1">active: {{ active }}</p>
    </section>

    <div class="flex h-60">
      <VSidebar :items="navItems" />
    </div>

    <section class="p-4 border rounded-lg">
      <h1 class="mb-4">Dynamic Question (VDynamicQuestion + VOtherList + VRange)</h1>
      <form class="space-y-6">
        <VDynamicQuestion
          v-for="n in formNodes"
          :key="n.key"
          :node="n"
          :model="responses"
          :color="'primary-bp'"
          :size="'md'"
          :layout="n.layout ?? 'row'"
          :child-layout="n.childLayout ?? 'row'"
        />
        <pre class="bg-gray-50 p-2 text-xs rounded"> {{ responses }} </pre>
      </form>
    </section>
    <section class="p-4 border rounded-lg">
      <h1 class="mb-2">VRange básico (sem métricas)</h1>
      <VRange v-model="rA" :min="-10" :max="10" :step="1" color="primary" size="md" />
      <p class="text-sm mt-2">Valor: {{ rA }}</p>
    </section>

    <section class="p-4 border rounded-lg">
      <h1 class="mb-2">VRange com métricas 0–5</h1>
      <VRange
        v-model="rB"
        :min="0"
        :max="5"
        :step="1"
        :show-ticks="true"
        :tick-step="1"
        color="secondary"
        size="md"
      />
      <p class="text-sm mt-2">Valor: {{ rB }}</p>
    </section>

    <section class="p-4 border rounded-lg">
      <h1 class="mb-2">VRange negativo → positivo</h1>
      <VRange
        v-model="rC"
        :min="-100"
        :max="100"
        :step="5"
        :show-ticks="true"
        :tick-step="50"
        color="tertiary"
        size="lg"
      />
      <p class="text-sm mt-2">Valor: {{ rC }}</p>
    </section>

    <section class="p-4 border rounded-lg">
      <h1 class="mb-2">VRange escala grande</h1>
      <VRange
        v-model="rD"
        :min="0"
        :max="1000000"
        :step="1000"
        :show-ticks="true"
        :tick-step="250000"
        color="primary"
        size="sm"
      />
      <p class="text-sm mt-2">Valor: {{ rD.toLocaleString('pt-BR') }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import VButton from './components/VButton.vue';
import VInput from './components/VInput.vue';
import VToggle from './components/VToggle.vue';
import VRadio from './components/VRadio.vue';
import VSidebar from './components/VSidebar.vue';
import VDynamicQuestion from './components/VDynamicQuestion.vue';
const rA = ref<number>(0);
const rB = ref<number>(2);
const rC = ref<number>(0);
const rD = ref<number>(500000);
const qSintomas = {
  key: 'symptoms',
  label: 'Quais destes sintomas apresenta?',
  type: 'checkbox',
  layout: 'row',
  options: [
    { label: 'Febre', value: 'febre' },
    { label: 'Tosse', value: 'tosse' },
    { label: 'Falta de ar', value: 'falta_ar' },
    { label: 'Dor de cabeça', value: 'cefaleia' },
    { label: 'Outro', value: 'outro', allowCustom: true },
  ],
} as const;
const qDor = {
  key: 'pain',
  label: 'Você sente dor atualmente?',
  type: 'radio',
  options: [
    {
      label: 'Sim',
      value: 'sim',
      children: [
        { key: 'painLocation', label: 'Onde?', type: 'text', placeholder: 'Ex: abdômen' },
        {
          key: 'painIntensity',
          label: 'Intensidade',
          type: 'range',
          min: 0,
          max: 10,
          step: 1,
          showTicks: true,
          tickStep: 1,
        },
      ],
    },
    { label: 'Não', value: 'nao' },
  ],
} as const;

const qMedicamentos = {
  key: 'meds',
  label: 'Está usando algum medicamento?',
  type: 'checkbox',
  layout: 'col',
  asObjects: true,
  childrenLayout: 'row',
  options: [
    {
      label: 'Analgésico',
      value: 'analgesico',
      children: [
        { key: 'nome', label: 'Qual?', type: 'text', placeholder: 'Ex: Dipirona' },
        { key: 'dose_mg', label: 'Dosagem (mg)', type: 'number', placeholder: 'Ex: 500' },
        { key: 'frequencia', label: 'Frequência', type: 'text', placeholder: 'Ex: 8/8h' },
        { key: 'duracao_dias', label: 'Por quantos dias?', type: 'number', placeholder: 'Ex: 5' },
      ],
    },
    {
      label: 'Antibiótico',
      value: 'antibiotico',
      children: [
        { key: 'nomeAntibiótico', label: 'Qual?', type: 'text', placeholder: 'Ex: Amoxicilina' },
        { key: 'dose_mg', label: 'Dosagem (mg)', type: 'number' },
        { key: 'frequencia', label: 'Frequência', type: 'text' },
        { key: 'duracao_dias', label: 'Dias', type: 'number' },
      ],
    },
    {
      label: 'Anti-inflamatório',
      value: 'anti-inflamatorio',
      children: [
        { key: 'nome', label: 'Qual?', type: 'text' },
        { key: 'dose_mg', label: 'Dosagem (mg)', type: 'number' },
        { key: 'frequencia', label: 'Frequência', type: 'text' },
      ],
    },
    { label: 'Outro', value: 'outro', allowCustom: true },
  ],
} as const;
const formNodes = [qDor, qSintomas, qMedicamentos];
const navItems = [
  {
    label: 'Dashboard',
    icon: 'mdi:view-dashboard',
    children: [
      { label: 'Overview', to: '/dashboard/overview', icon: 'mdi:chart-areaspline' },
      { label: 'Stats', to: '/dashboard/stats', icon: 'mdi:chart-bar' },
    ],
  },
  { label: 'Patients', to: '/patients', icon: 'mdi:account-group' },
  { label: 'Appointments', to: '/appointments', icon: 'mdi:calendar-clock' },
  { label: 'Settings', to: '/settings', icon: 'mdi:cog' },
];
const toggleSm = ref(false);
const toggleMd = ref(true);
const toggleLg = ref(false);
const remindMe = ref(false);
const active = ref(true);
const selectedRadio = ref('option1');

const responses = reactive<Record<string, any>>({
  pain: '',
  symptoms: [],
  meds: [],
});
</script>

<style>
section {
  background-color: var(--b1);
}
</style>
