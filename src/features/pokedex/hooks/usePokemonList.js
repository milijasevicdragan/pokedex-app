import { useState, useEffect, useCallback } from 'react';
import { getPokemonByIdOrName, getPokemonList } from '../api/pokemonApi';
import { mapApiToPokemon } from '../utils/mappers';

export const usePokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadPokemons = useCallback(async () => {
    if (loading) return; // Verhindert doppeltes Laden
    setLoading(true);

    try {
      // Hole immer 20 Pokemon pro Ladung
      const limit = 20;
      const pokeList = await getPokemonList(limit, offset);

      // Liefert die Anzahl aller verfügbaren Pokemon
      const totalPokemon = pokeList.count;
      const pokeDetails = await Promise.all(pokeList.results.map((pokemon) => getPokemonByIdOrName(pokemon.name)));

      // Daten in ein Objekt transformieren
      const newPokemonData = pokeDetails.map((pokemon) => mapApiToPokemon(pokemon));
      setPokemon((prevPokemon) => [...prevPokemon, ...newPokemonData]);

      // Wenn wir alle Pokemon geladen haben, keine mehr laden
      if (pokemon.length + newPokemonData.length >= totalPokemon) {
        setHasMore(false);
      }
    } catch (err) {
      setError('Konnte Pokémon nicht laden.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [offset]);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]); // Leeres Array -> wird nur beim Mounten ausgeführt

  // Die nächsten 20 Laden
  const loadMore = () => {
    setOffset((prev) => prev + 20);
  };

  return { pokemon, loading, error, loadMore, hasMore };
};
