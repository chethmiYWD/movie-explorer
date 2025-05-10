import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Header.css';

// Main header component with navigation and theme toggle
function Header({ toggleTheme, themeMode }) {
  return (
    // Top navigation bar
    <AppBar position="static" className={`header ${themeMode === 'dark' ? 'dark-mode' : ''}`}>
      {/* Container for header content */}
      <Toolbar className="header-container">
        {/* App logo linking to home */}
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          className="logo"
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          Movie Explorer
        </Typography>

        {/* Navigation links container */}
        <div className="nav-links">
          {/* Favorites page link */}
          <Button 
            color="inherit" 
            component={Link} 
            to="/favorites"
            className="nav-link"
          >
            Favorites
          </Button>

          {/* Theme toggle button */}
          <ThemeToggle toggleTheme={toggleTheme} themeMode={themeMode} className="theme-toggle" />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;