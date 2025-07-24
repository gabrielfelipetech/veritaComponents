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
        <VInput
          label="Nome"
          placeholder="Digite seu nome"
          icon="mdi:account"
          iconPosition="left"
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

      <h1>Input Dark</h1>
      <div class="flex gap-4 bg-gray-800 p-4">
        <VInput
          label="Nome"
          placeholder="Digite seu nome"
          icon="mdi:account"
          iconPosition="left"
          color="primary-em"
          :isThemeDark="true"
        />
        <VInput
          label="E-mail"
          placeholder="foo@bar.com"
          type="email"
          size="md"
          color="secondary-em"
          :isThemeDark="true"
        />
        <VInput
          label="Senha"
          placeholder="••••••••"
          type="password"
          size="md"
          color="tertiary-em"
          error="Mínimo 8 caracteres"
          :isThemeDark="true"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import VButton from './components/VButton.vue'
import VInput from './components/VInput.vue'
</script>

<style>
section {
  background-color: var(--b1);
}
</style>
