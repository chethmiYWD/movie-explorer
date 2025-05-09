import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Header({ toggleTheme, themeMode }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Movie Explorer
        </Typography>
        <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
        <ThemeToggle toggleTheme={toggleTheme} themeMode={themeMode} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;