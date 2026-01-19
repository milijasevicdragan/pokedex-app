import { useEffect, useState } from 'react';
import { getMoveDetailsById } from '@/shared/api/pokemonApi';
import { TYPE_COLORS } from '@/shared/constants/pokemonConfig';

export const MoveItem = ({ name, url }) => {
  const [move, setMove] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlParts = url.split('/');
  const id = Number(urlParts[urlParts.length - 2]);

  useEffect(() => {
    const loadMove = async () => {
      setLoading(true);
      setError(null);

      try {
        const move = await getMoveDetailsById(id);
        setMove(move);
      } catch (err) {
        setError('Fehler beim Laden der Attacken');
        console.error('Attacken konnten nicht geladen werden.', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadMove();
    }
  }, [id]);

  if (loading || !move) {
    // placeholder while loading
    return <div className='h-24 bg-gray-50 rounded-xl animate-pulse border border-gray-100'></div>;
  }

  if (error) {
    return (
      <div className='h-24 bg-red-50 rounded-xl border border-red-100 flex items-center justify-center text-red-500 text-sm p-4'>
        {error}
      </div>
    );
  }

  // extract data (with Fallback, if null)
  const accuracy = move.accuracy || '-';
  const power = move.power || '-';
  // const powerPoints = move.pp || '-';
  const type = move.type.name;
  const damageClass = move.damage_class.name;
  const typeColor = TYPE_COLORS[type] || '#ccc';

  return (
    <div
      className='bg-gray-50 p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group'
      style={{ borderLeft: `4px solid ${typeColor}` }}>
      <div className='flex justify-between items-start mb-2'>
        <span className='text-sm font-bold text-gray-700 capitalize leading-tight group-hover:text-gray-900'>
          {name.replace('-', ' ')}
        </span>
        <span
          className='text-[10px] text-white px-2 py-0.5 rounded-full uppercase font-bold tracking-wide shadow-sm'
          style={{ backgroundColor: typeColor }}>
          {type}
        </span>
      </div>

      <div className='grid grid-cols-3 gap-1 mt-1'>
        {/* Power */}
        <div className='flex flex-col items-center bg-white rounded p-1 shadow-sm'>
          <span className='font-extrabold text-gray-800 text-xs'>{power}</span>
          <span className='text-[8px] text-gray-400 uppercase font-bold tracking-wider'>Pwr</span>
        </div>

        {/* Accuracy */}
        <div className='flex flex-col items-center bg-white rounded p-1 shadow-sm'>
          <span className='font-extrabold text-gray-800 text-xs'>{accuracy}%</span>
          <span className='text-[8px] text-gray-400 uppercase font-bold tracking-wider'>Acc</span>
        </div>

        {/* Class (Phy/Spec) */}
        <div className='flex flex-col items-center bg-white rounded p-1 shadow-sm'>
          <span className='font-extrabold text-gray-800 text-xs capitalize'>
            {damageClass === 'status' ? 'Sta' : damageClass === 'physical' ? 'Phy' : 'Spc'}
          </span>
          <span className='text-[8px] text-gray-400 uppercase font-bold tracking-wider'>Cat</span>
        </div>
      </div>
    </div>
  );
};

export default MoveItem;
