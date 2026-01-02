import { Link, useParams } from 'react-router-dom';

export default function PokemonPage() {
  // useParams holt die ID aus der URL
  const { id } = useParams();

  return (
    <div className='container mx-auto py-20'>
      <Link to='/' className='text-blue-500 underline mb-4 block'>
        &larr; Zurück zur Übersicht
      </Link>

      <h1 className='text-3xl font-bold'>Detailseite für Pokemon-Nr.: {id}</h1>
      <p>Hier kommt die Pokemon Detailansicht</p>
    </div>
  );
}
