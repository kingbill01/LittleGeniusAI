import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../utils/translations';
import { EcoSortingGame } from './EcoSortingGame';
import { NumberSequenceGame } from './NumberSequenceGame';
import { StoryBuilderGame } from './StoryBuilderGame';

export interface InteractiveActivity {
  id: string;
  type: 'eco-sorting' | 'number-sequence' | 'story-builder' | 'rhythm-game';
  title: { fr: string; en: string; cs: string };
  description: { fr: string; en: string; cs: string };
  difficulty: number;
  minAge: number;
  maxAge: number;
  subject: string;
  badges: string[];
  data: any;
}

interface InteractiveActivityRendererProps {
  activity: InteractiveActivity;
  onComplete: (score: number, badges: string[]) => void;
  onBack: () => void;
}

export const InteractiveActivityRenderer: React.FC<InteractiveActivityRendererProps> = ({
  activity,
  onComplete,
  onBack,
}) => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleGameComplete = (score: number, extraData?: any) => {
    setFinalScore(score);
    setGameCompleted(true);
    
    // Déterminer les badges gagnés basés sur le score
    const earnedBadges: string[] = [];
    if (score >= 90) earnedBadges.push('perfectionist');
    if (score >= 70) earnedBadges.push('expert');
    if (score >= 50) earnedBadges.push('achiever');
    earnedBadges.push(...activity.badges);

    setTimeout(() => {
      onComplete(score, earnedBadges);
    }, 3000);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return '#4caf50'; // Facile - Vert
    if (difficulty <= 4) return '#ff9800'; // Moyen - Orange
    return '#f44336'; // Difficile - Rouge
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 2) return t('difficulty.easy');
    if (difficulty <= 4) return t('difficulty.medium');
    return t('difficulty.hard');
  };

  if (gameCompleted) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={4} sx={{ p: 4, textAlign: 'center', bgcolor: '#e8f5e8' }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            🎉
          </Typography>
          <Typography variant="h4" sx={{ mb: 2, color: '#4caf50' }}>
            {t('interactiveUI.activityCompleted')}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {activity.title[currentLanguage]}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {t('interactiveUI.finalScore')}: {finalScore} {t('interactiveUI.points')}
          </Typography>
          <Alert severity="success" sx={{ mb: 3 }}>
            {t('interactiveUI.excellentWork')} 🌟
          </Alert>
          <Button
            variant="contained"
            onClick={onBack}
            size="large"
            sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#45a049' } }}
          >
            Continuer
          </Button>
        </Paper>
      </motion.div>
    );
  }

  if (!gameStarted) {
    return (
      <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        {/* En-tête de l'activité */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 3, bgcolor: '#f8f9fa' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" sx={{ flexGrow: 1, color: '#1976d2' }}>
                {activity.title[currentLanguage]}
              </Typography>
              <Chip
                label={getDifficultyLabel(activity.difficulty)}
                sx={{
                  bgcolor: getDifficultyColor(activity.difficulty),
                  color: 'white',
                  fontWeight: 'bold',
                }}
              />
            </Box>
            
            <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem' }}>
              {activity.description[currentLanguage]}
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item>
                <Chip
                  label={`👥 ${activity.minAge}-${activity.maxAge} ${t('interactiveUI.years')}`}
                  variant="outlined"
                  color="primary"
                />
              </Grid>
              <Grid item>
                <Chip
                  label={`📚 ${activity.subject}`}
                  variant="outlined"
                  color="secondary"
                />
              </Grid>
              <Grid item>
                <Chip
                  label={`⭐ ${getDifficultyLabel(activity.difficulty)}`}
                  variant="outlined"
                  sx={{ borderColor: getDifficultyColor(activity.difficulty) }}
                />
              </Grid>
            </Grid>

            {/* Badges disponibles */}
            {activity.badges.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  🏆 {t('interactiveUI.badgesToEarn')}:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {activity.badges.map((badge, index) => (
                    <Chip
                      key={index}
                      label={badge}
                      size="small"
                      sx={{ bgcolor: '#fff3e0', color: '#e65100' }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        </motion.div>

        {/* Boutons d'action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#333' }}>
              {t('interactiveUI.gameIntro')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => setGameStarted(true)}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.2rem',
                  bgcolor: '#4caf50',
                  '&:hover': { bgcolor: '#45a049' }
                }}
              >
                🚀 {t('interactiveUI.startGame')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={onBack}
                sx={{ px: 4, py: 2 }}
              >
                ← {t('action.back')}
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    );
  }

  // Rendu du jeu selon le type
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* Bouton de sortie fixe */}
      <Box 
        sx={{ 
          position: 'fixed', 
          top: 20, 
          right: 20, 
          zIndex: 1000,
          display: 'flex',
          gap: 2
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setGameStarted(false)}
          sx={{ 
            bgcolor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            border: '2px solid #1976d2',
            fontWeight: 'bold'
          }}
        >
          ← Aperçu
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onBack}
          sx={{ 
            bgcolor: '#f44336',
            fontWeight: 'bold',
            '&:hover': { bgcolor: '#d32f2f' }
          }}
        >
          🚪 Quitter
        </Button>
      </Box>

      {/* Rendu du jeu spécifique */}
      {activity.type === 'eco-sorting' && (
        <EcoSortingGame
          items={activity.data.items}
          bins={activity.data.bins}
          onComplete={handleGameComplete}
        />
      )}

      {activity.type === 'number-sequence' && (
        <NumberSequenceGame
          sequence={activity.data.sequence}
          rule={activity.data.rule}
          hint={activity.data.hint}
          onComplete={handleGameComplete}
        />
      )}

      {activity.type === 'story-builder' && (
        <StoryBuilderGame
          theme={activity.data.theme}
          steps={activity.data.steps}
          onComplete={(story, score) => handleGameComplete(score, { story })}
        />
      )}

      {activity.type === 'rhythm-game' && (
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', m: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            🥁 Jeu de Rythme
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Ce jeu sera bientôt disponible ! 🎵
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleGameComplete(75)}
          >
            Continuer (Demo)
          </Button>
        </Paper>
      )}
    </Box>
  );
};