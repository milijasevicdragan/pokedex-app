import './App.css';
import PokeDex from '@/features/pokedex/components/Pokedex';

function App() {
  return (
    <div className='container mx-auto flex flex-col items-center justify-items-center py-20'>
      <PokeDex />
    </div>
  );
}

export default App;
