import { useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'pokemon-team';
const EVENT_KEY = 'team-updated';

export const useTeam = () => {
  const getTeamFromLocalStorage = () => {
    const teamInStorage = localStorage.getItem(LOCAL_STORAGE_KEY);

    try {
      return teamInStorage ? JSON.parse(teamInStorage) : [];
    } catch (error) {
      console.error('Fehler beim Laden des Teams.', error);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return [];
    }
  };

  const [team, setTeam] = useState(() => getTeamFromLocalStorage());

  // Fügt ein neues Pokemon zum Team hinzu
  const addToTeam = (pokemon) => {
    const team = getTeamFromLocalStorage();

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

    const newTeam = [...team, pokemon];

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTeam));
    setTeam(newTeam);
    window.dispatchEvent(new Event(EVENT_KEY));
  };

  // Entfernt das Pokemon aus dem Team
  const removeFromTeam = (pokemonId) => {
    const team = getTeamFromLocalStorage();
    const newTeam = team.filter((pokemon) => pokemon.id !== pokemonId);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTeam));
    setTeam(newTeam);
    window.dispatchEvent(new Event(EVENT_KEY));
  };

  // Prüft ob ein Pokemon im Team ist
  const isInTeam = (pokmonId) => team.some((pokemon) => pokemon.id === pokmonId);

  useEffect(() => {
    const handleUpdate = () => {
      setTeam(getTeamFromLocalStorage());
    };

    window.addEventListener(EVENT_KEY, handleUpdate);

    return () => {
      window.removeEventListener(EVENT_KEY, handleUpdate);
    };
  }, []);

  return { team, addToTeam, removeFromTeam, isInTeam };
};

export default useTeam;
