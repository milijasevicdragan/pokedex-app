import axios from 'axios';
import { useEffect, useState } from 'react';
import { getPokemonByIdOrName, getPokemonSpeciesById } from '@/shared/api/pokemonApi';
import { mapApiToPokemon, mapApiToSpecies } from '@/shared/utils/mappers';
import { normalizeEvolutionChain } from '../utils/evolutionChainHelper';

export const usePokemonDetails = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);

  const [evolutions, setEvolutions] = useState([]);
  const [megaEvolutions, setMegaEvolutions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPokemonSpecies = async () => {
    setLoading(true);
    setError(null);

    try {
      const pokemonResponse = await getPokemonByIdOrName(id);

      // Pokemon Species ID holen
      const speciesUrl = pokemonResponse.species.url;
      const urlParts = speciesUrl.split('/');
      const speciesId = urlParts[urlParts.length - 2];

      const speciesResponse = await getPokemonSpeciesById(speciesId);
      const varieties = speciesResponse.varieties;

      const megaPromises = varieties.map(async (mega) => {
        const response = await getPokemonByIdOrName(mega.pokemon.name);
        return mapApiToPokemon(response);
      });
      const megaPokemons = await Promise.all(megaPromises);

      console.log('Species Response Rohdaten:', speciesResponse);
      // CHANGE: Variabelname für mehr klarheit geändert
      const mappedSpecies = mapApiToSpecies(speciesResponse);
      console.log('Species Gemappt:', mappedSpecies);

      setPokemon(mapApiToPokemon(pokemonResponse));
      setPokemonSpecies(mapApiToSpecies(speciesResponse));
      setMegaEvolutions(megaPokemons);

      const evolutionChainUrl = speciesResponse.evolution_chain.url;

      if (evolutionChainUrl) {
        const evolutionChainResponse = await axios.get(evolutionChainUrl);

        const normalizedChain = await normalizeEvolutionChain(evolutionChainResponse.data.chain);
        setEvolutions(normalizedChain);
      }
    } catch (error) {
      setError(error);
      console.error('Pokemon Details konnten nicht geladen werden.', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadPokemonSpecies();
    }
  }, [id]);

  return { pokemon, pokemonSpecies, megaEvolutions, evolutions, loading, error };
};
