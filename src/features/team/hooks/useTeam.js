import { useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'pokemon-team';

export const useTeam = () => {
  const [team, setTeam] = useState(() => {
    const savedTeam = localStorage.getItem(LOCAL_STORAGE_KEY);

    return savedTeam ? JSON.parse(savedTeam) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(team));
  }, [team]);

  // Fügt ein neues Pokemon zum Team hinzu
  const addToTeam = (pokemon) => {
    // Conditions prüfen bevor neues Team erstellt wird
    // Maximal 6 Pokemon in einem Team
    if (team.length >= 6) {
      alert('Das Team ist bereits voll!');
      return;
    }

    if (team.some((p) => p.id === pokemon.id)) {
      alert(`${pokemon.name} ist schon im Team!`);
      return;
    }

    setTeam([...team, pokemon]);
  };

  // Entfernt das Pokemon aus dem Team
  const removeFromTeam = (pokemonId) => {
    setTeam(team.filter((pokemon) => pokemon.id !== pokemonId));
  };

  // Prüft ob ein Pokemon im Team ist
  const isInTeam = (pokmonId) => team.some((pokemon) => pokemon.id === pokmonId);

  return { team, addToTeam, removeFromTeam, isInTeam };
};

export default useTeam;
