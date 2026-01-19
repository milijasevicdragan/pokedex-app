import pikachuIcon from '@/assets/pikachu.svg';

export default function NavBar() {
  return (
    <nav className='bg-gray-800 p-6 mb-10'>
      <div className='container flex items-center justify-between flex-wrap mx-auto'>
        <a href='http://localhost:5173' className='flex items-center shrink-0 text-white mr-6'>
          <img className='mr-3' src={pikachuIcon} width={32} height={32} alt='Pikachu Logo' />
          <span className='font-semibold text-xl tracking-tight'>Pokédex</span>
        </a>
        <div className='block lg:hidden'>
          <button className='flex items-center px-3 py-2 border rounded text-white border-white'>
            <svg className='fill-current h-3 w-3' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <title>Menu</title>
              <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
            </svg>
          </button>
        </div>
        <div className='w-full hidden grow lg:flex lg:items-center lg:w-auto'>
          <div className='text-sm lg:grow'>
            <a href='/favorites' className='block mt-4 lg:inline-block lg:mt-0 text-white mr-4'>
              Favorites
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
