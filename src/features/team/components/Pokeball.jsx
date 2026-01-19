import pokeball from '@/assets/pokeball.png';

const Pokeball = ({ pokemon, addToTeam, removeFromTeam, isAdded }) => {
  return (
    <button
      onClick={() => {
        if (isAdded) removeFromTeam(pokemon.id);
        else addToTeam(pokemon);
      }}>
      <img src={pokeball} alt={pokeball} className={`w-10 h-10 ${isAdded ? 'saturate-100' : 'saturate-0'}`} />
    </button>
  );
};

export default Pokeball;
