import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonPokeCard = () => {
  return (
    <div className='p-4 bg-white rounded-3xl shadow-lg flex flex-col items-center justify-center border border-gray-100 h-full relative'>
      {/* ID Platzhalter */}
      <div className='absolute top-4 right-4'>
        <Skeleton width={30} height={15} />
      </div>

      {/* Bild Platzhalter */}
      <div className='mb-4 mt-2'>
        <Skeleton circle={true} height={120} width={120} />
      </div>

      {/* Name Platzhalter */}
      <div className='mb-2 w-3/4'>
        <Skeleton height={25} />
      </div>

      {/* Typen Platzhalter */}
      <div className='flex gap-2 mt-2'>
        <Skeleton width={60} height={25} borderRadius={20} />
        <Skeleton width={60} height={25} borderRadius={20} />
      </div>
    </div>
  );
};

export default SkeletonPokeCard;
