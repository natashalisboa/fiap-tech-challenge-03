import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa'; 
import logo from '../../assets/logo.png';
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

const Logo = styled.img`
  height: 50px;
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
    background-color: black;
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
  const isAdmin = localStorage.getItem('adminPermission') === 'true';

  return (
    <HeaderContainer>
      <Link to="/postlist">
        <Logo src={logo} alt="Múltipla Escolha Logo" />
      </Link>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>{isOpen ? <FaTimes /> : <FaBars />}</Hamburger>
      <Nav isOpen={isOpen} onClick={() => setIsOpen(false)}>
        <StyledLink to="/postlist">Home</StyledLink>
        {isAdmin && <StyledLink to="/createpost">Criar</StyledLink>}
        <StyledLink to="/profile">Perfil</StyledLink>
        <StyledLink to="/login">Logout</StyledLink>
        <ThemeToggleButton onClick={(e) => {
          e.stopPropagation(); 
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
