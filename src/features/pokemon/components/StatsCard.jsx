const StatsCard = ({ label, value }) => {
  return (
    <div className='bg-gray-50 p-4 rounded-2xl text-center border border-gray-100'>
      <span className='block text-xs text-gray-400 uppercase font-bold tracking-wider mb-1'>{label}</span>
      <span className='text-lg font-bold text-gray-800'>{value}</span>
    </div>
  );
};

export default StatsCard;
