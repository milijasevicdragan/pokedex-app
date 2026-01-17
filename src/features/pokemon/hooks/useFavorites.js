import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const getFavoritesFromLS = () => {
    const saved = localStorage.getItem('pokemon-favorites');
    return saved ? JSON.parse(saved) : [];
  };

  const [favorites, setFavorites] = useState(getFavoritesFromLS());

  const toggleFavorite = (pokemon) => {
    const currentFavs = getFavoritesFromLS();
    const isExisting = currentFavs.some((p) => p.number === pokemon.number);
    
    let newFavs;
    if (isExisting) {
      newFavs = currentFavs.filter((p) => p.number !== pokemon.number);
    } else {
      newFavs = [...currentFavs, pokemon];
    }

    localStorage.setItem('pokemon-favorites', JSON.stringify(newFavs));
    
    window.dispatchEvent(new Event('favorites-updated'));
  };

  const isFavorite = (number) => {
    return favorites.some((p) => p.number === number);
  };

  useEffect(() => {
    const handleUpdate = () => setFavorites(getFavoritesFromLS());
    
    window.addEventListener('favorites-updated', handleUpdate);
    return () => window.removeEventListener('favorites-updated', handleUpdate);
  }, []);

  return { favorites, toggleFavorite, isFavorite };
};