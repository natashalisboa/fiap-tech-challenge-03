import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa'; // Certifique-se de ter react-icons instalado

interface HeaderProps {
  onToggleTheme: () => void;
}

const HeaderContainer = styled.header`
  display: flex;
  background-color: black;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: relative;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 8px 15px;
`;

const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 20px;
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  font-size: 24px; /* Tamanho do ícone */

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  gap: 15px;
  align-items: center;
  @media (min-width: 769px) {
    display: flex !important;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    background-color: #ed145b;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    padding: 10px 0;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    z-index: 1000;
    align-items: center;
  }
`;

const Header: React.FC<HeaderProps> = ({ onToggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <HeaderContainer>
      {/* Adicione um logo ou título aqui se desejar */}
      {/* <div>Logo</div> */}
      <Hamburger onClick={() => setIsOpen(!isOpen)}>{isOpen ? <FaTimes /> : <FaBars />}</Hamburger>
      <Nav isOpen={isOpen} onClick={() => setIsOpen(false)}>
        <StyledLink to="/login">Login</StyledLink>
        <StyledLink to="/postlist">Home</StyledLink>
        <StyledLink to="/createpost">CreatePost</StyledLink>
        <StyledLink to="/postdetail">PostDetail</StyledLink>
        <StyledLink to="/profile">Perfil</StyledLink>
        <ThemeToggleButton onClick={(e) => {
          e.stopPropagation(); // Impede que o menu feche ao clicar no botão
          onToggleTheme();
          setIsDarkMode(!isDarkMode);
        }}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </ThemeToggleButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
