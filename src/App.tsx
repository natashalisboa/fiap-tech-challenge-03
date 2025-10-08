import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import GlobalStyle from './GlobalStyle';
import Login from './pages/Login/Login';
import PostList from './pages/PostsList/PostList';
import PostDetail from './pages/PostDetail/PostDetail';
import CreateEditPost from './pages/CreateEditPost/CreateEditPost';
import Layout from './pages/Login/Layout';

const AppContainer = styled.div`
  background-color: var(--color-background);
  min-height: 100vh;
  color: var(--color-text);
`;

const App: React.FC = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Routes>
            {/* Rota de Login sem o Layout/Header */}
            <Route path="/login" element={<Login />} />

            {/* Agrupa todas as outras rotas dentro do Layout com Header */}
            <Route path="/*" element={
              <Layout onToggleTheme={toggleTheme} theme={theme}>
                <Routes>
                  <Route path="/postlist" element={<PostList />} />
                  <Route path="/postdetail/:postId" element={<PostDetail />} />
                  <Route path="/createpost" element={<CreateEditPost />} />
                  <Route path="/editpost/:postId" element={<CreateEditPost />} />
                  <Route path="/" element={<Navigate to="/postlist" />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App;