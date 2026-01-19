import Pokeball from '@/features/team/components/Pokeball';
import Badge from '@/shared/components/Badge';
import { useNavigate } from 'react-router-dom';

const PokemonHeader = ({ pokemon, megaEvolutions }) => {
  const { name, id, types } = pokemon;
  const navigate = useNavigate();

  const handleFormChange = (event) => {
    const selectedForm = event.target.value;

    navigate(`/pokemon/${selectedForm}`);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row items-center gap-4'>
        <h1 className='text-4xl font-bold text-gray-800 capitalize tracking-wide leading-tight'>{name}</h1>
        <span className='text-2xl font-mono font-bold text-gray-400'>#{String(id).padStart(3, '0')}</span>
        <Pokeball pokemon={pokemon} />
      </div>
      {/* Typen */}
      <div className='flex flex-row gap-4'>
        <div className='flex flex-row flex-wrap items-center gap-2'>
          {types.map((element, index) => (
            <Badge key={index} typeName={element.type.name} />
          ))}
        </div>
        {megaEvolutions.length > 1 && (
          <select
            id='form-varieties'
            value={pokemon.id}
            className='p-3 rounded-xl border border-gray-200 shadow-sm bg-white focus:ring-2 focus:ring-red-400 outline-none cursor-pointer capitalize'
            onChange={handleFormChange}>
            {megaEvolutions.map((megaEvolution) => (
              <option key={megaEvolution.id} value={megaEvolution.id} className='capitalize'>
                {megaEvolution.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default PokemonHeader;
