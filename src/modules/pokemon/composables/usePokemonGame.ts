import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemonList = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);

  const isLoading = computed(() => pokemonList.value.length === 0);
  const hiddenPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);

    return pokemonOptions.value[randomIndex];
  });

  const getPokemon = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

    const pokeArray: Pokemon[] = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const pokemonId = urlParts.at(-2) ?? '0';

      return {
        name: pokemon.name,
        id: +pokemonId,
      };
    });

    return pokeArray.sort(() => Math.random() - 0.5);
  };

  const getPokemonOptions = (pokemonQuantity: number = 5) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemonList.value.slice(0, pokemonQuantity);
    pokemonList.value = pokemonList.value.slice(pokemonQuantity);
  };

  const checkAnswer = (answerId: number) => {
    if (hiddenPokemon.value === undefined) return;

    const hasPlayerWon = hiddenPokemon.value.id === answerId;
    if (hasPlayerWon) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.5 },
      });

      return;
    }

    gameStatus.value = GameStatus.Lost;
    return;
  };

  onMounted(async () => {
    await new Promise((r) => setTimeout(r, 1000));

    pokemonList.value = await getPokemon();
    getPokemonOptions();

    console.log({ pokemonOptions });
  });

  return {
    gameStatus: gameStatus,
    isLoading: isLoading,
    pokemonOptions: pokemonOptions,
    hiddenPokemon: hiddenPokemon,

    getPokemonOptions: getPokemonOptions,
    checkAnswer: checkAnswer,
  };
};
