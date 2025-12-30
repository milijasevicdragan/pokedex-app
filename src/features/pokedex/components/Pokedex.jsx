import PokeCard from './PokeCard';
import { usePokemonList } from '../hooks/usePokemonList';

export default function Pokedex() {
  const { pokemon, loading, error } = usePokemonList();

  if (loading) return <p className='text-center mt-10'>Lade Pokedex...</p>;
  if (error) return <p className='text-center text-red-500 mt-10'>{error}</p>;

  return (
    <div className='grid grid-cols-2 gap-4 mx-auto md:grid-cols-3'>
      {pokemon.map((pokemon) => (
        <PokeCard
          key={pokemon.id}
          name={pokemon.name}
          number={pokemon.id}
          types={pokemon.types}
          sprite={pokemon.sprite}
        />
      ))}
    </div>
  );
}
