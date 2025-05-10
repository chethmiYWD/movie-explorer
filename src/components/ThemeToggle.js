import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import './ThemeToggle.css';

// Theme toggle button component for switching between light/dark modes
function ThemeToggle({ toggleTheme, themeMode }) {
  return (
    // Clickable icon button that toggles theme
    <IconButton 
      onClick={toggleTheme}       // Calls parent's toggle function on click
      color="inherit"            // Inherits color from parent
      className="theme-toggle-button"
    >
      {/* Shows moon icon in light mode, sun icon in dark mode */}
      {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
}

export default ThemeToggle;