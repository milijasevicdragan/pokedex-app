import { TYPE_COLORS } from '../constants/pokemonConfig';

const Badge = ({ typeName }) => {
  return (
    <span
      className='
        px-3 py-1 
        rounded-full 
        text-white 
        text-xs font-bold 
        uppercase tracking-wider 
        shadow-sm
        border border-white/20
      '
      style={{
        backgroundColor: TYPE_COLORS[typeName],
        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
      }}>
      {typeName}
    </span>
  );
};

export default Badge;
