import { TYPE_COLORS } from '@/shared/types/pokemon.types';

function PokeCard({ name, number, types, sprite }) {
  console.log(types);
  return (
    <div
      className='flex flex-col overflow-hidden shadow-lg rounded-2xl'
      style={{ backgroundColor: TYPE_COLORS[types[0].type.name] }}>
      <img className='w-full h-64 py-4 rounded-t-2xl' src={sprite} alt={name} width={300} height={200} />
      <div className='flex flex-col flex-start text-left p-4'>
        <div>{name}</div>
        <div>{number}</div>
        {types.map((element) => (
          <div>{element.type.name}</div>
        ))}
      </div>
    </div>
  );
}

export default PokeCard;
