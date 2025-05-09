import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import lightTheme from './themes/light';
import darkTheme from './themes/dark';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import MovieDetailsPage from './pages/MovieDetailsPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [themeMode, setThemeMode] = useState('light');
  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <FavoritesProvider>
        <Router>
          {isLoggedIn ? (
            <>
              <Header toggleTheme={toggleTheme} themeMode={themeMode} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetailsPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </>
          ) : (
            <LoginPage onLogin={handleLogin} />
          )}
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;