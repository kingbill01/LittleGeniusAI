import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import ScrollableContainer from './ScrollableContainer';

/**
 * Composant de test pour démontrer les fonctionnalités de scroll
 * Utilisé pour valider que tous les composants scrollent correctement
 */
export const ScrollTestComponent: React.FC = () => {
  const generateTestItems = (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      title: `Élément de test ${index + 1}`,
      description: `Description détaillée de l'élément ${index + 1} pour tester le défilement`,
      type: ['math', 'language', 'science', 'art'][index % 4],
      difficulty: ['easy', 'medium', 'hard'][index % 3],
    }));
  };

  const testItems = generateTestItems(20);

  return (
    <Box sx={{ p: 3, bgcolor: '#f8f9ff', minHeight: '100vh' }}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Fredoka One", cursive',
          color: '#667eea',
          textAlign: 'center',
          mb: 4,
        }}
      >
        🧪 Test des Composants Scrollables
      </Typography>

      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Cette page contient beaucoup d'éléments pour tester le scroll
      </Typography>

      <ScrollableContainer 
        maxHeight="80vh" 
        showScrollToTop={true}
        sx={{ mx: 'auto', maxWidth: 1200 }}
      >
        <Grid container spacing={3}>
          {testItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #667eea20, #764ba220)',
                    border: '2px solid #667eea30',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)',
                      borderColor: '#667eea',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Chip 
                        label={item.type} 
                        size="small" 
                        sx={{ 
                          bgcolor: '#667eea', 
                          color: 'white',
                          fontWeight: 'bold',
                        }} 
                      />
                      <Chip 
                        label={item.difficulty} 
                        size="small" 
                        color={
                          item.difficulty === 'easy' ? 'success' :
                          item.difficulty === 'medium' ? 'warning' : 'error'
                        }
                      />
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Fredoka One", cursive',
                        color: '#667eea',
                        mb: 2,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}
                    >
                      {item.description}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ mb: 2, fontStyle: 'italic' }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>

                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        borderColor: '#667eea',
                        color: '#667eea',
                        '&:hover': {
                          borderColor: '#5a6fd8',
                          bgcolor: '#667eea10',
                        },
                      }}
                    >
                      Commencer l'activité
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Section supplémentaire pour forcer le scroll */}
        <Paper 
          elevation={2} 
          sx={{ 
            mt: 4, 
            p: 4, 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 4,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontFamily: '"Fredoka One", cursive' }}>
            🎉 Fin de la liste !
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Si vous voyez ce message, le scroll fonctionne parfaitement !
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Utilisez le bouton ↑ pour remonter en haut de la page
          </Typography>
        </Paper>
      </ScrollableContainer>
    </Box>
  );
};

export default ScrollTestComponent;