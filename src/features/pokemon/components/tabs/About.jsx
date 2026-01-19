const About = ({ pokemon, pokemonSpecies }) => {
  return (
    <>
      <div className='mb-6 border-b pb-4'>
        <h2 className='text-4xl font-extrabold text-gray-800 capitalize tracking-tight'>{pokemon.name}</h2>
        <span className='text-gray-500 font-medium text-xl'>{pokemonSpecies?.genus}</span>
      </div>
      <div className='mb-8'>
        <h3 className='text-gray-900 font-bold text-lg mb-2'>Pokédex Entry</h3>
        <p className='text-gray-600 leading-relaxed text-base'>{pokemonSpecies?.description}</p>
      </div>

      <div className='grid grid-cols-3 gap-4 mb-8'>
        <div className='bg-gray-50 p-4 rounded-2xl text-center border border-gray-100'>
          <span className='block text-xs text-gray-400 uppercase font-bold tracking-wider mb-1'>Height</span>
          <span className='text-lg font-bold text-gray-800'>{pokemon.height / 10} m</span>
        </div>

        <div className='bg-gray-50 p-4 rounded-2xl text-center border border-gray-100'>
          <span className='block text-xs text-gray-400 uppercase font-bold tracking-wider mb-1'>Base Happiness</span>
          <span className='text-lg font-bold text-gray-800'>{pokemonSpecies?.base_happiness}</span>
        </div>

        <div className='bg-gray-50 p-4 rounded-2xl text-center border border-gray-100'>
          <span className='block text-xs text-gray-400 uppercase font-bold tracking-wider mb-1'>Catchrate</span>
          <span className='text-lg font-bold text-gray-800'>{pokemonSpecies?.capture_rate}</span>
        </div>
      </div>

      <div>
        <h3 className='text-gray-900 font-bold text-lg mb-4'>Base stats</h3>
        <div className='flex flex-col gap-4'>
          {pokemon?.stats?.map((statItem) => {
            // format names
            const statName = statItem.stat.name.replace('special-', 'Sp. ').replace('-', ' ');
            const val = statItem.base_stat;
            const percentage = Math.min((val / 200) * 100, 100);

            // set colors for stats
            let colorClass = 'bg-red-500';
            if (val >= 60) colorClass = 'bg-yellow-500';
            if (val >= 90) colorClass = 'bg-green-500';

            return (
              <div key={statItem.stat.name} className='flex items-center text-sm'>
                {/* Label */}
                <span className='w-24 font-semibold text-gray-500 capitalize truncate'>{statName}</span>

                {/* Value */}
                <span className='w-12 font-bold text-gray-800 text-right mr-3'>{val}</span>

                {/* Bar */}
                <div className='flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden'>
                  <div
                    className={`h-full rounded-full ${colorClass} transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default About;
