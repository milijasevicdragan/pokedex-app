import { TYPE_COLORS } from '@/shared/types/pokemon.types';

function PokeCard({ name, number, type, sprite }) {
  return (
    <div className='flex flex-col overflow-hidden shadow-lg rounded-2xl' style={{ backgroundColor: TYPE_COLORS[type] }}>
      <img className='w-full h-64 py-4 rounded-t-2xl' src={sprite} alt={name} width={300} height={200} />
      <div className='flex flex-col flex-start text-left p-4'>
        <div>{name}</div>
        <div>{number}</div>
        <div>{type}</div>
      </div>
    </div>
  );
}

export default PokeCard;
