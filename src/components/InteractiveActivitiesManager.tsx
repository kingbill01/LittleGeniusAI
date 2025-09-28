import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Paper,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { InteractiveActivityRenderer, InteractiveActivity } from './InteractiveActivityRenderer';
import { interactiveActivities } from '../data/interactiveContent';

interface InteractiveActivitiesManagerProps {
  userAge: number;
  subject?: string;
  onActivityComplete: (activityId: string, score: number, badges: string[]) => void;
  onBack: () => void;
}

export const InteractiveActivitiesManager: React.FC<InteractiveActivitiesManagerProps> = ({
  userAge,
  subject,
  onActivityComplete,
  onBack,
}) => {
  const { currentLanguage } = useLanguage();
  const [selectedActivity, setSelectedActivity] = useState<InteractiveActivity | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  // Filtrer les activités par âge et matière
  const filteredActivities = interactiveActivities.filter(activity => {
    const ageMatch = userAge >= activity.minAge && userAge <= activity.maxAge;
    const subjectMatch = !subject || activity.subject === subject;
    return ageMatch && subjectMatch;
  });

  const handleActivitySelect = (activity: InteractiveActivity) => {
    setSelectedActivity(activity);
  };

  const handleActivityComplete = (score: number, badges: string[]) => {
    if (selectedActivity) {
      onActivityComplete(selectedActivity.id, score, badges);
      setSelectedActivity(null);
    }
  };

  const handleBackFromActivity = () => {
    setSelectedActivity(null);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return '#4caf50';
    if (difficulty <= 4) return '#ff9800';
    return '#f44336';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 2) return 'Facile';
    if (difficulty <= 4) return 'Moyen';
    return 'Difficile';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'eco-sorting': return '♻️';
      case 'number-sequence': return '🔢';
      case 'story-builder': return '📖';
      case 'rhythm-game': return '🥁';
      default: return '🎮';
    }
  };

  if (selectedActivity) {
    return (
      <InteractiveActivityRenderer
        activity={selectedActivity}
        onComplete={handleActivityComplete}
        onBack={handleBackFromActivity}
      />
    );
  }

  return (
    <Box sx={{ 
      p: 3,
      maxHeight: '100vh',
      overflowY: 'auto',
    }}>
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: '#f8f9fa' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ color: '#1976d2', mb: 1 }}>
                🎮 Activités Interactives
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Découvre des activités amusantes et éducatives adaptées à ton âge !
              </Typography>
            </Box>
            <Button
              variant="outlined"
              onClick={onBack}
              sx={{ height: 'fit-content' }}
            >
              ← Retour
            </Button>
          </Box>
        </Paper>
      </motion.div>

      {/* Informations utilisateur */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body1">
            👦👧 Activités pour {userAge} ans
            {subject && ` • 📚 Matière: ${subject}`}
            • 🎯 {filteredActivities.length} activité(s) disponible(s)
          </Typography>
        </Alert>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Paper elevation={1} sx={{ p: 2, mb: 3, bgcolor: '#e3f2fd' }}>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            💡 <strong>Astuce:</strong> Clique sur une activité pour voir les détails et commencer à jouer !
          </Typography>
        </Paper>
      </motion.div>

      {/* Grille des activités */}
      {filteredActivities.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#666' }}>
              🔍 Aucune activité trouvée
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Il n'y a pas d'activités interactives disponibles pour cet âge
              {subject && ` dans la matière ${subject}`}.
            </Typography>
          </Paper>
        </motion.div>
      ) : (
        <Grid container spacing={3}>
          {filteredActivities.map((activity, index) => (
            <Grid item xs={12} sm={6} md={4} key={activity.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                  onClick={() => handleActivitySelect(activity)}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {/* Icône et titre */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Typography variant="h3">
                        {getActivityIcon(activity.type)}
                      </Typography>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                          {activity.title[currentLanguage]}
                        </Typography>
                        <Chip
                          label={getDifficultyLabel(activity.difficulty)}
                          size="small"
                          sx={{
                            bgcolor: getDifficultyColor(activity.difficulty),
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.7rem',
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 2, minHeight: 60 }}
                    >
                      {activity.description[currentLanguage]}
                    </Typography>

                    {/* Badges */}
                    {activity.badges.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {activity.badges.slice(0, 2).map((badge, badgeIndex) => (
                          <Chip
                            key={badgeIndex}
                            label={badge}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        ))}
                        {activity.badges.length > 2 && (
                          <Chip
                            label={`+${activity.badges.length - 2}`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        )}
                      </Box>
                    )}

                    {/* Métadonnées */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label={`${activity.minAge}-${activity.maxAge} ans`}
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{ fontSize: '0.7rem' }}
                      />
                      <Chip
                        label={activity.subject}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: '#4caf50',
                        '&:hover': { bgcolor: '#45a049' },
                        fontWeight: 'bold',
                      }}
                    >
                      🚀 Jouer !
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};