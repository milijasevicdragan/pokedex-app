import PokemonHeader from './PokemonHeader';
import Pokemon from '@/features/pokemon/components/Pokemon';
import {useState} from 'react';
import About from '@/features/pokemon/tabs/About'
import Moves from '@/features/pokemon/tabs/Moves'

export default function PokemonDetails({ pokemon, pokemonSpecies }) {
  const [activeTab, setActiveTab] = useState('about');
  if (!pokemon || !pokemonSpecies) {
    return <div className="p-8 text-center text-gray-500">Lade Daten...</div>;
  }

  const TabButton = ({ name, label }) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`
        relative pb-2 text-sm font-bold uppercase tracking-wider cursor-pointer transition-colors
        ${activeTab === name ? 'text-gray-800' : 'text-gray-400 hover:text-gray-600'}
      `}
    >
      {label}

      {activeTab === name && (
        <span className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full shadow-[0_2px_8px_rgba(59,130,246,0.5)]'></span>
      )}
    </button>
  );

return (
    <div className='bg-white rounded-3xl p-6 shadow-lg w-full h-full flex flex-col'>
      
      {/* Tab Navigation*/}
      <div className='flex gap-8 border-b border-gray-100 mb-6'>
        <TabButton name="about" label="About" />
        <TabButton name="moves" label="Moves" />
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto pr-1 custom-scrollbar'>
      
        {activeTab === 'about' && (
          <About pokemon={pokemon} pokemonSpecies={pokemonSpecies} />
        )}

        {activeTab === 'moves' && (
          <Moves pokemon={pokemon} />
        )}

      </div>
    </div>
  );
};