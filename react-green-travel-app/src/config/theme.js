import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Forest Green
      light: '#4caf50', // Light Green
      dark: '#1b5e20', // Dark Green
    },
    secondary: {
      main: '#ffa726', // Orange/Warm
      light: '#ffb74d',
      dark: '#f57c00',
    },
    success: {
      main: '#66bb6a',
    },
    warning: {
      main: '#ffa726',
    },
    error: {
      main: '#ef5350',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#1b5e20',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#2e7d32',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#2e7d32',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(46, 125, 50, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 20px rgba(46, 125, 50, 0.2)',
          },
        },
      },
    },
  },
});

export default theme;
