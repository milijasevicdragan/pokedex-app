const Error = ({ error }) => {
  return (
    <div className='text-center mt-20 p-8'>
      <div className='text-6xl mb-4'>😵💫</div>
      <h2 className='text-2xl font-bold text-gray-700 mb-2'>Oje, ein Fehler ist aufgetaucht!</h2>
      <p className='text-gray-500 max-w-md mx-auto'>
        Wir konnten die Pokémon-Daten nicht laden. Überprüfe deine Internetverbindung oder versuche es später noch
        einmal.
      </p>
      <p className='text-red-400 text-sm mt-4 font-mono bg-red-50 inline-block px-3 py-1 rounded'>{error}</p>
    </div>
  );
};

export default Error;
