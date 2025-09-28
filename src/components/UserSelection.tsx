import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Grid,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon, ManageAccounts as AdminIcon, Language as LanguageIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { User } from '../App';
import AdminPanel from './AdminPanel';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../utils/translations';

interface UserSelectionProps {
  users: User[];
  onSelectUser: (user: User) => void;
  onCreateUser: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<User | null>;
  onShowCreateForm: () => void;
}

const UserSelection: React.FC<UserSelectionProps> = ({
  users,
  onSelectUser,
  onCreateUser,
  onShowCreateForm,
}) => {
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [adminAuthorized, setAdminAuthorized] = useState(false);
  
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage();
  const t = useTranslation(currentLanguage);

  const handleAdminAuthorization = (password: string): boolean => {
    if (password === 'admin123') {
      setAdminAuthorized(true);
      return true;
    }
    return false;
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2,
        position: 'relative',
      }}
    >
      {adminPanelOpen ? (
        <AdminPanel 
          open={adminPanelOpen}
          onClose={() => {
            setAdminPanelOpen(false);
            setAdminAuthorized(false);
          }}
          onAuthorize={handleAdminAuthorization}
          isAuthorized={adminAuthorized}
        />
      ) : (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: '800px', position: 'relative' }}
        >
          {/* Sélecteur de langue */}
          <Box sx={{ position: 'absolute', top: -60, left: 0 }}>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value as any)}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: 2,
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    py: 1,
                  },
                }}
                startAdornment={<LanguageIcon sx={{ mr: 1, color: '#667eea' }} />}
              >
                {availableLanguages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Fredoka One", cursive',
              color: 'white',
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 4,
            }}
          >
            {t.t('ui.selectUser')} 🌟
          </Typography>
          
          {/* Bouton Administration */}
          <IconButton
            onClick={() => setAdminPanelOpen(true)}
            sx={{
              position: 'absolute',
              top: -60,
              right: 0,
              bgcolor: '#FF6B35',
              color: 'white',
              width: 56,
              height: 56,
              border: '3px solid #FF8A65',
              boxShadow: '0 4px 16px rgba(255, 107, 53, 0.4)',
              '&:hover': { 
                bgcolor: '#E55A2B',
                transform: 'scale(1.05)',
                boxShadow: '0 6px 20px rgba(255, 107, 53, 0.6)',
              },
              transition: 'all 0.3s ease',
            }}
            title={t.t('nav.admin')}
          >
            <AdminIcon fontSize="large" />
          </IconButton>

          {users.length === 0 ? (
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.95)',
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 6 }}>
                <Typography variant="h4" sx={{ mb: 2, color: '#667eea' }}>
                  {t.t('ui.welcome')} ! 👋
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                  {t.t('ui.createProfile')}
                </Typography>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={onShowCreateForm}
                    sx={{
                      py: 2,
                      px: 4,
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #5a6fd8, #6a419a)',
                      },
                    }}
                  >
                    {t.t('ui.createProfile')}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          ) : (
            <Box>
              <Grid container spacing={3} justifyContent="center">
                {users.map((user, index) => (
                  <Grid item xs={12} sm={6} md={4} key={user.id}>
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 5,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card
                        onClick={() => onSelectUser(user)}
                        sx={{
                          cursor: 'pointer',
                          borderRadius: 4,
                          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                          overflow: 'hidden',
                          background: 'rgba(255, 255, 255, 0.95)',
                          border: '2px solid transparent',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            border: '2px solid #667eea',
                            boxShadow: '0 12px 35px rgba(102, 126, 234, 0.3)',
                          },
                        }}
                      >
                        <CardContent sx={{ textAlign: 'center', p: 4 }}>
                          <Avatar
                            sx={{
                              width: 80,
                              height: 80,
                              margin: '0 auto 16px',
                              fontSize: '2.5rem',
                              background: 'linear-gradient(45deg, #667eea, #764ba2)',
                              border: '4px solid white',
                              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                            }}
                          >
                            {user.avatar}
                          </Avatar>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 'bold',
                              color: '#333',
                              mb: 1,
                            }}
                          >
                            {user.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: '1rem' }}
                          >
                            {user.age} {t.t('ui.years')}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
                
                {/* Bouton Ajouter un profil */}
                <Grid item xs={12} sm={6} md={4}>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: users.length * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card
                      onClick={onShowCreateForm}
                      sx={{
                        cursor: 'pointer',
                        borderRadius: 4,
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                        overflow: 'hidden',
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '2px dashed #667eea',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          border: '2px solid #667eea',
                          boxShadow: '0 12px 35px rgba(102, 126, 234, 0.3)',
                        },
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center', p: 4 }}>
                        <Avatar
                          sx={{
                            width: 80,
                            height: 80,
                            margin: '0 auto 16px',
                            background: 'rgba(102, 126, 234, 0.1)',
                            color: '#667eea',
                            border: '4px solid white',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                          }}
                        >
                          <AddIcon fontSize="large" />
                        </Avatar>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 'bold',
                            color: '#667eea',
                            mb: 1,
                          }}
                        >
                          {t.t('ui.createProfile')}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: '1rem' }}
                        >
                          + {t.t('ui.createProfile')}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              </Grid>
            </Box>
          )}
        </motion.div>
      )}
    </Box>
  );
};

export default UserSelection;