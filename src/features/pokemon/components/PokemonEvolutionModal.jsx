import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PokemonEvolutionModal = ({ currentPokemonImage, nextEvolution, onClose }) => {
  const navigate = useNavigate();
  const [showFlash, setShowFlash] = useState(false);
  const [statusText, setStatusText] = useState('Das Pokemon entwickelt sich!');
  const [displayPokemon, setDisplayPokemon] = useState(currentPokemonImage);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setShowFlash(true);
      setStatusText('Ein Pokemon entwickelt sich!');
    }, 2000);

    const swapTimer = setTimeout(() => {
      setDisplayPokemon(nextEvolution.image);
    }, 2500);

    const endTimer = setTimeout(() => {
      onClose();
      navigate(`/pokemon/${nextEvolution.id}`);
    }, 2500);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(swapTimer);
      clearTimeout(endTimer);
    };
  }, [navigate, onClose, nextEvolution, currentPokemonImage]);

  return (
    <div className='fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50'>
      <h2 className='text-white text-3xl font-bold mb-10 animate-pulse'>{statusText}</h2>
      <div className='relative w-64 h-64 flex items-center justify-center'>
        <img
          src={displayPokemon}
          alt='Evolution'
          className={`w-full h-full object-contain ${!showFlash ? 'animate-evolution' : ''}`}
        />
      </div>
      {showFlash && <div className='fixed inset-0 bg-white pointer-events-none animate-flash z-50'></div>}
    </div>
  );
};

export default PokemonEvolutionModal;
