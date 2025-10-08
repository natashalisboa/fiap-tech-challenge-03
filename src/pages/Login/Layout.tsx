import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';

interface LayoutProps {
  children: React.ReactNode;
  onToggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onToggleTheme }) => {
  const location = useLocation();
  const showHeader = location.pathname !== '/login';

  return (
    <>
      {showHeader && <Header onToggleTheme={onToggleTheme} />}
      <main>{children}</main>
    </>
  );
};

export default Layout;
