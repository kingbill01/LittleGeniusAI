import React, { useState, useEffect } from 'react';
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
  IconButton,
} from '@mui/material';
import { ArrowBack as BackIcon, PlayArrow as PlayIcon, Info as InfoIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../utils/translations';
import { InteractiveActivityPlayer } from './InteractiveActivityPlayer';
import {
  InteractiveActivityData,
  getInteractiveActivitiesByFilter,
  getAllInteractiveActivities,
} from '../data/interactiveActivitiesData';

interface UnifiedInteractiveManagerProps {
  userAge: number;
  subject?: string;
  onActivityComplete: (activityId: string, score: number, timeSpent: number) => void;
  onBack: () => void;
}

export const UnifiedInteractiveManager: React.FC<UnifiedInteractiveManagerProps> = ({
  userAge,
  subject,
  onActivityComplete,
  onBack,
}) => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  const [selectedActivity, setSelectedActivity] = useState<InteractiveActivityData | null>(null);
  const [availableActivities, setAvailableActivities] = useState<InteractiveActivityData[]>([]);

  useEffect(() => {
    // Déterminer le groupe d'âge
    let ageGroup: '3-5' | '6-8' | '9-12';
    if (userAge <= 5) ageGroup = '3-5';
    else if (userAge <= 8) ageGroup = '6-8';
    else ageGroup = '9-12';

    // Filtrer les activités
    const filtered = getInteractiveActivitiesByFilter(ageGroup, subject);
    setAvailableActivities(filtered);
  }, [userAge, subject]);

  const handleActivitySelect = (activity: InteractiveActivityData) => {
    setSelectedActivity(activity);
  };

  const handleActivityComplete = (score: number, timeSpent: number) => {
    if (selectedActivity) {
      onActivityComplete(selectedActivity.id, score, timeSpent);
    }
    setSelectedActivity(null);
  };

  const handleBackFromActivity = () => {
    setSelectedActivity(null);
  };

  const getSubjectIcon = (subjectKey: string) => {
    const icons: { [key: string]: string } = {
      math: '🔢',
      language: '📝',
      science: '🔬',
      art: '🎨',
      computing: '💻',
      civic: '🏛️',
      hygiene: '🫧',
      anatomy: '🧠',
    };
    return icons[subjectKey] || '📚';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      default: return '#757575';
    }
  };

  const getActivityTypeLabel = (type: string) => {
    const labels: { [key: string]: { fr: string; en: string; cs: string } } = {
      'drag-drop': { fr: 'Glisser-déposer', en: 'Drag & drop', cs: 'Přetažení' },
      'click-sequence': { fr: 'Séquence de clics', en: 'Click sequence', cs: 'Posloupnost kliknutí' },
      'form-interaction': { fr: 'Interaction', en: 'Interaction', cs: 'Interakce' },
      'puzzle': { fr: 'Puzzle', en: 'Puzzle', cs: 'Puzzle' },
      'game': { fr: 'Jeu', en: 'Game', cs: 'Hra' },
    };
    return labels[type]?.[currentLanguage] || type;
  };

  if (selectedActivity) {
    return (
      <InteractiveActivityPlayer
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
                🎮 Activités Interactives Spécialisées
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Des activités avec des boutons, formes et éléments interactifs pour apprendre en s'amusant !
              </Typography>
            </Box>
            <IconButton
              onClick={onBack}
              sx={{ 
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.2)' }
              }}
            >
              <BackIcon />
            </IconButton>
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
            {subject && ` • ${getSubjectIcon(subject)} Matière: ${t(`subjects.${subject}`)}`}
            • 🎯 {availableActivities.length} activité(s) interactive(s) disponible(s)
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
            <InfoIcon sx={{ color: '#1976d2' }} />
            Ces activités contiennent des éléments cliquables, déplaçables et interactifs. 
            Utilise ta souris pour cliquer, glisser et déposer les éléments !
          </Typography>
        </Paper>
      </motion.div>

      {/* Liste des activités */}
      {availableActivities.length > 0 ? (
        <Grid container spacing={3}>
          {availableActivities.map((activity, index) => (
            <Grid item xs={12} sm={6} md={4} key={activity.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      transform: 'translateY(-2px)',
                    },
                    border: '2px solid',
                    borderColor: getDifficultyColor(activity.difficulty),
                  }}
                >
                  <CardContent sx={{ flex: 1, p: 2 }}>
                    {/* Type et difficulté */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Chip
                        label={getActivityTypeLabel(activity.type)}
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(25, 118, 210, 0.1)',
                          color: '#1976d2',
                          fontWeight: 'bold'
                        }}
                      />
                      <Chip
                        label={t(`difficulties.${activity.difficulty}`)}
                        size="small"
                        sx={{
                          bgcolor: getDifficultyColor(activity.difficulty),
                          color: 'white',
                        }}
                      />
                    </Box>

                    {/* Titre et icône */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ flex: 1, fontWeight: 'bold' }}>
                        {activity.title[currentLanguage]}
                      </Typography>
                      <Typography variant="h4" sx={{ ml: 1 }}>
                        {getSubjectIcon(activity.subject)}
                      </Typography>
                    </Box>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, lineHeight: 1.4 }}
                    >
                      {activity.description[currentLanguage]}
                    </Typography>

                    {/* Métadonnées */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip 
                        label={t(`ageGroups.${activity.ageGroup}`)} 
                        size="small" 
                        variant="outlined" 
                      />
                      <Chip 
                        label={t(`subjects.${activity.subject}`)} 
                        size="small" 
                        variant="outlined" 
                      />
                      <Chip 
                        label={`⏱️ ${activity.estimatedTime}min`} 
                        size="small" 
                        variant="outlined" 
                      />
                    </Box>

                    {/* Nombre d'éléments interactifs */}
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      🎯 {activity.elements.length} élément(s) interactif(s)
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<PlayIcon />}
                      onClick={() => handleActivitySelect(activity)}
                      sx={{
                        bgcolor: getDifficultyColor(activity.difficulty),
                        '&:hover': {
                          bgcolor: getDifficultyColor(activity.difficulty),
                          filter: 'brightness(0.9)',
                        },
                      }}
                    >
                      Jouer maintenant
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              🎮 Aucune activité interactive disponible
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Il n'y a pas d'activités interactives spécialisées pour {userAge} ans
              {subject && ` en ${t(`subjects.${subject}`)}`} pour le moment.
            </Typography>
            <Button variant="outlined" onClick={onBack}>
              ← Retour aux activités générales
            </Button>
          </Paper>
        </motion.div>
      )}
    </Box>
  );
};

export default UnifiedInteractiveManager;