import { GENERATIONS, POKEMON_TYPES } from '@/shared/constants/pokemonConfig';

export default function Filter({
  onSearch,
  searchQuery,
  onTypeChange,
  selectedType,
  onGenerationChange,
  selectedGeneration,
}) {
  const handleFilterReset = () => {
    onSearch('');
    onTypeChange('all');
    onGenerationChange('all');
  };

  return (
    <>
      <div className='flex flex-col sm:flex-row gap-4 mb-6'>
        {/* Suche */}
        <input
          type='text'
          placeholder='Suche Pokémon...'
          value={searchQuery}
          className='flex-1 p-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-red-400 outline-none'
          onChange={(e) => onSearch(e.target.value)}
        />

        {/* Typen Filter */}
        <select
          value={selectedType}
          className='p-3 rounded-xl border border-gray-200 shadow-sm bg-white focus:ring-2 focus:ring-red-400 outline-none capitalize cursor-pointer'
          onChange={(e) => onTypeChange(e.target.value)}>
          <option value='all'>Alle Typen</option>
          {POKEMON_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={selectedGeneration}
          className='p-3 rounded-xl border border-gray-200 shadow-sm bg-white focus:ring-2 focus:ring-red-400 outline-none cursor-pointer'
          onChange={(e) => onGenerationChange(e.target.value)}>
          {GENERATIONS.map((generation) => (
            <option key={generation.id} value={generation.id}>
              {generation.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleFilterReset}
          title='Filter zurücksetzen'
          className='p-3 rounded-xl border border-gray-200 shadow-sm bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-red-500 transition-colors flex items-center justify-center'>
          {/* SVG Icon: Mülleimer / Reset */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
            />
          </svg>
        </button>
      </div>
    </>
  );
}
