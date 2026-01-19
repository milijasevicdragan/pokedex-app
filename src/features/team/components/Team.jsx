import { Link } from 'react-router-dom';
import removeButton from '@/assets/cancel.png';
import { TYPE_COLORS } from '@/shared/constants/pokemonConfig';
import useTeam from '../hooks/useTeam';

export default function Team() {
  const { team, removeFromTeam } = useTeam();

  // Nichts anzeigen wenn das Team leer ist
  if (team.length === 0) return null;

  return (
    <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up'>
      <div className='bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-3 flex items-center gap-3'>
        {/* Pokemon Slots */}
        <div className='flex gap-2'>
          {team.map((member) => (
            <div key={member.id} className='relative group'>
              <Link to={`/pokemon/${member.id}`}>
                <div
                  className='w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-gray-300'
                  style={{
                    background: `radial-gradient(circle, ${
                      TYPE_COLORS[member.types[0].type.name]
                    } 0%, transparent 60%)`,
                  }}>
                  <img src={member.sprite} alt={member.name} className='w-full h-full object-contain' />
                </div>
              </Link>

              {/* Löschen Button */}
              <button
                onClick={() => removeFromTeam(member.id)}
                className='absolute -top-1 -right-1 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity'
                title='Entfernen'>
                <img src={removeButton} alt='Entfernen' />
              </button>
            </div>
          ))}

          {/* Platzhalter Slots */}
          {[...Array(6 - team.length)].map((_, i) => (
            <div
              key={i}
              className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-300 text-xs'>
              {i + 1 + team.length}
            </div>
          ))}
        </div>

        <div className='h-8 w-px bg-gray-300 mx-2'></div>
        <span className='text-xs font-bold text-gray-500'>{team.length}/6</span>
      </div>
    </div>
  );
}
