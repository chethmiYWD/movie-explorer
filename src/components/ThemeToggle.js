import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

function ThemeToggle({ toggleTheme, themeMode }) {
  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
}

export default ThemeToggle;