import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EvolutionModal from './EvolutionModal';
import EvolutionItem from './EvolutionItem';
import Arrow from '@/shared/components/Arrow';

const PokemonEvolutions = ({ evolutionChain, currentPokemonImage, currentType }) => {
  const [evolvingTo, setEvolvingTo] = useState(null);
  const navigate = useNavigate();

  if (!evolutionChain) return;

  const currentIndex = evolutionChain.findIndex((evolution) => evolution.image === currentPokemonImage);

  const handleEvolutionClick = (evolution, targetIndex) => {
    if (targetIndex === currentIndex) return;

    const currentPokemon = evolutionChain[currentIndex];
    const isDirectEvolution = String(evolution.evolvesFromId) === String(currentPokemon.id);

    if (isDirectEvolution) {
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

        <div className='flex flex-wrap items-center justify-start gap-x-4 gap-y-8'>
          {evolutionChain.map((evolution, index) => {
            const isCurrentPokemon = evolution.image === currentPokemonImage;
            const showArrowBefore = index > 0;

            return (
              <div key={evolution.id} className='flex items-center'>
                {showArrowBefore && <Arrow />}

                <div className='relative flex flex-col items-center group cursor-pointer'>
                  <div onClick={() => !isCurrentPokemon && handleEvolutionClick(evolution, index)}>
                    <EvolutionItem
                      evolution={evolution}
                      currentType={currentType}
                      isCurrentPokemon={isCurrentPokemon}
                      index={index} // Index übergeben wir evtl noch
                    />
                  </div>
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
