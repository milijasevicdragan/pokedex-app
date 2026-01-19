const BaseStats = ({ pokemon }) => {
  return (
    <>
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
    </>
  );
};

export default BaseStats;
