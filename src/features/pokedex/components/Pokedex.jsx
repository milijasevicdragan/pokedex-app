import PokeCard from './PokeCard';
import { usePokemonList } from '../hooks/usePokemonList';
import InfiniteScroll from 'react-infinite-scroll-component';
import Filter from './Filter';

export default function Pokedex() {
  const {
    pokemon,
    error,
    loadMore,
    hasMore,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedGeneration,
    setSelectedGeneration,
  } = usePokemonList();

  if (error) return <p className='text-center text-red-500 mt-10'>{error}</p>;

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
              name={pokemon.name}
              number={pokemon.id}
              types={pokemon.types}
              sprite={pokemon.sprite}
            />
          ))}
        </div>

        {pokemon.length === 0 && <div className='text-center text-gray-500 mt-10'>Keine Pokémon gefunden.</div>}
      </InfiniteScroll>
    </>
  );
}
