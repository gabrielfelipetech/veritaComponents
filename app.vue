<template>
  <div class="space-y-8 p-6">

    <section  class="space-y-4 p-4 border rounded-lg">
      <VButton icon="mdi:check" iconPosition="left" >
        Confirmar
      </VButton>
      <VButton icon="mdi:arrow-right" iconPosition="right">
        Continuar
      </VButton>
      <VButton loading icon="line-md:loading-twotone-loop" >
        Carregando
      </VButton>
      <VInput
        label="E-mail"
        placeholder="Digite seu e-mail"
        type="email"
        icon="mdi:email-outline"
        iconPosition="left"
        required
        size="md"
      />
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
