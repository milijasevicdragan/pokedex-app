import PokeCard from './PokeCard';
import { usePokemonList } from '../hooks/usePokemonList';
import InfiniteScroll from 'react-infinite-scroll-component';
import Filter from './Filter';

export default function Pokedex() {
  const { pokemon, error, loadMore, hasMore, setSearchQuery, setSelectedType } = usePokemonList();

  if (error) return <p className='text-center text-red-500 mt-10'>{error}</p>;

  return (
    <>
      <Filter onSearch={setSearchQuery} onTypeChange={setSelectedType} />
      <InfiniteScroll
        dataLength={pokemon.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4 className='text-center my-4 font-bold text-gray-500 animate-pulse'>Lade weitere Pokemon...</h4>}
        endMessage={
          <p className='text-center my-4 text-green-500'>
            <strong>Ende der Pokemon-Liste!</strong>
          </p>
        }>
        <div className='grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-3'>
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
      </InfiniteScroll>
    </>
  );
}
