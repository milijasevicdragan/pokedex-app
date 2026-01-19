import PokeCard from './PokeCard';
import { usePokemonList } from '../hooks/usePokemonList';
import InfiniteScroll from 'react-infinite-scroll-component';
import Filter from './Filter';
import SkeletonPokeCard from './SkeletonPokeCard';
import Error from '@/shared/components/Error';

export default function Pokedex() {
  const {
    pokemon,
    error,
    loading,
    loadMore,
    hasMore,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedGeneration,
    setSelectedGeneration,
  } = usePokemonList();

  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <Filter
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        onTypeChange={setSelectedType}
        selectedType={selectedType}
        onGenerationChange={setSelectedGeneration}
        selectedGeneration={selectedGeneration}
      />
      {loading && pokemon.length === 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4'>
          {/* Platzhalter für die loading Skeletons */}
          {[...Array(12)].map((_, index) => (
            <SkeletonPokeCard key={index} />
          ))}
        </div>
      ) : (
        <div className='w-full'>
          <InfiniteScroll
            dataLength={pokemon.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<h4 className='text-center my-4 font-bold text-gray-500 animate-pulse'>Lade weitere Pokemon...</h4>}
            endMessage={
              pokemon.length > 0 && (
                <p className='text-center my-4 text-green-500'>
                  <strong>Ende der Pokemon-Liste!</strong>
                </p>
              )
            }>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4'>
              {pokemon.map((pokemon, index) => (
                <PokeCard
                  key={index}
                  {...pokemon}
                  name={pokemon.name}
                  number={pokemon.id}
                  types={pokemon.types}
                  sprite={pokemon.sprite}
                />
              ))}
            </div>

            {pokemon.length === 0 && <div className='text-center text-gray-500 mt-10'>Keine Pokémon gefunden.</div>}
          </InfiniteScroll>
        </div>
      )}
    </>
  );
}
