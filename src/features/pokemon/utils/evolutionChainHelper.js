import { getPokemonByIdOrName } from '@/shared/api/pokemonApi';
import { mapApiToPokemon } from '@/shared/utils/mappers';

export const normalizeEvolutionChain = async (chain) => {
  const evolutionChain = [];

  const collectEvolutions = (node, parentId = null) => {
    const speciesName = node.species.name;
    // ID ist nur in der URL enthalten
    const urlParts = node.species.url.split('/');
    const id = urlParts[urlParts.length - 2];

    evolutionChain.push({ id, name: speciesName, evolvesFromId: parentId });

    if (node.evolves_to && node.evolves_to.length > 0) {
      node.evolves_to.forEach((childNode) => {
        collectEvolutions(childNode, id);
      });
    }
  };

  collectEvolutions(chain, null);

  const uniqueIds = [...new Set(evolutionChain.map((item) => item.id))];

  // Alle pokemon daten auf einmal holen
  const apiPromises = uniqueIds.map((uniqueId) => getPokemonByIdOrName(uniqueId));
  const apiResponses = await Promise.all(apiPromises);

  // Fertiges Objekt zusammenbauen
  const finalEvolutionChain = evolutionChain.map((pokemonItem) => {
    // Prüft ob die pokemon id's zusamenpassen
    const matchingPokemon = apiResponses.find((response) => String(response.id) === pokemonItem.id);
    const pokemon = mapApiToPokemon(matchingPokemon);

    return {
      id: pokemonItem.id,
      name: pokemonItem.name,
      image: pokemon.sprite,
      evolvesFromId: pokemonItem.evolvesFromId,
    };
  });

  return finalEvolutionChain;
};
