import NavBar from '@/shared/components/NavBar';
import './App.css';
import useTeam from '@/features/team/hooks/useTeam';
import { Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import PokemonPage from '@/pages/PokemonPage';
import Team from '@/features/team/components/Team';

function App() {
  const { team, addToTeam, removeFromTeam, isInTeam } = useTeam();

  return (
    <>
      <NavBar />

      <Routes>
        <Route
          path='/'
          element={<HomePage addToTeam={addToTeam} removeFromTeam={removeFromTeam} isInTeam={isInTeam} />}
        />
        <Route
          path='/pokemon/:id'
          element={<PokemonPage addToTeam={addToTeam} removeFromTeam={removeFromTeam} isInTeam={isInTeam} />}
        />
      </Routes>

      <Team team={team} removeFromTeam={removeFromTeam} />
    </>
  );
}

export default App;
