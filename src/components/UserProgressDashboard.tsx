import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, EmojiEvents, TrendingUp, School } from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

interface UserStats {
  totalActivitiesCompleted: number;
  totalScore: number;
  averageScore: number;
  badgesEarned: string[];
  favoriteSubject: string;
  streak: number;
  timeSpent: number; // en minutes
  levelProgress: number; // 0-100
}

interface AchievementCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  progress?: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  icon,
  color,
  unlocked,
  progress = 100
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          height: '100%',
          background: unlocked 
            ? `linear-gradient(135deg, ${color}20, ${color}10)`
            : 'linear-gradient(135deg, #f5f5f5, #e0e0e0)',
          border: unlocked ? `2px solid ${color}` : '2px solid #ccc',
          opacity: unlocked ? 1 : 0.6,
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: unlocked ? `0 8px 25px ${color}30` : '0 8px 25px rgba(0,0,0,0.1)',
          },
          transition: 'all 0.3s ease'
        }}
      >
        {unlocked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 2
            }}
          >
            <Avatar sx={{ width: 24, height: 24, bgcolor: color }}>
              <Typography variant="caption">✓</Typography>
            </Avatar>
          </motion.div>
        )}
        
        <CardContent sx={{ textAlign: 'center', p: 3 }}>
          <motion.div
            animate={unlocked ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography variant="h2" sx={{ mb: 2, fontSize: '3rem' }}>
              {icon}
            </Typography>
          </motion.div>
          
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 1, 
              fontWeight: 'bold',
              color: unlocked ? color : '#666'
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: unlocked ? '#333' : '#999',
              mb: 2
            }}
          >
            {description}
          </Typography>

          {!unlocked && progress < 100 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                Progression: {Math.round(progress)}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: color
                  }
                }}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface UserProgressDashboardProps {
  userStats: UserStats;
  userName: string;
  userAvatar: string;
  onClose: () => void;
  open: boolean;
}

export const UserProgressDashboard: React.FC<UserProgressDashboardProps> = ({
  userStats,
  userName,
  userAvatar,
  onClose,
  open
}) => {
  const { currentLanguage } = useLanguage();
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (open && userStats.totalActivitiesCompleted > 0) {
      setTimeout(() => setShowCelebration(true), 500);
      setTimeout(() => setShowCelebration(false), 2000);
    }
  }, [open, userStats.totalActivitiesCompleted]);

  const achievements = [
    {
      title: 'Premier Pas',
      description: 'Termine ta première activité',
      icon: '🎯',
      color: '#4caf50',
      unlocked: userStats.totalActivitiesCompleted >= 1,
      progress: Math.min(100, (userStats.totalActivitiesCompleted / 1) * 100)
    },
    {
      title: 'Explorateur',
      description: 'Termine 5 activités différentes',
      icon: '🗺️',
      color: '#2196f3',
      unlocked: userStats.totalActivitiesCompleted >= 5,
      progress: Math.min(100, (userStats.totalActivitiesCompleted / 5) * 100)
    },
    {
      title: 'Perfectionniste',
      description: 'Obtiens un score parfait',
      icon: '⭐',
      color: '#ff9800',
      unlocked: userStats.averageScore >= 90,
      progress: Math.min(100, (userStats.averageScore / 90) * 100)
    },
    {
      title: 'Marathonien',
      description: 'Joue pendant 60 minutes',
      icon: '⏰',
      color: '#9c27b0',
      unlocked: userStats.timeSpent >= 60,
      progress: Math.min(100, (userStats.timeSpent / 60) * 100)
    },
    {
      title: 'Série Gagnante',
      description: 'Réussis 3 activités d\'affilée',
      icon: '🔥',
      color: '#f44336',
      unlocked: userStats.streak >= 3,
      progress: Math.min(100, (userStats.streak / 3) * 100)
    },
    {
      title: 'Maître Scholar',
      description: 'Termine 20 activités',
      icon: '🎓',
      color: '#607d8b',
      unlocked: userStats.totalActivitiesCompleted >= 20,
      progress: Math.min(100, (userStats.totalActivitiesCompleted / 20) * 100)
    }
  ];

  const getLevel = (score: number) => {
    return Math.floor(score / 100) + 1;
  };

  const getNextLevelScore = (currentScore: number) => {
    const currentLevel = getLevel(currentScore);
    return currentLevel * 100;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          maxHeight: '90vh',
          overflow: 'auto'
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              fontSize: '3rem',
              mx: 'auto',
              mb: 2,
              bgcolor: 'rgba(255,255,255,0.2)',
              border: '3px solid rgba(255,255,255,0.3)'
            }}
          >
            {userAvatar}
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            Tableau de Bord de {userName}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Niveau {getLevel(userStats.totalScore)}
          </Typography>
        </motion.div>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Statistiques principales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mb: 3, 
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                    {userStats.totalActivitiesCompleted}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Activités Terminées
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                    {Math.round(userStats.averageScore)}%
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Score Moyen
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: '#f44336', fontWeight: 'bold' }}>
                    {userStats.streak}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Série Actuelle
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: '#9c27b0', fontWeight: 'bold' }}>
                    {Math.round(userStats.timeSpent)}min
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Temps de Jeu
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Progression vers le niveau suivant */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mb: 3, 
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingUp /> Progression vers le Niveau {getLevel(userStats.totalScore) + 1}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={userStats.levelProgress}
              sx={{
                height: 12,
                borderRadius: 6,
                bgcolor: 'rgba(255,255,255,0.2)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 6,
                  background: 'linear-gradient(90deg, #4caf50, #8bc34a)'
                }
              }}
            />
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
              {userStats.totalScore} / {getNextLevelScore(userStats.totalScore)} points
            </Typography>
          </Paper>
        </motion.div>

        {/* Succès débloqués */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmojiEvents /> Succès & Récompenses
          </Typography>
          <Grid container spacing={2}>
            {achievements.map((achievement, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <AchievementCard {...achievement} />
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Animation de célébration */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
                pointerEvents: 'none'
              }}
            >
              <Typography variant="h2" sx={{ fontSize: '4rem' }}>
                🎉✨🌟
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          size="large"
          sx={{
            bgcolor: 'rgba(255,255,255,0.2)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
            px: 4
          }}
        >
          Continuer l'Aventure ! 🚀
        </Button>
      </DialogActions>
    </Dialog>
  );
};