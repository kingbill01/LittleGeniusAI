import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Fab,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayArrow, VolumeUp } from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

interface StoryChoice {
  id: string;
  text: { fr: string; en: string; cs: string };
  emoji: string;
}

interface StoryStep {
  id: string;
  title: { fr: string; en: string; cs: string };
  choices: StoryChoice[];
}

interface StoryBuilderGameProps {
  theme: { fr: string; en: string; cs: string };
  steps: StoryStep[];
  onComplete: (story: string[], score: number) => void;
}

export const StoryBuilderGame: React.FC<StoryBuilderGameProps> = ({
  theme,
  steps,
  onComplete,
}) => {
  const { currentLanguage } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<{ [key: number]: StoryChoice }>({});
  const [isComplete, setIsComplete] = useState(false);
  const [finalStory, setFinalStory] = useState<string[]>([]);
  const [showStory, setShowStory] = useState(false);

  const handleChoiceSelect = (choice: StoryChoice) => {
    setSelectedChoices(prev => ({
      ...prev,
      [currentStep]: choice
    }));

    // Passer à l'étape suivante automatiquement après une courte pause
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        completeStory();
      }
    }, 500);
  };

  const completeStory = () => {
    const story = steps.map((step, index) => {
      const choice = selectedChoices[index];
      return choice ? choice.text[currentLanguage] : '';
    }).filter(text => text !== '');

    setFinalStory(story);
    setIsComplete(true);
    
    // Calculer le score basé sur la créativité (nombre d'étapes complétées)
    const score = Math.min(100, story.length * 20);
    setTimeout(() => onComplete(story, score), 1000);
  };

  const readStoryAloud = () => {
    const fullStory = finalStory.join('. ');
    // Utilisation directe de l'API Web Speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(fullStory);
      utterance.lang = currentLanguage === 'fr' ? 'fr-FR' : currentLanguage === 'en' ? 'en-US' : 'cs-CZ';
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  const restartStory = () => {
    setCurrentStep(0);
    setSelectedChoices({});
    setIsComplete(false);
    setFinalStory([]);
    setShowStory(false);
  };

  if (isComplete && showStory) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={4} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
          <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', color: '#6a4c93' }}>
            📖 Ton Histoire
          </Typography>
          
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              mb: 3, 
              bgcolor: '#f8f5ff',
              border: '2px solid #e1bee7',
              borderRadius: 3
            }}
          >
            {finalStory.map((sentence, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 2, 
                    fontSize: '1.2rem',
                    lineHeight: 1.8,
                    '&:first-letter': {
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      color: '#6a4c93'
                    }
                  }}
                >
                  {sentence}{index < finalStory.length - 1 ? '. ' : '.'}
                </Typography>
              </motion.div>
            ))}
          </Paper>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<VolumeUp />}
              onClick={readStoryAloud}
              sx={{ 
                bgcolor: '#6a4c93',
                '&:hover': { bgcolor: '#5a3c83' }
              }}
            >
              Écouter l'histoire
            </Button>
            <Button
              variant="outlined"
              onClick={restartStory}
              sx={{ borderColor: '#6a4c93', color: '#6a4c93' }}
            >
              Créer une nouvelle histoire
            </Button>
          </Box>

          <Box sx={{ mt: 3, display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Chip label="✍️ Auteur Créatif" color="primary" />
            <Chip label="📚 Conteur" color="secondary" />
            <Chip label="🌟 Imaginatif" color="success" />
          </Box>
        </Paper>
      </motion.div>
    );
  }

  if (isComplete && !showStory) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={4} sx={{ p: 4, textAlign: 'center', bgcolor: '#f3e5f5' }}>
          <Typography variant="h4" sx={{ mb: 2, color: '#6a4c93' }}>
            🎉 Bravo ! 🎉
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Tu as créé une histoire fantastique !
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Ton imagination est extraordinaire ! 🌟
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => setShowStory(true)}
            sx={{ 
              bgcolor: '#6a4c93',
              '&:hover': { bgcolor: '#5a3c83' }
            }}
          >
            Lire mon histoire
          </Button>
        </Paper>
      </motion.div>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      {/* En-tête avec thème */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: '#f8f5ff' }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', color: '#6a4c93' }}>
          📝 Constructeur d'Histoires
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#333' }}>
          Thème: {theme[currentLanguage]}
        </Typography>
      </Paper>

      {/* Indicateur de progression */}
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={step.id}>
              <StepLabel>
                <Typography variant="caption">
                  {step.title[currentLanguage]}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Étape actuelle */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', color: '#6a4c93' }}>
            {steps[currentStep]?.title[currentLanguage]}
          </Typography>

          <Grid container spacing={2}>
            {steps[currentStep]?.choices.map((choice, index) => (
              <Grid item xs={12} sm={6} md={4} key={choice.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      cursor: 'pointer',
                      height: '100%',
                      border: selectedChoices[currentStep]?.id === choice.id
                        ? '3px solid #6a4c93'
                        : '2px solid transparent',
                      bgcolor: selectedChoices[currentStep]?.id === choice.id
                        ? '#f3e5f5'
                        : '#ffffff',
                      '&:hover': {
                        bgcolor: '#f8f5ff',
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                      },
                      transition: 'all 0.2s ease-in-out'
                    }}
                    onClick={() => handleChoiceSelect(choice)}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Typography variant="h3" sx={{ mb: 2 }}>
                        {choice.emoji}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        {choice.text[currentLanguage]}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </motion.div>

      {/* Récapitulatif des choix précédents */}
      {currentStep > 0 && (
        <Paper elevation={1} sx={{ p: 3, bgcolor: '#fafafa' }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#6a4c93' }}>
            📋 Histoire en cours...
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {Object.entries(selectedChoices)
              .filter(([stepIndex]) => parseInt(stepIndex) < currentStep)
              .map(([stepIndex, choice]) => (
                <Chip
                  key={stepIndex}
                  label={`${choice.emoji} ${choice.text[currentLanguage]}`}
                  variant="outlined"
                  sx={{ bgcolor: '#e8f5e8' }}
                />
              ))}
          </Box>
        </Paper>
      )}

      {/* Boutons de navigation (optionnels) */}
      {currentStep > 0 && !isComplete && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => setCurrentStep(prev => prev - 1)}
            sx={{ borderColor: '#6a4c93', color: '#6a4c93' }}
          >
            Retour
          </Button>
        </Box>
      )}
    </Box>
  );
};