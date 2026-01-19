import { useState, useEffect } from 'react';

export const useFavorites = () => {
  // CHANGE: LS ausgeschrieben damit man direkt weiss was es ist
  const getFavoritesFromLocalStorage = () => {
    const favoritesInStorage = localStorage.getItem('pokemon-favorites');
    return favoritesInStorage ? JSON.parse(favoritesInStorage) : [];
  };

  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

  const toggleFavorite = (pokemon) => {
    const currentFavs = getFavoritesFromLocalStorage();
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
    const handleUpdate = () => setFavorites(getFavoritesFromLocalStorage());

    window.addEventListener('favorites-updated', handleUpdate);
    return () => window.removeEventListener('favorites-updated', handleUpdate);
  }, []);

  return { favorites, toggleFavorite, isFavorite };
};
