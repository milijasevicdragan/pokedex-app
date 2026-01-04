import { getPokemonByIdOrName } from '@/features/pokedex/api/pokemonApi';
import { mapApiToPokemon } from '@/features/pokedex/utils/mappers';

export const normalizeEvolutionChain = async (chain) => {
  const evolutionChain = [];
  let currentChain = chain;

  while (currentChain && currentChain.species) {
    const speciesName = currentChain.species.name;
    // ID ist nur in der URL enthalten
    const urlParts = currentChain.species.url.split('/');
    const id = urlParts[urlParts.length - 2];

    evolutionChain.push({ id, speciesName });
    currentChain = currentChain.evolves_to[0];
  }

  // Alle pokemon daten auf einmal holen
  const apiPromises = evolutionChain.map((pokeData) => getPokemonByIdOrName(pokeData.id));
  const apiResponses = await Promise.all(apiPromises);

  // Fertiges Objekt zusammenbauen
  const finalEvolutionChain = evolutionChain.map((pokemonItem) => {
    // Prüft ob die pokemon id's zusamenpassen
    const matchingPokemon = apiResponses.find((response) => String(response.id) === pokemonItem.id);
    const pokemon = mapApiToPokemon(matchingPokemon);

    return {
      id: pokemonItem.id,
      name: pokemonItem.speciesName,
      image: pokemon.sprite,
    };
  });

  return finalEvolutionChain;
};
