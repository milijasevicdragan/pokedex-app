import BaseStats from './BaseStats';
import StatsCard from './StatsCard';

const About = ({ pokemon, pokemonSpecies }) => {
  return (
    <>
      <div className='mb-6 border-b pb-4'>
        <h2 className='text-4xl font-extrabold text-gray-800 capitalize tracking-tight'>{pokemon.name}</h2>
        <span className='text-gray-500 font-medium text-xl'>{pokemonSpecies?.genus}</span>
      </div>
      <div className='mb-8'>
        <h3 className='text-gray-900 font-bold text-lg mb-2'>Pokédex Entry</h3>
        <p className='text-gray-600 leading-relaxed text-base'>{pokemonSpecies?.description}</p>
      </div>

      <div className='grid grid-cols-3 gap-4 mb-8'>
        <StatsCard label={'Height'} value={pokemon.height / 10 + ' m'} />
        <StatsCard label={'Base Happiness'} value={pokemonSpecies?.base_happiness} />
        <StatsCard label={'Catchrate'} value={pokemonSpecies?.capture_rate} />
      </div>

      <BaseStats pokemon={pokemon} />
    </>
  );
};

export default About;
