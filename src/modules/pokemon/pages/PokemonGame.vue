<template>
  <section
    v-if="isLoading && !hiddenPokemon"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere, por favor...</h1>
    <h3 class="animate-pulse">Cargando...</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 v-if="gameStatus===GameStatus.Playing" class="m-5 h-20">¿Quien es este Pokémon?</h1>

    <div class="m-5 h-20" v-if="gameStatus !== GameStatus.Playing">
      <button        
        @click="getPokemonOptions(5)"
        class="bg-orange-400 text-white p-2 rounded-xl hover:bg-orange-600 transition-all"
      >
        Siguiente ronda
      </button>
    </div>

    <PokemonPicture
      v-if="hiddenPokemon"
      :pokemon-id="hiddenPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />

    <GameOptions
      v-if="hiddenPokemon"
      :options="options"
      @selected-option="checkAnswer"
      :areButtonsAvailable="gameStatus !== GameStatus.Playing"
      :hidden-pokemon-id="hiddenPokemon.id"
    />
  </section>
</template>

<script setup lang="ts">
import GameOptions from '../components/GameOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const {
  hiddenPokemon,
  gameStatus,
  isLoading,
  pokemonOptions: options,
  checkAnswer,
  getPokemonOptions,
} = usePokemonGame();
</script>

<style scoped></style>
