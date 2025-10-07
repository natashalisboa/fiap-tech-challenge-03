import  { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import MainContent from './components/Main/MainContent';
import Login from './pages/Login/Login';
import PostList from './pages/PostsList/PostList';
import PostDetail from './pages/PostDetail/PostDetail';
import CreateEditPost from './pages/CreateEditPost/CreateEditPost';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header onToggleTheme={toggleTheme} />
        <MainContent>
          <Routes>
            <Route path="/" element={
              <>
                <h1>Pendências</h1>
                
              </>
            } />
          
            <Route path="/login" element={<Login />} />
            <Route path="/postlist" element={<PostList />} />
            <Route path="/postdetail/:id" element={<PostDetail />} />
            <Route path="/createpost" element={<CreateEditPost />} />
            <Route path="/editpost/:id" element={<CreateEditPost />} />
          </Routes>
        </MainContent>
      </div>
    </Router>
  );
}

export default App;