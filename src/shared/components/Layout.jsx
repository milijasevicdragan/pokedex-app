import Team from '@/features/team/components/Team';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className='pb-32'>
        <Outlet />
      </main>
      <Team />
    </>
  );
};

export default Layout;
