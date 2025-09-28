import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Grid,
  Paper,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Star as StarIcon,
  Timer as TimerIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation, translations } from '../utils/translations';
import { speechService } from '../utils/speechService';
import { EducationalContent, getContentByAgeAndSubject } from '../utils/educationalContent';
import { GenericActivityRenderer } from './GenericActivityRenderer';
import { User } from '../App';

interface EducationalActivityProps {
  user: User;
  subject: 'math' | 'language' | 'science' | 'art' | 'computing' | 'civic' | 'hygiene' | 'anatomy';
  onComplete: (score: number, timeSpent: number) => void;
  onExit: () => void;
}

const EducationalActivity: React.FC<EducationalActivityProps> = ({
  user,
  subject,
  onComplete,
  onExit,
}) => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  
  const [activities, setActivities] = useState<EducationalContent[]>([]);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    // Charger les activités appropriées
    const ageGroup = user.age <= 5 ? '3-5' : user.age <= 8 ? '6-8' : '9-12';
    const content = getContentByAgeAndSubject(ageGroup as any, subject, currentLanguage);
    setActivities(content.slice(0, 5)); // Limiter à 5 activités
  }, [user.age, subject, currentLanguage]);

  // Déterminer l'activité courante et progression (placé ici avant les effets qui l'utilisent)
  const currentActivity = activities[currentActivityIndex];
  const progress = activities.length > 0 ? ((currentActivityIndex + 1) / activities.length) * 100 : 0;

  // Lecture audio automatique des consignes lors du changement d'activité
  useEffect(() => {
    if (!user.voicePreferences?.enabled) return;
    const instr = currentActivity?.instructions?.[currentLanguage];
    if (instr) {
      speechService.speak({
        text: instr,
        language: currentLanguage,
        voiceId: user.voicePreferences.voiceId,
        interrupt: true
      });
    }
  }, [currentActivityIndex, currentActivity, currentLanguage, user.voicePreferences]);

  useEffect(() => {
    // Timer
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Déjà répondu

    setSelectedAnswer(answerIndex);
    
    // Vérifier la réponse selon le type d'activité
    let correct = false;
    if (currentActivity?.content?.exercises?.[0]) {
      correct = answerIndex === currentActivity.content.exercises[0].answer;
    } else if (currentActivity?.content?.problems?.[0]) {
      correct = answerIndex === currentActivity.content.problems[0].answer;
    }

    setIsCorrect(correct);
    if (correct) {
      setScore(score + 100);
    }

    // Passer à la question suivante après 2 secondes
    setTimeout(() => {
      if (currentActivityIndex < activities.length - 1) {
        setCurrentActivityIndex(currentActivityIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResults(true);
      }
    }, 2000);
  };

  const handleComplete = () => {
    onComplete(score, timeSpent);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (activities.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <LinearProgress sx={{ width: 300 }} />
      </Box>
    );
  }

  if (showResults) {
    const finalScore = Math.round((score / (activities.length * 100)) * 100);
    
    return (
      <Dialog open={true} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', bgcolor: '#667eea', color: 'white' }}>
          <Typography variant="h4" sx={{ fontFamily: '"Fredoka One", cursive' }}>
            🎉 {t('ui.congratulations')} !
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', p: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h2" sx={{ color: '#667eea', mb: 2 }}>
              {finalScore}%
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  sx={{
                    fontSize: '2rem',
                    color: i < Math.floor(finalScore / 20) ? '#FFD700' : '#ddd',
                  }}
                />
              ))}
            </Box>
          </Box>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <Paper elevation={1} sx={{ p: 2, bgcolor: '#f0f4ff' }}>
                <Typography variant="h6" color="primary">
                  {score}
                </Typography>
                <Typography variant="body2">
                  {t('ui.score')}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={1} sx={{ p: 2, bgcolor: '#f0f4ff' }}>
                <Typography variant="h6" color="primary">
                  {formatTime(timeSpent)}
                </Typography>
                <Typography variant="body2">
                  {t('ui.time')}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Typography variant="body1" sx={{ mb: 2 }}>
            {finalScore >= 80 
              ? translations.ai.congratulations[0][currentLanguage]
              : finalScore >= 60 
              ? translations.ai.encouragement[0][currentLanguage]
              : translations.ai.encouragement[1][currentLanguage]
            }
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleComplete}
            sx={{ mr: 2 }}
          >
            {t('ui.finish')}
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={onExit}
          >
            {t('ui.back')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f8f9ff',
        p: 3,
        overflowY: 'auto',
        maxHeight: '100vh',
      }}
    >
      {/* Header avec progression */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" sx={{ fontFamily: '"Fredoka One", cursive' }}>
            {currentActivity?.title[currentLanguage]}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              icon={<TimerIcon />}
              label={formatTime(timeSpent)}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
            <Chip
              label={`${score} pts`}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: 'rgba(255,255,255,0.2)',
            '& .MuiLinearProgress-bar': {
              bgcolor: 'white',
            },
          }}
        />
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
          Question {currentActivityIndex + 1} sur {activities.length}
        </Typography>
      </Paper>

      {/* Contenu de l'activité */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentActivityIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            sx={{
              maxWidth: 800,
              mx: 'auto',
              borderRadius: 4,
              overflow: 'visible',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Fredoka One", cursive',
                  color: '#667eea',
                  mb: 3,
                  textAlign: 'center',
                }}
              >
                {currentActivity?.description[currentLanguage]}
              </Typography>

              <Typography
                variant="body1"
                sx={{ mb: 4, fontSize: '1.1rem', textAlign: 'center' }}
              >
                {currentActivity?.instructions[currentLanguage]}
              </Typography>

              {/* Generic Activity Renderer */}
              <GenericActivityRenderer
                activity={currentActivity}
                onAnswer={handleAnswer}
                selectedAnswer={selectedAnswer}
                isCorrect={isCorrect}
                disabled={selectedAnswer !== null}
              />

              {/* Feedback */}
              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      borderRadius: 3,
                      bgcolor: isCorrect ? '#E8F5E8' : '#FFEBEE',
                      border: `2px solid ${isCorrect ? '#4CAF50' : '#f44336'}`,
                      textAlign: 'center',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                      {isCorrect ? (
                        <CheckIcon sx={{ fontSize: '3rem', color: '#4CAF50', mr: 1 }} />
                      ) : (
                        <CancelIcon sx={{ fontSize: '3rem', color: '#f44336', mr: 1 }} />
                      )}
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: '"Fredoka One", cursive',
                          color: isCorrect ? '#4CAF50' : '#f44336',
                        }}
                      >
                        {isCorrect ? 'Bravo !' : 'Oups !'}
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      {isCorrect 
                        ? translations.ai.congratulations[0][currentLanguage]
                        : translations.ai.encouragement[0][currentLanguage]
                      }
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Bouton de sortie */}
      <Box sx={{ position: 'fixed', top: 20, right: 20 }}>
        <Button
          variant="outlined"
          onClick={onExit}
          sx={{
            bgcolor: 'white',
            '&:hover': {
              bgcolor: '#f5f5f5',
            },
          }}
        >
          {t('ui.back')}
        </Button>
      </Box>
    </Box>
  );
};

export default EducationalActivity;