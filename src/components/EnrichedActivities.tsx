import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Star as StarIcon,
  Timer as TimerIcon,
  School as SchoolIcon,
  Close as CloseIcon,
  EmojiEvents as TrophyIcon,
  Lightbulb as HintIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../utils/translations';
import { getEnrichedContent } from '../utils/educationalContent';
import { EducationalContent } from '../utils/educationalContent';
import { User } from '../App';
import ScrollableContainer from './ScrollableContainer';

interface EnrichedActivitiesProps {
  user: User;
  onActivitySelect: (activityId: string) => void;
}

export const EnrichedActivities: React.FC<EnrichedActivitiesProps> = ({
  user,
  onActivitySelect,
}) => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  const [enrichedActivities, setEnrichedActivities] = useState<EducationalContent[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<EducationalContent | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    loadEnrichedActivities();
  }, [user]);

  const loadEnrichedActivities = async () => {
    try {
      const content = await getEnrichedContent();
      const userAgeGroup = user.age <= 5 ? '3-5' : user.age <= 8 ? '6-8' : '9-12';
      const filteredContent = content.filter(activity => 
        activity.ageGroup === userAgeGroup &&
        user.parentalControls.allowedSubjects.includes(activity.subject)
      );
      setEnrichedActivities(filteredContent);
    } catch (error) {
      console.error('Erreur lors du chargement des activités enrichies:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#f44336';
      default: return '#2196F3';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'interactive': return '🎮';
      case 'drawing': return '🎨';
      case 'music': return '🎵';
      case 'creative': return '✨';
      case 'simulation': return '🔬';
      default: return '📚';
    }
  };

  const openActivityDetails = (activity: EducationalContent) => {
    setSelectedActivity(activity);
    setDetailsOpen(true);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Fredoka One", cursive',
          color: '#667eea',
          mb: 3,
          textAlign: 'center',
        }}
      >
        🎓 Activités Disponibles
      </Typography>

      <ScrollableContainer maxHeight="80vh" showScrollToTop={true}>

      <Grid container spacing={3}>
        {enrichedActivities.map((activity, index) => (
          <Grid item xs={12} sm={6} md={4} key={activity.id}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                sx={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'visible',
                }}
                onClick={() => openActivityDetails(activity)}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    fontSize: '2rem',
                    zIndex: 1,
                  }}
                >
                  {getTypeIcon(activity.type)}
                </Box>

                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip
                      label={activity.subject}
                      size="small"
                      sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                    />
                    <Chip
                      label={activity.difficulty}
                      size="small"
                      sx={{ 
                        bgcolor: getDifficultyColor(activity.difficulty),
                        color: 'white' 
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Fredoka One", cursive',
                      mb: 1,
                      minHeight: 50,
                    }}
                  >
                    {activity.title[currentLanguage]}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ 
                      mb: 2, 
                      opacity: 0.9,
                      minHeight: 40,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {activity.description[currentLanguage]}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <TimerIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption">
                      {activity.estimatedTime} min
                    </Typography>
                    {activity.rewards && (
                      <>
                        <StarIcon sx={{ fontSize: 16, ml: 1 }} />
                        <Typography variant="caption">
                          {activity.rewards.stars} ⭐
                        </Typography>
                      </>
                    )}
                  </Box>

                  {activity.tags && (
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {activity.tags.slice(0, 2).map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{ 
                            fontSize: '0.6rem',
                            height: 20,
                            bgcolor: 'rgba(255,255,255,0.15)',
                            color: 'white' 
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Dialog des détails d'activité */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedActivity && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ fontFamily: '"Fredoka One", cursive' }}>
                  {getTypeIcon(selectedActivity.type)} {selectedActivity.title[currentLanguage]}
                </Typography>
                <IconButton onClick={() => setDetailsOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedActivity.description[currentLanguage]}
              </Typography>

              <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <SchoolIcon sx={{ mr: 1 }} /> Objectifs pédagogiques
              </Typography>
              <List dense>
                {selectedActivity.objectives.map((objective, idx) => (
                  <ListItem key={idx}>
                    <ListItemIcon>
                      <TrophyIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={objective[currentLanguage]} />
                  </ListItem>
                ))}
              </List>

              {selectedActivity.hints && selectedActivity.hints.length > 0 && (
                <>
                  <Typography variant="h6" sx={{ mb: 1, mt: 2, display: 'flex', alignItems: 'center' }}>
                    <HintIcon sx={{ mr: 1 }} /> Conseils
                  </Typography>
                  <List dense>
                    {selectedActivity.hints.map((hint, idx) => (
                      <ListItem key={idx}>
                        <ListItemText primary={hint[currentLanguage]} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {selectedActivity.rewards && (
                <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>Récompenses :</Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Chip label={`${selectedActivity.rewards.points} points`} color="primary" />
                    <Chip label={`${selectedActivity.rewards.stars} étoiles`} color="secondary" />
                  </Box>
                </Box>
              )}
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setDetailsOpen(false)}>
                Fermer
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  onActivitySelect(selectedActivity.id);
                  setDetailsOpen(false);
                }}
              >
                Commencer l'activité
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      </ScrollableContainer>
    </Box>
  );
};