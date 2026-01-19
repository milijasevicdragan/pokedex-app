import Pokedex from '@/features/pokedex/components/Pokedex';

export default function HomePage() {
  return (
    <div className='max-w-7xl mx-auto flex flex-col items-center justify-items-center py-20'>
      <Pokedex />
    </div>
  );
}
