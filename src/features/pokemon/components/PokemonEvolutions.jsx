import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EvolutionModal from './EvolutionModal';
import EvolutionItem from './EvolutionItem';

const PokemonEvolutions = ({ evolutionChain, currentPokemonImage, currentType }) => {
  const [evolvingTo, setEvolvingTo] = useState(null);
  const navigate = useNavigate();

  if (!evolutionChain) return;

  const currentIndex = evolutionChain.findIndex((evolution) => evolution.image === currentPokemonImage);

  const handleEvolutionClick = (evolution, targetIndex) => {
    if (targetIndex === currentIndex) return;

    // Ist das nächste Pokemon die nächste Evolution?
    const isNextEvolution = targetIndex === currentIndex + 1;

    if (isNextEvolution) {
      setEvolvingTo(evolution);
    } else {
      navigate(`/pokemon/${evolution.id}`);
    }
  };

  return (
    <>
      {evolvingTo && (
        <EvolutionModal
          currentPokemonImage={currentPokemonImage}
          nextEvolution={evolvingTo}
          onClose={() => setEvolvingTo(null)}
        />
      )}
      <div className='mt-10'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6'>Evolution</h2>

        <div className='flex flex-row items-center justify-between'>
          {evolutionChain.map((evolution, index) => {
            const isCurrentPokemon = evolution.image === currentPokemonImage;

            return (
              <div key={evolution.id} className='flex items-center flex-1'>
                <div
                  to={`/pokemon/${evolution.id}`}
                  onClick={() => handleEvolutionClick(evolution, index)}
                  className={`relative flex flex-col items-center group w-full cursor-pointer ${
                    isCurrentPokemon ? 'opacity-100 cursor-default' : 'opacity-60 hover:opacity-100'
                  }`}>
                  <EvolutionItem
                    evolution={evolution}
                    evolutionChainLength={evolutionChain.length}
                    currentType={currentType}
                    isCurrentPokemon={isCurrentPokemon}
                    index={index}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PokemonEvolutions;
