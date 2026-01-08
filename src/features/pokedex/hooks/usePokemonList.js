import { useState, useEffect, useCallback } from 'react';
import { getPokemonByIdOrName, getPokemonByType, getPokemonList } from '@/shared/api/pokemonApi';
import { mapApiToPokemon } from '@/shared/utils/mappers';
import { isPokemonInGeneration } from '@/shared/utils/filterHelper';

// Cached variables
const cache = {
  pokemon: [],
  allPokemonNames: [],
  offset: 0,
  hasMore: true,
  searchQuery: '',
  selectedType: 'all',
  selectedGeneration: 'all',
};

export const usePokemonList = () => {
  // State mit den Werten vom Cache starten
  const [allPokemonNames, setAllPokemonNames] = useState(cache.allPokemonNames);
  const [pokemon, setPokemon] = useState(cache.pokemon);

  const [searchQuery, setSearchQuery] = useState(cache.searchQuery);
  const [selectedType, setSelectedType] = useState(cache.selectedType);
  const [selectedGeneration, setSelectedGeneration] = useState(cache.selectedGeneration);

  const [offset, setOffset] = useState(cache.offset);
  const [hasMore, setHasMore] = useState(cache.hasMore);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const LIMIT = 20;

  const updateCache = (updates) => {
    Object.assign(cache, updates);
  };

  // Ladet zuerst eine Liste nur mit den Pokemonnamen
  const getAllPokemonNames = async () => {
    // Wenn Daten vorhanden und nicht geändert -> nichts tun
    if (
      pokemon.length > 0 &&
      searchQuery === cache.searchQuery &&
      selectedType === cache.selectedType &&
      selectedGeneration === cache.selectedGeneration
    ) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let results = [];

      if (selectedType && selectedType !== 'all') {
        // Wenn typ ausgewählt wurde, pokemon danach filtern
        const pokemonByType = await getPokemonByType(selectedType);
        results = pokemonByType.pokemon.map((pokemon) => pokemon.pokemon);
      } else {
        // Ansonsten alle Pokemon laden
        const pokemonList = await getPokemonList(1500, 0);
        results = pokemonList.results;
      }

      // Liste mit ID's wichtig für den Generationen-Filter
      const listWithIds = results.map((pokemon) => {
        const urlParts = pokemon.url.split('/');
        const id = Number(urlParts[urlParts.length - 2]);

        return { ...pokemon, id };
      });

      const filteredResults = listWithIds.filter((pokemon) => {
        const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLocaleLowerCase());
        const matchesGeneration = isPokemonInGeneration(pokemon.id, selectedGeneration);

        return matchesSearch && matchesGeneration;
      });

      setAllPokemonNames(filteredResults);
      setOffset(0);
      setPokemon([]);
      setHasMore(results.length > 0);

      updateCache({
        allPokemonNames: filteredResults,
        offset: 0,
        pokemon: [],
        hasMore: filteredResults.length > 0,
        searchQuery,
        selectedType,
        selectedGeneration,
      });
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
      const filtersChanged =
        searchQuery !== cache.searchQuery ||
        selectedType !== cache.selectedType ||
        selectedGeneration !== cache.selectedGeneration;

      if (filtersChanged || (pokemon.length === 0 && !loading)) {
        getAllPokemonNames();
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery, selectedType, selectedGeneration]);

  const loadPokemons = useCallback(async () => {
    // Verhindert doppeltes Laden
    if (loading || allPokemonNames.length === 0) return;

    // Sind im Cache schon Pokemon geladen, dann nichts tun
    if (cache.pokemon.length >= offset + LIMIT) {
      return;
    }

    if (offset > 0 && offset >= allPokemonNames.length) {
      setHasMore(false);
      updateCache({ hasMore: false });
      return;
    }

    try {
      // Nicht alle Pokemon anzeigen, sondern nur ein Stück
      const slice = allPokemonNames.slice(offset, offset + LIMIT);

      // Prüft ob wir am Ende der Liste angekommen sind
      if (slice.length === 0) {
        setHasMore(false);
        return;
      }

      const pokeDetails = await Promise.all(slice.map((pokemon) => getPokemonByIdOrName(pokemon.name)));
      const newPokemonData = pokeDetails.map((pokemon) => mapApiToPokemon(pokemon));

      // Daten in ein Objekt transformieren
      setPokemon((prevPokemon) => {
        const existingIds = new Set(prevPokemon.map((p) => p.id));
        const uniqueNewPokemon = newPokemonData.filter((p) => !existingIds.has(p.id));

        const newList = [...prevPokemon, ...uniqueNewPokemon];
        updateCache({ pokemon: newList });
        return newList;
      });

      // Alle Pokemon wurden geladen.
      if (offset + LIMIT >= allPokemonNames.length) {
        setHasMore(false);
        updateCache({ hasMore: false });
      }
    } catch (error) {
      setError('Fehler beim Laden der Pokemon');
      console.error('Pokemon-Liste konnte nicht geladen werden.', error);
    }
  }, [offset, loading, allPokemonNames, pokemon]);

  useEffect(() => {
    if (allPokemonNames.length > 0) {
      loadPokemons();
    }
  }, [offset, allPokemonNames]);

  // Offset erweitern und weitere Pokemon laden
  const loadMore = () => {
    if (!loading && hasMore) {
      const newOffset = offset + LIMIT;
      setOffset(newOffset);
      updateCache({ offset: newOffset });
    }
  };

  return {
    pokemon,
    loading,
    error,
    loadMore,
    hasMore,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedGeneration,
    setSelectedGeneration,
  };
};
