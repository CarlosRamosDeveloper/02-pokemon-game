<template>
  <section class="mt-5">
    <button
      :class="[
        'pokemon-option capitalize :disabled:shadow-none :disabled:bg-gray-100',
        {
          correct: id === hiddenPokemonId && areButtonsAvailable,
          incorrect: id !== hiddenPokemonId && areButtonsAvailable,
        },
      ]"
      v-for="{ name, id } in options"
      :key="id"
      :disabled="areButtonsAvailable"
      @click="$emit('selectedOption', id)"
    >
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';

interface Props {
  options: Pokemon[];
  areButtonsAvailable: boolean;
  hiddenPokemonId: number;
}

defineProps<Props>();

defineEmits<{
  selectedOption: [id: number];
}>();
</script>

<style scoped></style>
