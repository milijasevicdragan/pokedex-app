import { useFavorites } from '@/features/pokemon/hooks/useFavorites';
import { useState } from 'react';

// CHANGE: New component
const FavouritesButton = ({ name, number, types, sprite }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(number);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite({ name, number, types, sprite });
  };

  return (
    <div
      className='absolute top-3 right-3 z-30 flex items-center'
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleFavoriteClick}>
      <div
        className={`
              absolute right-full mr-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap pointer-events-none
              transition-all duration-200 ease-in-out
              ${showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
            `}>
        {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
      </div>

      <button className='p-2 rounded-full transition-all duration-200 bg-white/20 backdrop-blur-sm hover:bg-white'>
        {isFav ? (
          // This design was made by Google Gemini. We wanted an active pokeball
          // to showcase that the selected pokemon is now in our favorites.
          // Active Icon
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='w-6 h-6 drop-shadow-md'>
            <circle cx='12' cy='12' r='10' fill='white' stroke='#333333' strokeWidth='2' />
            <path d='M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12' fill='#EF4444' stroke='#333333' strokeWidth='2' />
            <path d='M2 12H22' stroke='#333333' strokeWidth='2' />
            <circle cx='12' cy='12' r='3' fill='white' stroke='#333333' strokeWidth='2' />
            <circle cx='12' cy='12' r='1.5' fill='#333333' />
          </svg>
        ) : (
          // Inactive Icon
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='w-6 h-6 opacity-60 hover:opacity-100 transition-opacity'>
            <circle cx='12' cy='12' r='9' stroke='white' strokeWidth='2' />
            <path d='M3 12H21' stroke='white' strokeWidth='2' />
            <circle cx='12' cy='12' r='3' stroke='white' strokeWidth='2' />
            <circle cx='12' cy='12' r='1.5' fill='white' />
          </svg>
        )}
      </button>
    </div>
  );
};

export default FavouritesButton;
