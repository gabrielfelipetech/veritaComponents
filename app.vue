<template>
  <div class="space-y-8 p-6">
    <section class="p-4 border rounded-lg  ">
      <h1>Button Light</h1>
      <div class="flex gap-4">
        <VButton size="sm"
                 icon="mdi:check"
                 iconPosition="left"
                 color="primary-em">
          Confirmar
        </VButton>
        <VButton size="md"
                 icon="mdi:arrow-right"
                 iconPosition="right"
                 color="secondary-em">
          Continuar
        </VButton>
        <VButton size="lg"
                 icon="line-md:loading-twotone-loop"
                 color="tertiary-em">
          Carregando
        </VButton>
        <VButton loading
                 size="lg"
                 icon="line-md:loading-twotone-loop"
                 color="tertiary-em">
          Carregando
        </VButton>
      </div>
      <h1>Button Dark</h1>
      <div class="flex gap-4">
        <VButton size="sm"
                 icon="mdi:check"
                 iconPosition="left"
                 color="primary-em"
                 :isThemeDark="true">
          Confirmasr
        </VButton>
        <VButton size="md"
                 icon="mdi:arrow-right"
                 iconPosition="right"
                 color="secondary-em"
                 :isThemeDark="true">
          Continuar
        </VButton>
        <VButton size="lg"
                 icon="line-md:loading-twotone-loop"
                 color="tertiary-em"
                 :isThemeDark="true">
          Carregando
        </VButton>
        <VButton loading
                 size="lg"
                 icon="line-md:loading-twotone-loop"
                 color="tertiary-em"
                 :isThemeDark="true">
          Carregando
        </VButton>
      </div>
    </section>
    <section class="p-4 border rounded-lg">
      <h1>Input Light</h1>
      <div class="flex gap-4">
        <VInput label="Nome"
                placeholder="Digite seu nome"
                icon="mdi:account"
                iconPosition="left"
                color="primary-em" />
        <VInput label="E-mail"
                placeholder="foo@bar.com"
                type="email"
                size="md"
                color="secondary-em" />
        <VInput label="Senha"
                placeholder=""
                type="text"
                size="lg"
                color="tertiary-em"
                error="Mínimo 8 caracteres" />
      </div>

      <h1>Input Dark</h1>
      <div class="flex gap-4 bg-gray-800 p-4">
        <VInput label="Nome"
                placeholder="Digite seu nome"
                icon="mdi:account"
                iconPosition="left"
                color="primary-em"
                :isThemeDark="true" />
        <VInput label="E-mail"
                placeholder="foo@bar.com"
                type="email"
                size="md"
                color="secondary-em"
                :isThemeDark="true" />
        <VInput label="Senha"
                placeholder="••••••••"
                type="password"
                size="md"
                color="tertiary-em"
                error="Mínimo 8 caracteres"
                :isThemeDark="true" />
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
          labelText="Option 1"
          labelPosition="right"
        />
        <VRadio
          v-model="selectedRadio"
          name="exampleGroup"
          value="option2"
          size="md"
          labelText="Option 2"
          labelPosition="right"
        />
        <VRadio
          v-model="selectedRadio"
          name="exampleGroup"
          value="option3"
          size="lg"
          labelText="Option 3"
          labelPosition="right"
        />
        <VRadio
          v-model="selectedRadio"
          name="exampleGroup"
          value="disabled"
          size="md"
          labelText="Disabled"
          labelPosition="right"
          :disabled="true"
        />
      </div>
      <p class="mt-2">Selected: {{ selectedRadio }}</p>
    </section>
     <section class="p-4 border rounded-lg">
      <h1>Toggle Examples</h1>
      <div class="flex gap-4 items-center">
        <VToggle v-model="toggleSm" size="sm" color="primary-em" />
        <VToggle v-model="toggleMd" size="md" color="secondary-em" />
        <VToggle v-model="toggleLg" size="lg" color="tertiary-em" :disabled="true" />
        <VToggle v-model="remindMe" size="md" color="primary-em" labelText="Lembre-me" />
        <VToggle v-model="active" size="sm" color="secondary-bp" labelText="Ativo" />
      </div>
      <p class="mt-2">toggleSm: {{ toggleSm }}</p>
      <p class="mt-1">toggleMd: {{ toggleMd }}</p>
      <p class="mt-1">toggleLg: {{ toggleLg }}</p>
      <p class="mt-1">remindMe: {{ remindMe }}</p>
      <p class="mt-1">active: {{ active }}</p>
    </section>
    <div class="flex h-screen">
    <VSidebar :items="navItems" />
  </div>
  </div>
</template>

<script setup lang="ts">
import VButton from './components/VButton.vue'
import VInput from './components/VInput.vue'
import VToggle from './components/VToggle.vue' 
import { ref } from 'vue'
import type { NavItem } from '@/components/types'

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: 'mdi:view-dashboard',
    children: [
      { label: 'Overview', to: '/dashboard/overview', icon: 'mdi:chart-areaspline' },
      { label: 'Stats',    to: '/dashboard/stats',    icon: 'mdi:chart-bar' }
    ]
  },
  { label: 'Patients',     to: '/patients',     icon: 'mdi:account-group' },
  { label: 'Appointments', to: '/appointments', icon: 'mdi:calendar-clock' },
  { label: 'Settings',     to: '/settings',     icon: 'mdi:cog' }
]
const toggleSm = ref(false)
const toggleMd = ref(true)
const toggleLg = ref(false)
const remindMe = ref(false)
const active   = ref(true)
const selectedRadio = ref('option1')
</script>

<style>
section {
  background-color: var(--b1);
}
</style>
