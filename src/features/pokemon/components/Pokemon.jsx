import { TYPE_COLORS } from '@/shared/constants/pokemonConfig';
import PokemonHeader from './PokemonHeader';
import PokemonEvolutions from './PokemonEvolutions';

export default function Pokemon({ pokemon, megaEvolutions, evolutions }) {
  return (
    <>
      {pokemon ? (
        <div className='relative flex flex-col flex-1 gap-8 px-6 pb-6'>
          <PokemonHeader pokemon={pokemon} megaEvolutions={megaEvolutions} />

          <div className='relative flex justify-center'>
            <span
              className='absolute left-0 top-0 w-full h-full'
              style={{
                background: `radial-gradient(circle, ${TYPE_COLORS[pokemon.types[0].type.name]} 0%, transparent 60%)`,
                opacity: 0.6,
              }}></span>
            <img src={pokemon.sprite} alt={pokemon.name} className='w-[80%] z-10' />
          </div>
          <PokemonEvolutions
            evolutionChain={evolutions}
            currentPokemonImage={pokemon.sprite}
            currentType={pokemon.types[0].type.name}
          />
        </div>
      ) : (
        <h1>Lade Pokemon...</h1>
      )}
    </>
  );
}
