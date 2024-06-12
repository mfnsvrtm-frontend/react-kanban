import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const defaultTheme = createTheme();
const customTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: 'rgba(0, 0, 0, 0.01)'
    },
    secondary: {
      main: '#000'
    },
    primary: {
      main: '#000'
    }
  },
  typography: {
    h1: {
      fontSize: '1.75rem',
      fontWeight: '700'
    },
    h2: {
      fontSize: '1.15rem',
      fontWeight: '600'
    },
    h3: {
      fontSize: '1rem',
      fontWeight: '500'
    },
    body1: {
      fontSize: '0.875rem'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#000',
          boxShadow: 'none',
          borderBottom: `1px solid ${defaultTheme.palette.divider}`,
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#000'
        }
      }
    },
    MuiInputLabel: {
      defaultProps: {
        color: 'secondary',
      }
    },
    MuiInputBase: {
      defaultProps: {
        color: 'secondary',
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
