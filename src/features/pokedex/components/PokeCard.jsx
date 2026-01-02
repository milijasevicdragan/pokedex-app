import Badge from '@/shared/components/Badge';
import { TYPE_COLORS } from '@/shared/types/pokemonTypes';
import { Link } from 'react-router-dom';

export default function PokeCard({ name, number, types, sprite }) {
  return (
    <Link to={`/pokemon/${number}`} className='block transform hover:scale-105 transition-transform duration-200'>
      <div
        className='relative flex flex-col overflow-hidden shadow-lg rounded-2xl'
        style={{ backgroundColor: TYPE_COLORS[types[0].type.name] }}>
        {/* Pokeball Hintergrund */}
        <div
          className='absolute inset-0 bg-[url("@/assets/pokeball.svg")] bg-no-repeat bg-top opacity-20 pointer-events-none'
          style={{ backgroundSize: '80%' }}
        />
        <img className='relative w-full h-64 p-5 rounded-t-2xl' src={sprite} alt={name} width={300} height={200} />
        <div className='flex flex-col flex-1 p-5 bg-white rounded-b-2xl relative'>
          {/* Name und Nummer */}
          <div className='flex justify-between items-center mb-3'>
            <h2 className='text-xl font-bold text-gray-800 capitalize tracking-wide leading-tight'>{name}</h2>
            <span className='text-sm font-mono font-bold text-gray-400'>#{String(number).padStart(3, '0')}</span>
          </div>

          {/* Typen */}
          <div className='flex flex-row flex-wrap gap-2'>
            {types.map((element, index) => (
              <Badge key={index} typeName={element.type.name} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
