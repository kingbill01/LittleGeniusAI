import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
  Chip,
  LinearProgress,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface NumberSequenceGameProps {
  sequence: number[];
  rule: { fr: string; en: string; cs: string };
  hint: { fr: string; en: string; cs: string };
  onComplete: (score: number) => void;
}

export const NumberSequenceGame: React.FC<NumberSequenceGameProps> = ({
  sequence,
  rule,
  hint,
  onComplete,
}) => {
  const { currentLanguage } = useLanguage();
  const [userInputs, setUserInputs] = useState<{ [key: number]: string }>({});
  const [feedback, setFeedback] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Créer la séquence avec des trous (remplacer certains nombres par des blancs)
  const [sequenceWithBlanks, setSequenceWithBlanks] = useState<Array<number | null>>([]);
  const [blanksIndices, setBlanksIndices] = useState<number[]>([]);

  useEffect(() => {
    // Créer des trous dans la séquence (environ 30% des éléments)
    const numBlanks = Math.ceil(sequence.length * 0.3);
    const indices: number[] = [];
    
    // Sélectionner des indices aléatoires pour les trous
    while (indices.length < numBlanks) {
      const randomIndex = Math.floor(Math.random() * sequence.length);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    
    setBlanksIndices(indices);
    
    // Créer la séquence avec des trous
    const sequenceWithHoles = sequence.map((num, index) =>
      indices.includes(index) ? null : num
    );
    
    setSequenceWithBlanks(sequenceWithHoles);
  }, [sequence]);

  const handleInputChange = (index: number, value: string) => {
    setUserInputs(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const checkAnswer = () => {
    let correctAnswers = 0;
    const totalBlanks = blanksIndices.length;
    
    blanksIndices.forEach(index => {
      const userAnswer = parseInt(userInputs[index] || '');
      const correctAnswer = sequence[index];
      
      if (userAnswer === correctAnswer) {
        correctAnswers++;
      }
    });
    
    setAttempts(prev => prev + 1);
    
    if (correctAnswers === totalBlanks) {
      const finalScore = Math.max(50, 100 - (attempts * 10));
      setScore(finalScore);
      setFeedback('🎉 Parfait ! Tu as trouvé toute la séquence !');
      setCompleted(true);
      setTimeout(() => onComplete(finalScore), 2000);
    } else {
      const percentage = Math.round((correctAnswers / totalBlanks) * 100);
      if (percentage >= 70) {
        setFeedback(`✨ Très bien ! ${percentage}% correct ! Continue !`);
      } else if (percentage >= 50) {
        setFeedback(`👍 Pas mal ! ${percentage}% correct. Tu peux mieux faire !`);
      } else {
        setFeedback(`💪 Continue tes efforts ! ${percentage}% correct.`);
      }
      
      if (attempts >= 2 && !showHint) {
        setShowHint(true);
      }
    }
    
    setTimeout(() => setFeedback(''), 3000);
  };

  const resetGame = () => {
    setUserInputs({});
    setAttempts(0);
    setShowHint(false);
    setFeedback('');
    setCompleted(false);
    setScore(0);
  };

  const progress = blanksIndices.length > 0 
    ? (blanksIndices.filter(index => userInputs[index] && parseInt(userInputs[index]) === sequence[index]).length / blanksIndices.length) * 100
    : 0;

  if (completed) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={4} sx={{ p: 4, textAlign: 'center', bgcolor: '#e8f5e8' }}>
          <Typography variant="h4" sx={{ mb: 2, color: '#4caf50' }}>
            🎯 Excellent travail ! 🎯
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Tu maîtrises les séquences numériques !
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Score: {score} points
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Chip label="🧮 Expert en Nombres" color="primary" />
            <Chip label="🔢 Détective de Séquences" color="success" />
            {attempts === 1 && <Chip label="⭐ Première Tentative !" color="warning" />}
          </Box>
          <Button 
            variant="outlined" 
            onClick={resetGame}
            sx={{ mt: 2 }}
          >
            Recommencer
          </Button>
        </Paper>
      </motion.div>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Titre et règle */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: '#f8f9fa' }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#1976d2' }}>
          🔢 Séquence Numérique
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
          <strong>Règle:</strong> {rule[currentLanguage]}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
          Complète les cases vides pour découvrir la séquence !
        </Typography>
      </Paper>

      {/* Barre de progression */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
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
            }
          }}
        />
      </Box>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert
              severity={feedback.includes('🎉') ? 'success' : 'info'}
              sx={{ mb: 2 }}
            >
              {feedback}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indice */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="body2">
                💡 <strong>Indice:</strong> {hint[currentLanguage]}
              </Typography>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Séquence */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: '#ffffff' }}>
        <Grid container spacing={2} justifyContent="center">
          {sequenceWithBlanks.map((value, index) => (
            <Grid item key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {value !== null ? (
                  <Paper
                    elevation={2}
                    sx={{
                      width: 80,
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: '#e3f2fd',
                      border: '2px solid #2196f3',
                    }}
                  >
                    <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                      {value}
                    </Typography>
                  </Paper>
                ) : (
                  <TextField
                    type="number"
                    value={userInputs[index] || ''}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    sx={{
                      width: 80,
                      '& .MuiOutlinedInput-root': {
                        height: 80,
                        borderRadius: 2,
                        border: userInputs[index] && parseInt(userInputs[index]) === sequence[index]
                          ? '2px solid #4caf50'
                          : '2px solid #ff9800',
                        '& input': {
                          textAlign: 'center',
                          fontSize: '1.25rem',
                          fontWeight: 'bold',
                        }
                      }
                    }}
                    inputProps={{
                      min: -1000,
                      max: 1000,
                      step: 1,
                    }}
                  />
                )}
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Boutons d'action */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={checkAnswer}
          disabled={blanksIndices.some(index => !userInputs[index])}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            bgcolor: '#4caf50',
            '&:hover': {
              bgcolor: '#45a049',
            }
          }}
        >
          Vérifier
        </Button>

        {!showHint && attempts >= 1 && (
          <Button
            variant="outlined"
            onClick={() => setShowHint(true)}
            sx={{ px: 3, py: 1.5 }}
          >
            💡 Indice
          </Button>
        )}

        <Button
          variant="outlined"
          onClick={resetGame}
          sx={{ px: 3, py: 1.5 }}
        >
          Recommencer
        </Button>
      </Box>

      {/* Statistiques */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          Tentatives: {attempts} | Cases complétées: {blanksIndices.filter(index => userInputs[index] && parseInt(userInputs[index]) === sequence[index]).length}/{blanksIndices.length}
        </Typography>
      </Box>
    </Box>
  );
};