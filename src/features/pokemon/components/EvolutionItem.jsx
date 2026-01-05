import { TYPE_COLORS } from '@/shared/types/pokemonTypes';

const EvolutionItem = ({ evolution, currentType, isCurrentPokemon }) => {
  return (
    <>
      <div
        className='relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-gray-100 flex items-center justify-center bg-gray-50 group-hover:border-red-400 group-hover:shadow-lg transition-all duration-300'
        style={{ borderColor: isCurrentPokemon ? TYPE_COLORS[currentType] : '#eee' }}>
        <img src={evolution.image} alt={evolution.name} className='w-16 h-16 sm:w-20 sm:h-20 object-contain z-10' />
        <div className='absolute inset-0 rounded-full bg-white opacity-50 blur-sm'></div>
      </div>
      <div className='mt-3 text-center'>
        <span className='block font-bold text-gray-700 capitalize'>{evolution.name}</span>
        <span className='text-xs text-gray-400 font-mono'>#{String(evolution.id).padStart(3, '0')}</span>
      </div>
    </>
  );
};

export default EvolutionItem;
