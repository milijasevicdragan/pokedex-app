const TabButton = ({ name, label, activeTab, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative pb-2 text-sm font-bold uppercase tracking-wider cursor-pointer transition-colors
        ${activeTab === name ? 'text-gray-800' : 'text-gray-400 hover:text-gray-600'}
      `}>
      {label}

      {activeTab === name && (
        <span className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full shadow-[0_2px_8px_rgba(59,130,246,0.5)]'></span>
      )}
    </button>
  );
};

export default TabButton;
