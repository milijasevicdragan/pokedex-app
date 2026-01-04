import Badge from '@/shared/components/Badge';

const PokemonHeader = ({ pokemon }) => {
  const { name, id, types } = pokemon;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row items-center gap-4'>
        <h1 className='text-4xl font-bold text-gray-800 capitalize tracking-wide leading-tight'>{name}</h1>
        <span className='text-2xl font-mono font-bold text-gray-400'>#{String(id).padStart(3, '0')}</span>
      </div>
      {/* Typen */}
      <div className='flex flex-row flex-wrap gap-2'>
        {types.map((element, index) => (
          <Badge key={index} typeName={element.type.name} />
        ))}
      </div>
    </div>
  );
};

export default PokemonHeader;
