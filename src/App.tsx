import React, { useState, useEffect } from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// Import des composants
import LoadingScreen from './components/LoadingScreen';
import WelcomeScreen from './components/WelcomeScreen';
import UserSelection from './components/UserSelection';
import Dashboard from './components/Dashboard';
import ActivityPlayer from './components/ActivityPlayer';
import AICompanion from './components/AICompanion';
import { LanguageProvider } from './contexts/LanguageContext';

// Types
export interface User {
  id: string;
  name: string;
  age: number;
  avatar: string;
  createdAt: string;
  parentalControls: {
    timeLimit?: number;
    allowedSubjects: string[];
    difficultyLevel: 'easy' | 'medium' | 'hard';
  };
  voicePreferences?: {
    enabled: boolean;
    voiceId?: string;
  };
}

// Simple error boundary to avoid blank white screen on runtime errors
class AppErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error?: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, info: any) {
    console.error('Renderer error boundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, color: 'white', fontFamily: 'monospace' }}>
          <h2>Une erreur est survenue dans l'interface.</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.error)}</pre>
          <p>Relance l'application ou recrée un profil si nécessaire.</p>
        </Box>
      );
    }
    return this.props.children as any;
  }
}

function App() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const DEBUG_UI = false; // Toggle debug overlay (désactivé)

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Attendre un peu pour l'effet de chargement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Charger les profils utilisateurs
      if (window.electron) {
        const profiles = await window.electron.getUserProfiles();
        setUsers(profiles);
        console.log('[DEBUG] Profils chargés:', profiles);
      } else {
        console.warn('[DEBUG] window.electron est undefined — API preload non disponible');
      }
      
      setLoading(false);
      console.log('[DEBUG] loading=false, users.length=', users.length, 'currentUser=', currentUser);
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
      setLoading(false);
    }
  };

  const createUser = async (userData: Omit<User, 'id' | 'createdAt'>) => {
    try {
      if (window.electron) {
        const newUser = await window.electron.createUserProfile(userData);
        setUsers(prev => [...prev, newUser]);
        return newUser;
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
    }
    return null;
  };

  const selectUser = (user: User) => {
    setCurrentUser(user);
  };

  const updateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const backToUserSelection = () => {
    setCurrentUser(null);
  };

  if (loading) {
    if (DEBUG_UI) console.log('[DEBUG] Affichage LoadingScreen');
    return <LoadingScreen />;
  }

  // Detect file:// (production build loaded locally) -> prefer HashRouter to avoid history issues
  const isFile = typeof window !== 'undefined' && window.location.protocol === 'file:';
  const RouterChooser: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const R: any = isFile ? HashRouter : BrowserRouter;
    return <R>{children}</R>;
  };

  return (
    <LanguageProvider>
      <Box sx={{
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <AppErrorBoundary>
        <RouterChooser>
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  currentUser ? (
                    <Dashboard 
                      user={currentUser} 
                      onUserUpdate={updateUser}
                      onBackToUserSelection={backToUserSelection}
                    />
                  ) : (users.length === 0 || showCreateUser) ? (
                    <WelcomeScreen 
                      onCreateUser={async (userData: any) => {
                        const newUser = await createUser(userData);
                        if (newUser) {
                          setShowCreateUser(false);
                        }
                        return newUser;
                      }}
                      onBack={users.length > 0 ? () => setShowCreateUser(false) : undefined}
                    />
                  ) : (
                    <UserSelection
                      users={users}
                      onSelectUser={selectUser}
                      onCreateUser={createUser}
                      onShowCreateForm={() => setShowCreateUser(true)}
                    />
                  )
                }
              />
              <Route
                path="/activity/:id"
                element={
                  currentUser ? (
                    <ActivityPlayer user={currentUser} />
                  ) : (
                    <UserSelection users={users} onSelectUser={selectUser} onCreateUser={createUser} onShowCreateForm={() => setShowCreateUser(true)} />
                  )
                }
              />
            </Routes>
          </AnimatePresence>
        </RouterChooser>
        {currentUser && (
          <AICompanion user={currentUser} />
        )}
        {DEBUG_UI && (
          <Box sx={{ position: 'fixed', bottom: 8, right: 8, bgcolor: 'rgba(0,0,0,0.5)', color: 'white', p: 1.2, borderRadius: 1, fontSize: 12, fontFamily: 'monospace', zIndex: 9999 }}>
            <div>DEBUG OVERLAY</div>
            <div>fileProtocol: {String(isFile)}</div>
            <div>users: {users.length}</div>
            <div>currentUser: {currentUser ? currentUser.name : 'none'}</div>
            <div>window.electron: {typeof window !== 'undefined' && (window as any).electron ? 'ok' : 'missing'}</div>
            <div>location: {typeof window !== 'undefined' ? window.location.href : 'n/a'}</div>
          </Box>
        )}
      </AppErrorBoundary>
    </Box>
    </LanguageProvider>
  );
}

export default App;