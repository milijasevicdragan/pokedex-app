import { useState, useEffect, useCallback } from 'react';
import { getPokemonByIdOrName, getPokemonByType, getPokemonList } from '../api/pokemonApi';
import { mapApiToPokemon } from '../utils/mappers';

export const usePokemonList = () => {
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [pokemon, setPokemon] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 20;

  // Ladet zuerst eine Liste nur mit den Pokemonnamen
  const getAllPokemonNames = async () => {
    setLoading(true);
    setError(null);

    try {
      let results = [];

      if (selectedType) {
        // Wenn typ ausgewählt wurde, pokemon danach filtern
        const pokemonByType = await getPokemonByType(selectedType);
        results = pokemonByType.pokemon.map((pokemon) => pokemon.pokemon);
      } else {
        // Ansonsten alle Pokemon laden
        const pokemonList = await getPokemonList(1500, 0);
        results = pokemonList.results;
      }

      if (searchQuery) {
        results = results.filter((pokemon) => pokemon.name.includes(searchQuery));
      }

      setAllPokemonNames(results);
      setOffset(0);
      setPokemon([]);
      setHasMore(results.length > 0);
    } catch (error) {
      setError('Fehler beim Laden der Liste.');
      console.error('Liste konnte nicht geladen werden.', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Verhindert das die Funktion bei jedem Tastenanschlag feuert
    const timeout = setTimeout(() => {
      getAllPokemonNames();
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery, selectedType]);

  const loadPokemons = useCallback(async () => {
    // Verhindert doppeltes Laden
    if (loading || allPokemonNames.length === 0) return;

    try {
      // Nicht alle Pokemon anzeigen, sondern nur ein Stück
      const slice = allPokemonNames.slice(offset, offset + LIMIT);

      // Prüft ob wir am Ende der Liste angekommen sind
      if (slice.length === 0) {
        setHasMore(false);
        return;
      }

      const pokeDetails = await Promise.all(slice.map((pokemon) => getPokemonByIdOrName(pokemon.name)));

      // Daten in ein Objekt transformieren
      const newPokemonData = pokeDetails.map((pokemon) => mapApiToPokemon(pokemon));
      setPokemon((prevPokemon) => [...prevPokemon, ...newPokemonData]);

      // Bei erreichen vom Ende der Liste keine Pokemon mehr laden
      if (offset + LIMIT >= allPokemonNames.length) {
        setHasMore(false);
      }
    } catch (err) {
      setError('Fehler beim Laden der Pokemon');
      console.error('Pokemon-Liste konnte nicht geladen werden.', err);
    }
  }, [offset, loading, allPokemonNames]);

  useEffect(() => {
    loadPokemons();
  }, [offset, allPokemonNames]);

  // Offset erweitern und weitere Pokemon laden
  const loadMore = () => {
    setOffset((prev) => prev + LIMIT);
  };

  return { pokemon, loading, error, loadMore, hasMore, setSearchQuery, setSelectedType };
};
