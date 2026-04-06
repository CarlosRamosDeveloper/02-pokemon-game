<template>
  <section class="mt-5">
    <button
      :class="[
        buttonStyle.base,
        !areButtonsAvailable && buttonStyle.idle,
        areButtonsAvailable &&
          (id === hiddenPokemonId ? buttonStyle.correct : buttonStyle.incorrect),
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

const buttonStyle = {
  base: 'shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all capitalize disabled:shadow-none disabled:bg-gray-100',
  idle: 'bg-white hover:bg-gray-300',
  correct: 'bg-blue-500! text-white',
  incorrect: 'bg-red-300! opacity-70',
};
</script>

<style scoped></style>
