import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HomePage from '@/pages/HomePage';
import PokemonPage from '@/pages/PokemonPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FavouritesPage from '@/pages/FavouritesPage';
import NavBar from '@/shared/components/NavBar';

// CHANGE: Created separate file for the layout component
const router = createBrowserRouter([
  {
    path: '/',
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
        path: '/favorites',
        element: <FavouritesPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBar />
    {/* RouterProvider ersetzt die App.jsx */}
    <RouterProvider router={router} />
  </StrictMode>
);
