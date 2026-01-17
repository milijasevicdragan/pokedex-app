import MoveItem from './MoveItem';

export default function Moves({ pokemon }) {
  // Request wird auf 20 beschränkt
  const movesToShow = pokemon.moves?.slice(0, 20) || []; 

  return (
    <div>
      <h3 className='font-bold text-gray-900 text-lg mb-4 flex items-center gap-2'>
        Moves 
        <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
            {pokemon.moves?.length || 0}
        </span>
      </h3>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {movesToShow.map((moveItem) => (
            <MoveItem 
                key={moveItem.move.name} 
                name={moveItem.move.name} 
                url={moveItem.move.url} 
            />
        ))}
      </div>
      
      {pokemon.moves?.length > 20 && (
          <p className='text-center text-gray-400 text-xs mt-6 font-medium uppercase tracking-wide'>
            + {pokemon.moves.length - 20} more moves not loaded
          </p>
      )}
    </div>
  );
}