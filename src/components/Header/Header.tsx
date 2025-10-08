import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa'; 
import logo from '../../assets/logo.png';
interface HeaderProps {
  theme: string;
  onToggleTheme: () => void;
}

const HeaderContainer = styled.header`
  display: flex;
  background-color: black;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  position: relative;
`;

const Logo = styled.img`
  height: 100px;
  max-width: 180px;
  object-fit: contain;
  osition: relative;
  margin-top: -25px;
  margin-bottom: -20px;
  z-index: 2;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 8px 15px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px 15px;
  font-size: inherit;
  font-family: inherit;
  text-decoration: none;
  display: inline-block; /* Para alinhar corretamente com os links */
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

const Header: React.FC<HeaderProps> = ({ onToggleTheme, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('adminPermission') === 'true';
  const isAuthenticated = !!localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminPermission');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <Link to="/postlist">
        <Logo src={logo} alt="Múltipla Escolha Logo" />
      </Link>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>{isOpen ? <FaTimes /> : <FaBars />}</Hamburger>
      <Nav isOpen={isOpen} onClick={(e) => { if ((e.target as HTMLElement).tagName === 'A') setIsOpen(false); }}>
        <StyledLink to="/postlist">Home</StyledLink>
        {isAdmin && <StyledLink to="/createpost">Criar</StyledLink>}
        {isAuthenticated ? (
          <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
        ) : (
          <StyledLink to="/login">Login</StyledLink>
        )}
        <ThemeToggleButton onClick={(e) => {
          e.stopPropagation(); 
          onToggleTheme();
        }}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </ThemeToggleButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
