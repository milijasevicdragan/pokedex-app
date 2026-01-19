import PokeCard from '@/features/pokedex/components/PokeCard'; 
import { useFavorites } from '@/features/pokemon/hooks/useFavorites'; 

export default function FavouritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className='container mx-auto py-8 px-4'>
      <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>My Favourites</h1>

      {favorites.length === 0 ? (
        <div className='text-center text-gray-500 mt-20'>
          <p className='text-xl'>Your Team is empty</p>
          <p className='text-sm mt-2'>Mark Pokemon in the Pokedex with a Pokeball.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {favorites.map((pokemon) => (
            <PokeCard
              key={pokemon.number}
              name={pokemon.name}
              number={pokemon.number}
              types={pokemon.types}
              sprite={pokemon.sprite}
            />
          ))}
        </div>
      )}
    </div>
  );
}