<template>
  <section
    v-if="isLoading && !hiddenPokemon"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere, por favor...</h1>
    <h3 class="animate-pulse">Cargando...</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Quien es este Pokémon?</h1>
  
    <PokemonPicture
      v-if="hiddenPokemon"
      :pokemon-id="hiddenPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />

    <GameOptions :options="options" @selected-option="checkAnswer"/>
  </section>
</template>

<script setup lang="ts">
import GameOptions from '../components/GameOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { hiddenPokemon, gameStatus, isLoading, pokemonOptions: options, checkAnswer } = usePokemonGame();

console.log(gameStatus);
</script>

<style scoped></style>
