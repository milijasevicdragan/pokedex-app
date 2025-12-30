// src/features/pokedex/hooks/usePokemonList.ts
import { useState, useEffect } from 'react';
import { getPokemonByIdOrName, getPokemonList } from '../api/pokemonApi';
import { mapApiToPokemon } from '../utils/mappers';

export const usePokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const pokeList = await getPokemonList(151, 0); // Laden wir erstmal Gen 1

        const pokeDetails = await Promise.all(pokeList.results.map((pokemon) => getPokemonByIdOrName(pokemon.name)));

        // Daten in ein Objekt transformieren
        const mappedPokeData = pokeDetails.map((pokemon) => mapApiToPokemon(pokemon));
        setPokemon(mappedPokeData);
      } catch (err) {
        setError('Konnte Pokémon nicht laden.');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []); // Leeres Array -> wird nur beim Mounten ausgeführt

  return { pokemon, loading, error };
};
