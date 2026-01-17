import Badge from '@/shared/components/Badge';
import { TYPE_COLORS } from '@/shared/constants/pokemonConfig';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/features/pokemon/hooks/useFavorites';
import { useState } from 'react';

export default function PokeCard({ name, number, types, sprite }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(number);

  const [showTooltip, setShowTooltip] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite({ name, number, types, sprite });
  };

  return (
    <Link to={`/pokemon/${number}`} className='block transform hover:scale-105 transition-transform duration-200'>
      <div
        className='relative flex flex-col overflow-hidden shadow-lg rounded-2xl'
        style={{ backgroundColor: TYPE_COLORS[types[0].type.name] }}>
        {/* Pokeball background */}
        <div
          className='absolute inset-0 bg-[url("@/assets/pokeball.svg")] bg-no-repeat bg-top opacity-20 pointer-events-none'
          style={{ backgroundSize: '80%' }}
        />
        <div 
          className="absolute top-3 right-3 z-30 flex items-center"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={handleFavoriteClick}
        >
        
          <div 
            className={`
              absolute right-full mr-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap pointer-events-none
              transition-all duration-200 ease-in-out
              ${showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
            `}
          >
            {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
          </div>

          <button className='p-2 rounded-full transition-all duration-200 bg-white/20 backdrop-blur-sm hover:bg-white'>
            {isFav ? (
              //This design was made by Google Gemini. We wanted an active pokeball
              //to showcase that the selected pokemon is now in our favorites.
              // Active Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 drop-shadow-md">
                <circle cx="12" cy="12" r="10" fill="white" stroke="#333333" strokeWidth="2"/>
                <path d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12" fill="#EF4444" stroke="#333333" strokeWidth="2"/>
                <path d="M2 12H22" stroke="#333333" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" fill="white" stroke="#333333" strokeWidth="2"/>
                <circle cx="12" cy="12" r="1.5" fill="#333333"/>
              </svg>
            ) : (
              // Inactive Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity">
                 <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                 <path d="M3 12H21" stroke="white" strokeWidth="2"/>
                 <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2"/>
                 <circle cx="12" cy="12" r="1.5" fill="white"/>
              </svg>
            )}
          </button>
        </div>
        <img className='relative w-full h-64 p-5 rounded-t-2xl' src={sprite} alt={name} width={300} height={200} />
        <div className='flex flex-col flex-1 p-5 bg-white rounded-b-2xl relative'>
          {/* name and number */}
          <div className='flex justify-between items-center mb-3'>
            <h2 className='text-xl font-bold text-gray-800 capitalize tracking-wide leading-tight'>{name}</h2>
            <span className='text-sm font-mono font-bold text-gray-400'>#{String(number).padStart(3, '0')}</span>
          </div>

          {/* types*/}
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
