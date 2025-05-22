import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { initNavbarScroll } from './utils/scrollNavbar';
import Layout from './pages/Layout';


const App: React.FC = () => {

  useEffect(() => {
    initNavbarScroll();
  }, []);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default App;