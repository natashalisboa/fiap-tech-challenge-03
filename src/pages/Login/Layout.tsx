import React from 'react';
import Header from '../../components/Header/Header';

interface LayoutProps {
  children: React.ReactNode;
  onToggleTheme: () => void;
  theme: string;
}

const Layout: React.FC<LayoutProps> = ({ children, onToggleTheme, theme }) => {

  return (
    <>
      <Header onToggleTheme={onToggleTheme} theme={theme} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
