import TabButton from './TabButton';
import { useState } from 'react';
import About from './About';
import Moves from './Moves';

export default function PokemonDetails({ pokemon, pokemonSpecies }) {
  const [activeTab, setActiveTab] = useState('about');

  if (!pokemon || !pokemonSpecies) {
    return <div className='p-8 text-center text-gray-500'>Lade Daten...</div>;
  }

  return (
    <div className='bg-white rounded-3xl p-6 shadow-lg w-full h-full flex flex-1 flex-col'>
      {/* Tab Navigation*/}
      <div className='flex gap-8 border-b border-gray-100 mb-6'>
        <TabButton name='about' label='About' onClick={() => setActiveTab('about')} activeTab={activeTab} />
        <TabButton name='moves' label='Moves' onClick={() => setActiveTab('moves')} activeTab={activeTab} />
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto pr-1 custom-scrollbar'>
        {activeTab === 'about' && <About pokemon={pokemon} pokemonSpecies={pokemonSpecies} />}
        {activeTab === 'moves' && <Moves pokemon={pokemon} />}
      </div>
    </div>
  );
}
