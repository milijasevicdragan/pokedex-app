import { GENERATIONS } from '../constants/pokemonConfig';

export const isPokemonInGeneration = (pokemonId, generationId) => {
  if (!generationId || generationId === 'all') return true;

  const generation = GENERATIONS.find((generation) => generation.id === Number(generationId));

  if (!generation) return true;

  // Prüft ob die PokemonID zwischen den ID's der Generation liegt
  const [min, max] = generation.range;
  return pokemonId >= min && pokemonId <= max;
};
