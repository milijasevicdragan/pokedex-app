import axios from 'axios';
import { useEffect, useState } from 'react';
import { getPokemonByIdOrName, getPokemonSpeciesById } from '@/shared/api/pokemonApi';
import { mapApiToPokemon } from '@/shared/utils/mappers';
import { normalizeEvolutionChain } from '../utils/evolutionChainHelper';

export const usePokemonDetails = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);

  const [evolutions, setEvolutions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPokemonSpecies = async () => {
    setLoading(true);
    setError(null);

    try {
      // Parallel laden für bessere Performance
      const [pokemonResponse, speciesResponse] = await Promise.all([
        getPokemonByIdOrName(id),
        getPokemonSpeciesById(id),
      ]);

      // HIER DIE POKEMONBESCHREIBUNG EINFÜGEN

      setPokemon(mapApiToPokemon(pokemonResponse));
      setPokemonSpecies(speciesResponse);

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

  return { pokemon, pokemonSpecies, evolutions, loading, error };
};
