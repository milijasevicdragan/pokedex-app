import { TYPE_COLORS } from '@/shared/types/pokemonTypes';

const PokemonEvolutionCircle = ({ evolution, evolutionChainLength, currentType, isCurrentPokemon, index }) => {
  return (
    <>
      <div
        className='relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-gray-100 flex items-center justify-center bg-gray-50 group-hover:border-red-400 group-hover:shadow-lg transition-all duration-300'
        style={{ borderColor: isCurrentPokemon ? TYPE_COLORS[currentType] : '#eee' }}>
        <img src={evolution.image} alt={evolution.name} className='w-16 h-16 sm:w-20 sm:h-20 object-contain z-10' />
        <div className='absolute inset-0 rounded-full bg-white opacity-50 blur-sm'></div>

        {/* Pfeil wird bei letzter Entwicklung nicht angezeigt */}
        {index < evolutionChainLength - 1 && (
          <div className='absolute flex-1 flex justify-center px-2 right-[-50%] translate-x-[-50%]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-6 h-6 text-gray-300'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
            </svg>
          </div>
        )}
      </div>
      <div className='mt-3 text-center'>
        <span className='block font-bold text-gray-700 capitalize'>{evolution.name}</span>
        <span className='text-xs text-gray-400 font-mono'>#{String(evolution.id).padStart(3, '0')}</span>
      </div>
    </>
  );
};

export default PokemonEvolutionCircle;
