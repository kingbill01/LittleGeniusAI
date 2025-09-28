import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LanguageProvider } from './contexts/LanguageContext';
import App from './App';

// Déclaration des types pour Electron
declare global {
  interface Window {
    electron: {
      createUserProfile: (profileData: any) => Promise<any>;
      getUserProfiles: () => Promise<any[]>;
      updateUserProgress: (userId: string, progressData: any) => Promise<void>;
      aiChat: (message: string, userContext: any) => Promise<string>;
      aiGenerateActivity: (ageGroup: string, subject: string) => Promise<any>;
      getActivities: (ageGroup: string, subject: string) => Promise<any[]>;
      saveActivityResult: (activityResult: any) => Promise<void>;
    };
  }
}

// Thème personnalisé pour enfants
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#8b9dff',
      dark: '#3f51b5',
    },
    secondary: {
      main: '#ff6b6b',
      light: '#ff9999',
      dark: '#cc5555',
    },
    background: {
      default: '#f8f9ff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Fredoka One", cursive',
      fontWeight: 400,
    },
    h2: {
      fontFamily: '"Fredoka One", cursive',
      fontWeight: 400,
    },
    h3: {
      fontFamily: '"Fredoka One", cursive',
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontSize: '1.1rem',
          fontWeight: 600,
          padding: '12px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);