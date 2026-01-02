import { useEffect, useState } from 'react';
import { getPokemonTypes } from '../api/pokemonApi';

export default function Filter({ onSearch, onTypeChange }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const loadPokemonTypes = async () => {
      try {
        const pokemonTypes = await getPokemonTypes();

        setTypes(pokemonTypes.results);
      } catch (error) {
        console.error('Konnte Typen nicht laden', error);
      }
    };

    loadPokemonTypes();
  }, []);

  return (
    <>
      <div className='flex flex-row gap-4 mb-6'>
        {/* Sucheingabe */}
        <input
          type='text'
          placeholder='Suche Pokémon...'
          className='flex-1 p-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-red-400 outline-none'
          onChange={(e) => onSearch(e.target.value.toLowerCase())}
        />

        {/* Typen Filter */}
        <select
          className='p-3 rounded-xl border border-gray-200 shadow-sm bg-white focus:ring-2 focus:ring-red-400 outline-none capitalize cursor-pointer'
          onChange={(e) => onTypeChange(e.target.value)}>
          <option value=''>Alle Typen</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
