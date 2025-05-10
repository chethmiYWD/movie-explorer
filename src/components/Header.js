import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Header.css';

function Header({ toggleTheme, themeMode }) {
  return (
    <AppBar position="static" className={`header ${themeMode === 'dark' ? 'dark-mode' : ''}`}>
      <Toolbar className="header-container">
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          className="logo"
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          Movie Explorer
        </Typography>
        <div className="nav-links">
          <Button 
            color="inherit" 
            component={Link} 
            to="/favorites"
            className="nav-link"
          >
            Favorites
          </Button>
          <ThemeToggle toggleTheme={toggleTheme} themeMode={themeMode} className="theme-toggle" />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;