import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a777e3', // Purple accent color
    },
    secondary: {
      main: '#6e8efb', // Blue accent color
    },
    background: {
      default: '#121212', // Dark background for the entire window
      paper: '#1e1e1e',  // Slightly lighter for paper surfaces
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#555',
            },
            '&:hover fieldset': {
              borderColor: '#a777e3',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6e8efb',
            },
            color: '#ffffff',
            backgroundColor: '#1e1e1e', // Dark background for input
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          '& .MuiOutlinedInput-input': {
            color: '#ffffff', // White text
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e', // Dark background for all Paper components
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a', // Slightly different dark for app bar
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a1a1a', // Dark background for drawers
        },
      },
    },
  },
});

export default darkTheme;