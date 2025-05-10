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

// Main App component that serves as the root of the application
function App() {
  // State for authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // State for theme management (light/dark mode)
  const [themeMode, setThemeMode] = useState('light');
  
  // Select theme based on themeMode state
  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Handle user login
  const handleLogin = (username) => {
    setIsLoggedIn(true);
  };

  return (
    // Theme provider for Material-UI theming
    <ThemeProvider theme={theme}>
      {/* Favorites context provider for global state management */}
      <FavoritesProvider>
        {/* Router for client-side navigation */}
        <Router>
          {isLoggedIn ? (
            // Authenticated routes
            <>
              {/* Header component with theme toggle */}
              <Header toggleTheme={toggleTheme} themeMode={themeMode} />
              
              {/* Route definitions */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetailsPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </>
          ) : (
            // Login page for unauthenticated users
            <LoginPage onLogin={handleLogin} />
          )}
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;