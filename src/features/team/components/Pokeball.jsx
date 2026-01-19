import pokeball from '@/assets/pokeball.png';
import useTeam from '../hooks/useTeam';

const Pokeball = ({ pokemon }) => {
  const { addToTeam, removeFromTeam, isInTeam } = useTeam();

  const handleClick = (event) => {
    event.preventDefault();

    if (isInTeam(pokemon.id)) {
      removeFromTeam(pokemon.id);
    } else {
      addToTeam(pokemon);
    }
  };

  return (
    <button onClick={handleClick}>
      <img
        src={pokeball}
        alt='Pokeball'
        className={`w-10 h-10 z-10 ${isInTeam(pokemon.id) ? 'saturate-100' : 'saturate-0'}`}
      />
    </button>
  );
};

export default Pokeball;
