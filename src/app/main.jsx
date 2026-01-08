import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HomePage from '@/pages/HomePage';
import PokemonPage from '@/pages/PokemonPage';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import NavBar from '@/shared/components/NavBar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/pokemon/:id',
    element: <PokemonPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* RouterProvider ersetzt die App.jsx */}
    <NavBar />
    <RouterProvider router={router} />
  </StrictMode>
);
