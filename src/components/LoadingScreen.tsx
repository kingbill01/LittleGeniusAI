import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const LoadingScreen: React.FC = () => {
  const { currentLanguage } = useLanguage();
  
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                mb: 3,
                mx: 'auto',
              }}
            >
              🧠
            </Box>
          </motion.div>
          
          <Typography 
            variant="h2" 
            sx={{ 
              fontFamily: '"Fredoka One", cursive',
              fontSize: '3rem',
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            LittleGenius AI
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              opacity: 0.9,
              fontSize: '1.2rem',
            }}
          >
            {currentLanguage === 'fr' ? 'Préparation de ton aventure d\'apprentissage...' :
             currentLanguage === 'en' ? 'Preparing your learning adventure...' :
             'Příprava tvého vzdělávacího dobrodružství...'}
          </Typography>
        </Box>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <CircularProgress 
          size={40} 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.8)',
          }} 
        />
      </motion.div>
    </Box>
  );
};

export default LoadingScreen;