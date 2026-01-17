import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HomePage from '@/pages/HomePage';
import PokemonPage from '@/pages/PokemonPage';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import NavBar from '@/shared/components/NavBar';
import FavouritesPage from '@/pages/FavouritesPage';

const Layout = () => {
  return (
    <>
      <NavBar />
      <div className="pt-4"> 
        <Outlet />
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Das Layout umschließt alle Unterseiten
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/pokemon/:id',
        element: <PokemonPage />,
      },
      {
        path: '/favorites', // Achte auf die Schreibweise (favorites vs favourites)
        element: <FavouritesPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* RouterProvider ersetzt die App.jsx */}
    <RouterProvider router={router} />
  </StrictMode>
);
