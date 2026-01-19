import Pokemon from '@/features/pokemon/components/Pokemon';
import PokemonDetails from '@/features/pokemon/components/PokemonDetails';
import { usePokemonDetails } from '@/features/pokemon/hooks/usePokemonDetails';
import Error from '@/shared/components/Error';
import { Link, useParams } from 'react-router-dom';

export default function PokemonPage() {
  // useParams holt die ID aus der URL
  const { id } = useParams();
  const { pokemon, pokemonSpecies, megaEvolutions, evolutions, loading, error } = usePokemonDetails(id);

  // Für Navigation (Berechnung der Pokemon IDs)
  const currentId = parseInt(id);
  const prevId = currentId > 1 ? currentId - 1 : null;
  const nextId = currentId + 1;

  if (error) return <Error error={error} />;
  if (loading || !pokemon) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-red-500'></div>
      </div>
    );
  }

  return (
    <>
      {/* Navigation Desktop */}
      {prevId && (
        <Link
          to={`/pokemon/${prevId}`}
          className='hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-lg hover:bg-gray-100 hover:scale-110 transition-all z-50 text-gray-600'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2.5}
            stroke='currentColor'
            className='w-6 h-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </Link>
      )}

      <div className='container mx-auto flex flex-col lg:flex-row justify-between p-8 gap-8'>
        <Pokemon pokemon={pokemon} megaEvolutions={megaEvolutions} evolutions={evolutions} />
        <PokemonDetails pokemon={pokemon} pokemonSpecies={pokemonSpecies} />
      </div>

      <Link
        to={`/pokemon/${nextId}`}
        className='hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-lg hover:bg-gray-100 hover:scale-110 transition-all z-50 text-gray-600'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2.5}
          stroke='currentColor'
          className='w-6 h-6'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
        </svg>
      </Link>
    </>
  );
}
