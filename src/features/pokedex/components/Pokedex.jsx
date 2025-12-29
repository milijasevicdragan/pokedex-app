import PokeCard from './PokeCard';
import { useEffect, useState } from 'react';
import { getPokemonByIdOrName, getPokemonList } from '../api/pokemon.api';

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadPokemons() {
    try {
      setLoading(true);
      setError(null);

      const pokeList = await getPokemonList(20, 0);
      // Promise.all() -> Requests parallel starten und warten bis alle Fertig sind
      const pokeDetails = await Promise.all(pokeList.results.map((pokemon) => getPokemonByIdOrName(pokemon.name)));

      setPokemonList(pokeDetails);
    } catch (err) {
      setError('Failed to load Pokémon list');
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPokemons();
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='grid grid-cols-2 gap-4 mx-auto md:grid-cols-3'>
      {pokemonList.map((pokemon) => (
        <PokeCard
          key={pokemon.id}
          name={pokemon.name}
          number={pokemon.id}
          type={pokemon.types[0].type.name}
          sprite={pokemon.sprites.other.dream_world.front_default}
        />
      ))}
    </div>
  );
}

export default Pokedex;
