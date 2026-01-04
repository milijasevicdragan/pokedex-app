import Pokemon from '@/features/pokemon/components/Pokemon';
import PokemonDetails from '@/features/pokemon/components/PokemonDetails';
import { usePokemonDetails } from '@/features/pokemon/hooks/usePokemonDetails';
import { Link, useParams } from 'react-router-dom';

export default function PokemonPage() {
  // useParams holt die ID aus der URL
  const { id } = useParams();
  const { pokemon, pokemonSpecies, evolutions, loading, error } = usePokemonDetails(id);

  if (error) return <p className='text-center text-red-500 mt-10'>{error}</p>;
  if (loading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-red-500'></div>
      </div>
    );
  }

  return (
    <>
      <div className='container mx-auto'>
        <Link to='/' className='text-blue-500 underline mb-4 block'>
          &larr; Pokedex
        </Link>
        <div className=' py-16'>
          <div className='flex flex-row justify-between'>
            <Pokemon pokemon={pokemon} evolutions={evolutions} />
            <PokemonDetails species={pokemonSpecies} />
          </div>
        </div>
      </div>
    </>
  );
}
