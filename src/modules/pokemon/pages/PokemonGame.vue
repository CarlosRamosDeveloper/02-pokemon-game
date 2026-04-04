<template>
  <section v-if="isLoading" class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Espere, por favor...</h1>
    <h3 class="animate-pulse">Cargando...</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Quien es este Pokémon?</h1>
    <h3>{{ hiddenPokemon?.name }}</h3>

    <PokemonPicture />

    <GameOptions />

  </section>
</template>

<script setup lang="ts">
import GameOptions from '../components/GameOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';

const { hiddenPokemon, gameStatus, isLoading } = usePokemonGame()

console.log(gameStatus)

</script>

<style scoped></style>
