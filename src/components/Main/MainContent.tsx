import React from 'react';
import './MainContent.css';

const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="main-content">
      {children}
    </main>
  );
};

export default MainContent;

