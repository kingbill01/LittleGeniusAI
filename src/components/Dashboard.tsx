import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  LinearProgress,
  Chip,
  Paper,
  IconButton,
} from '@mui/material';
import {
  School as SchoolIcon,
  PlayArrow as PlayIcon,
  Star as StarIcon,
  Timer as TimerIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { User } from '../App';
import ScrollableContainer from './ScrollableContainer';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../utils/translations';
import { VoiceSettingsDialog } from './VoiceSettingsDialog';
import { SubjectManager } from './SubjectManager';
import { UnifiedInteractiveManager } from './UnifiedInteractiveManager';

interface DashboardProps {
  user: User;
  onUserUpdate?: (user: User) => void;
  onBackToUserSelection?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onUserUpdate, onBackToUserSelection }) => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentActivity, setCurrentActivity] = useState<'math' | 'language' | 'science' | 'art' | 'computing' | 'civic' | 'hygiene' | 'anatomy' | 'interactive' | null>(null);
  const [voiceSettingsOpen, setVoiceSettingsOpen] = useState(false);
  const [subjectManagerOpen, setSubjectManagerOpen] = useState(false);
  const [interactiveManagerOpen, setInteractiveManagerOpen] = useState(false);
  const [selectedInteractiveSubject, setSelectedInteractiveSubject] = useState<string | undefined>(undefined);
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);

  useEffect(() => {
    loadActivities();
  }, [user]);

  const loadActivities = async () => {
    try {
      if (window.electron) {
        const userActivities = await window.electron.getActivities(
          user.age <= 5 ? '3-5' : user.age <= 8 ? '6-8' : '9-12',
          ''
        );
        setActivities(userActivities);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des activités:', error);
    } finally {
      setLoading(false);
    }
  };

  const subjects = [
    { id: 'math', name: t('subjects.math'), icon: '🔢', color: '#4CAF50' },
    { id: 'language', name: t('subjects.language'), icon: '📖', color: '#2196F3' },
    { id: 'science', name: t('subjects.science'), icon: '🔬', color: '#FF9800' },
    { id: 'art', name: t('subjects.art'), icon: '🎨', color: '#E91E63' },
    { id: 'computing', name: t('subjects.computing'), icon: '💻', color: '#009688' },
    { id: 'anatomy', name: t('subjects.anatomy'), icon: '🧠', color: '#8E24AA' },
    { id: 'civic', name: t('subjects.civic'), icon: '🏛️', color: '#795548' },
    { id: 'hygiene', name: t('subjects.hygiene'), icon: '🫧', color: '#03A9F4' },
  ];

  const getAgeGroup = () => {
    if (user.age <= 5) return '3-5 ans';
    if (user.age <= 8) return '6-8 ans';
    return '9-12 ans';
  };

  // Gestion des activités sélectionnées - DOIT être avant tout return conditionnel
  useEffect(() => {
    if (currentActivity === 'interactive') {
      console.log('Interactive activity selected');
      setInteractiveManagerOpen(true);
      setCurrentActivity(null);
    } else if (currentActivity) {
      console.log('Activity selected:', currentActivity);
      // Ouvrir le gestionnaire de matières avec la matière sélectionnée
      setSelectedInteractiveSubject(currentActivity);
      setSubjectManagerOpen(true);
      setCurrentActivity(null);
    }
  }, [currentActivity]);

  if (loading) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LinearProgress sx={{ width: 200 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      maxHeight: '100vh',
      bgcolor: '#f8f9ff', 
      p: 3,
      overflowY: 'auto',
      overflowX: 'hidden'
    }}>
      {/* Header avec profil utilisateur */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  fontSize: '3rem',
                  bgcolor: 'rgba(255,255,255,0.2)',
                  border: '3px solid rgba(255,255,255,0.3)',
                }}
              >
                {user.avatar}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Fredoka One", cursive',
                  mb: 1,
                }}
              >
                {currentLanguage === 'fr' ? `Salut ${user.name} ! 👋` : 
                 currentLanguage === 'en' ? `Hi ${user.name}! 👋` : 
                 `Ahoj ${user.name}! 👋`}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                {currentLanguage === 'fr' ? `Prêt pour de nouvelles aventures ? (${getAgeGroup()})` :
                 currentLanguage === 'en' ? `Ready for new adventures? (${getAgeGroup()})` :
                 `Připraven na nová dobrodružství? (${getAgeGroup()})`}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Chip
                  icon={<TimerIcon />}
                  label={`${user.parentalControls.timeLimit} min/jour`}
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', mr: 1 }}
                />
                <Chip
                  icon={<StarIcon />}
                  label={`${t('ui.level')} ${t(`difficulty.${user.parentalControls.difficultyLevel}`)}`}
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              </Box>
            </Grid>
            <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
              {/* Language and Voice controls can be added here */}
              <IconButton
                onClick={() => setVoiceSettingsOpen(true)}
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                }}
                title={t('voice.settings')}
              >
                <SettingsIcon />
              </IconButton>
              {onBackToUserSelection && (
                <Button
                  variant="contained"
                  onClick={onBackToUserSelection}
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    fontSize: '0.8rem',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                  }}
                >
                  {currentLanguage === 'fr' ? '👤 Changer d\'utilisateur' :
                   currentLanguage === 'en' ? '👤 Switch user' :
                   '👤 Změnit uživatele'}
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </motion.div>

      {/* Matières disponibles */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Fredoka One", cursive',
              color: '#667eea',
            }}
          >
            {t('ui.chooseSubject')} 📚
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setSubjectManagerOpen(true)}
            sx={{
              color: '#667eea',
              borderColor: '#667eea',
              '&:hover': {
                borderColor: '#5a6fd8',
                bgcolor: 'rgba(102, 126, 234, 0.1)',
              }
            }}
          >
            {t('manageSubjects')}
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4, maxHeight: 'none' }}>
          {subjects
            .filter(subject => user.parentalControls.allowedSubjects.includes(subject.id))
            .map((subject, index) => (
              <Grid item xs={12} sm={6} md={3} key={subject.id}>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    sx={{
                      cursor: 'pointer',
                      borderRadius: 4,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        textAlign: 'center',
                        p: 3,
                        background: `linear-gradient(135deg, ${subject.color}20, ${subject.color}10)`,
                      }}
                    >
                      <Typography
                        variant="h2"
                        sx={{ fontSize: '4rem', mb: 2 }}
                      >
                        {subject.icon}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: '"Fredoka One", cursive',
                          color: subject.color,
                          mb: 2,
                        }}
                      >
                        {subject.name}
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<PlayIcon />}
                        onClick={() => {
                          // Ouvrir directement les activités interactives pour cette matière
                          setSelectedInteractiveSubject(subject.id);
                          setInteractiveManagerOpen(true);
                        }}
                        sx={{
                          bgcolor: subject.color,
                          '&:hover': {
                            bgcolor: subject.color,
                            filter: 'brightness(0.9)',
                          },
                        }}
                      >
                        {t('ui.play')}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
        </Grid>
      </motion.div>

      {/* Section Activités Interactives */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          }}
        >
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Fredoka One", cursive',
                  color: '#333',
                  mb: 1,
                }}
              >
                {t('specialInteractiveActivities')}
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2 }}>
                {t('interactiveActivitiesDescription')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="♻️ Écologie" size="small" sx={{ bgcolor: 'rgba(76,175,80,0.1)', color: '#4caf50' }} />
                <Chip label="🔢 Mathématiques" size="small" sx={{ bgcolor: 'rgba(33,150,243,0.1)', color: '#2196f3' }} />
                <Chip label="📖 Créativité" size="small" sx={{ bgcolor: 'rgba(156,39,176,0.1)', color: '#9c27b0' }} />
                <Chip label="🎵 Rythme" size="small" sx={{ bgcolor: 'rgba(255,152,0,0.1)', color: '#ff9800' }} />
              </Box>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  // Ouvrir directement les activités interactives
                  setInteractiveManagerOpen(true);
                }}
                sx={{
                  bgcolor: '#667eea',
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: 3,
                  '&:hover': {
                    bgcolor: '#5a6fd8',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {t('explore')}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>

      {/* Activités recommandées */}
      {activities.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Fredoka One", cursive',
              color: '#667eea',
              mb: 3,
            }}
          >
            {t('recommendedActivities')}
          </Typography>

          <Grid container spacing={3}>
            {activities.slice(0, 4).map((activity, index) => (
              <Grid item xs={12} sm={6} md={3} key={activity.id}>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card
                    sx={{
                      cursor: 'pointer',
                      borderRadius: 3,
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <SchoolIcon sx={{ color: '#667eea', mr: 1 }} />
                        <Chip
                          label={t(`difficulty.${activity.difficulty}`)}
                          size="small"
                          color={activity.difficulty === 'easy' ? 'success' : 'primary'}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          fontSize: '1rem',
                        }}
                      >
                        {activity.title?.[currentLanguage] || activity.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {activity.description?.[currentLanguage] || activity.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="caption" color="text.secondary">
                          <TimerIcon sx={{ fontSize: 14, mr: 0.5 }} />
                          {activity.estimatedTime} min
                        </Typography>
                        <Button 
                          size="small" 
                          variant="outlined"
                          onClick={() => {
                            // Naviguer vers l'activité spécifique
                            if (activity.subject) {
                              // Ouvrir les activités interactives pour cette matière
                              setSelectedInteractiveSubject(activity.subject);
                              setInteractiveManagerOpen(true);
                            } else {
                              // Fallback vers SubjectManager
                              setSubjectManagerOpen(true);
                            }
                          }}
                        >
                          {t('ui.play')}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      )}

      {/* Enriched Activities - Can be added here */}

      {/* Voice Settings Dialog */}
      <VoiceSettingsDialog
        open={voiceSettingsOpen}
        onClose={() => setVoiceSettingsOpen(false)}
        user={user}
        onSave={(voicePreferences) => {
          if (onUserUpdate) {
            onUserUpdate({
              ...user,
              voicePreferences,
            });
          }
        }}
      />

      {/* Subject Manager Dialog */}
      <SubjectManager
        open={subjectManagerOpen}
        onClose={() => setSubjectManagerOpen(false)}
        user={user}
        onSave={(allowedSubjects) => {
          if (onUserUpdate) {
            onUserUpdate({
              ...user,
              parentalControls: {
                ...user.parentalControls,
                allowedSubjects,
              }
            });
          }
        }}
      />

      {/* Interactive Activities Manager */}
      {interactiveManagerOpen && (
        <Box sx={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          bgcolor: 'background.default',
          zIndex: 1300,
          overflow: 'auto'
        }}>
          <UnifiedInteractiveManager
            userAge={user.age}
            subject={selectedInteractiveSubject}
            onActivityComplete={(activityId, score, timeSpent) => {
              console.log(`Activité ${activityId} terminée: ${score} points en ${timeSpent}s`);
              // Ici on pourrait sauvegarder les résultats de l'utilisateur
              setInteractiveManagerOpen(false);
              setSelectedInteractiveSubject(undefined);
            }}
            onBack={() => {
              setInteractiveManagerOpen(false);
              setSelectedInteractiveSubject(undefined);
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;