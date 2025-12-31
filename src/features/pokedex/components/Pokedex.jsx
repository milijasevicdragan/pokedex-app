import PokeCard from './PokeCard';
import { usePokemonList } from '../hooks/usePokemonList';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Pokedex() {
  const { pokemon, error, loadMore, hasMore } = usePokemonList();

  if (error) return <p className='text-center text-red-500 mt-10'>{error}</p>;

  return (
    <InfiniteScroll
      dataLength={pokemon.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<h4 className='text-center my-4 font-bold text-gray-500 animate-pulse'>Lade weitere Pokemon...</h4>}
      endMessage={
        <p className='text-center my-4 text-green-500'>
          <strong>Du hast alle Pokemon gefangen!</strong>
        </p>
      }>
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
    </InfiniteScroll>
  );
}
