import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface InteractiveElement {
  id: string;
  type: 'button' | 'draggable' | 'clickable-shape' | 'input-field' | 'slider' | 'toggle';
  properties: {
    label?: string;
    color?: string;
    size?: 'small' | 'medium' | 'large';
    position?: { x: number; y: number };
    action?: string;
    value?: any;
  };
}

interface InteractiveActivity {
  id: string;
  title: { fr: string; en: string; cs: string };
  description: { fr: string; en: string; cs: string };
  type: 'drag-drop' | 'click-sequence' | 'form-interaction' | 'puzzle' | 'game';
  subject: 'math' | 'language' | 'science' | 'art' | 'computing' | 'civic' | 'hygiene' | 'anatomy';
  ageGroup: '3-5' | '6-8' | '9-12';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  status: 'active' | 'inactive' | 'testing';
  elements: InteractiveElement[];
  objectives: Array<{ fr: string; en: string; cs: string }>;
  instructions: { fr: string; en: string; cs: string };
  successCriteria: {
    minCorrect: number;
    timeLimit?: number;
    allowRetries: boolean;
  };
  interactions: {
    onStart?: string;
    onComplete?: string;
    onError?: string;
    hints?: Array<{ fr: string; en: string; cs: string }>;
  };
}

interface InteractiveActivityPlayerProps {
  activity: InteractiveActivity;
  onComplete: (score: number, timeSpent: number) => void;
  onBack: () => void;
}

export const InteractiveActivityPlayer: React.FC<InteractiveActivityPlayerProps> = ({
  activity,
  onComplete,
  onBack,
}) => {
  const { currentLanguage } = useLanguage();
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'completed'>('intro');
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [clickedElements, setClickedElements] = useState<string[]>([]);
  const [draggedElements, setDraggedElements] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const startActivity = () => {
    setGameState('playing');
    setTimeSpent(0);
    setScore(0);
    setCorrectAnswers(0);
    setClickedElements([]);
    setDraggedElements({});
  };

  const handleElementClick = (element: InteractiveElement) => {
    if (gameState !== 'playing') return;

    const newClickedElements = [...clickedElements, element.id];
    setClickedElements(newClickedElements);

    // Logique spécifique selon le type d'activité
    if (activity.type === 'click-sequence') {
      handleClickSequence(element, newClickedElements);
    } else {
      // Logique générale
      setCorrectAnswers(prev => prev + 1);
      checkCompletion(correctAnswers + 1);
    }
  };

  const handleClickSequence = (element: InteractiveElement, clickedList: string[]) => {
    // Pour une séquence de nombres, vérifier l'ordre
    if (activity.id === 'number-sequence-click') {
      const expectedOrder = ['num-1', 'num-2', 'num-3'];
      const currentIndex = clickedList.length - 1;
      
      if (expectedOrder[currentIndex] === element.id) {
        setCorrectAnswers(prev => prev + 1);
        setScore(prev => prev + 10);
        
        if (clickedList.length === expectedOrder.length) {
          completeActivity();
        }
      } else {
        // Mauvaise réponse
        if (activity.successCriteria.allowRetries) {
          setClickedElements([]);
          setShowHint(true);
        }
      }
    }
  };

  const handleDragEnd = (elementId: string, position: { x: number; y: number }) => {
    if (gameState !== 'playing') return;

    setDraggedElements(prev => ({
      ...prev,
      [elementId]: position
    }));

    // Vérifier si l'élément est dans la bonne zone (logique simplifiée)
    // Dans une vraie implémentation, on vérifierait les zones de dépôt
    setCorrectAnswers(prev => prev + 1);
    setScore(prev => prev + 15);
    checkCompletion(correctAnswers + 1);
  };

  const checkCompletion = (currentCorrect: number) => {
    if (currentCorrect >= activity.successCriteria.minCorrect) {
      completeActivity();
    }
  };

  const completeActivity = () => {
    setGameState('completed');
    onComplete(score, timeSpent);
  };

  const getSizeStyle = (size?: string) => {
    switch (size) {
      case 'small': return { width: 60, height: 60, fontSize: '0.8rem' };
      case 'large': return { width: 120, height: 120, fontSize: '1.2rem' };
      default: return { width: 80, height: 80, fontSize: '1rem' };
    }
  };

  const renderInteractiveElement = (element: InteractiveElement) => {
    const style = {
      position: 'absolute' as const,
      left: element.properties.position?.x || 0,
      top: element.properties.position?.y || 0,
      backgroundColor: element.properties.color || '#2196F3',
      color: 'white',
      border: 'none',
      borderRadius: element.type === 'clickable-shape' ? '8px' : '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      transition: 'all 0.2s ease',
      ...getSizeStyle(element.properties.size),
    };

    const isClicked = clickedElements.includes(element.id);
    const isDragged = draggedElements[element.id];

    if (element.type === 'button' || element.type === 'clickable-shape') {
      return (
        <motion.button
          key={element.id}
          style={{
            ...style,
            left: isDragged ? isDragged.x : style.left,
            top: isDragged ? isDragged.y : style.top,
            opacity: isClicked ? 0.7 : 1,
            transform: isClicked ? 'scale(0.9)' : 'scale(1)',
          }}
          onClick={() => handleElementClick(element)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isClicked ? { 
            backgroundColor: '#4CAF50',
            scale: [1, 1.2, 1]
          } : {}}
        >
          {element.properties.label}
        </motion.button>
      );
    }

    if (element.type === 'draggable') {
      return (
        <motion.div
          key={element.id}
          style={style}
          drag
          dragMomentum={false}
          onDragEnd={(event, info) => {
            handleDragEnd(element.id, { x: info.point.x, y: info.point.y });
          }}
          whileDrag={{ scale: 1.1, zIndex: 10 }}
        >
          {element.properties.label}
        </motion.div>
      );
    }

    return null;
  };

  if (gameState === 'intro') {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2, color: '#667eea' }}>
          {activity.title[currentLanguage]}
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          {activity.description[currentLanguage]}
        </Typography>

        <Paper sx={{ p: 3, mb: 3, bgcolor: '#f5f5f5' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            📋 Instructions:
          </Typography>
          <Typography variant="body1">
            {activity.instructions[currentLanguage]}
          </Typography>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="outlined" onClick={onBack}>
            ← Retour
          </Button>
          <Button 
            variant="contained" 
            onClick={startActivity}
            sx={{ bgcolor: '#667eea' }}
          >
            🚀 Commencer !
          </Button>
        </Box>
      </Box>
    );
  }

  if (gameState === 'playing') {
    return (
      <Box sx={{ p: 2, height: '100vh', position: 'relative' }}>
        {/* Header avec infos */}
        <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {activity.title[currentLanguage]}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography variant="body2">
              ⭐ Score: {score}
            </Typography>
            <Typography variant="body2">
              ⏱️ Temps: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
            </Typography>
            <Button variant="outlined" size="small" onClick={onBack}>
              Quitter
            </Button>
          </Box>
        </Paper>

        {/* Barre de progression */}
        <LinearProgress 
          variant="determinate" 
          value={(correctAnswers / activity.successCriteria.minCorrect) * 100}
          sx={{ mb: 2 }}
        />

        {/* Zone de jeu */}
        <Paper 
          sx={{ 
            position: 'relative',
            height: '70vh',
            bgcolor: '#f8f9fa',
            overflow: 'hidden'
          }}
        >
          <AnimatePresence>
            {activity.elements.map(element => renderInteractiveElement(element))}
          </AnimatePresence>
        </Paper>

        {/* Bouton d'aide */}
        {activity.interactions.hints && activity.interactions.hints.length > 0 && (
          <Button
            variant="outlined"
            onClick={() => setShowHint(true)}
            sx={{ position: 'absolute', bottom: 20, left: 20 }}
          >
            💡 Aide
          </Button>
        )}

        {/* Dialog d'aide */}
        <Dialog open={showHint} onClose={() => setShowHint(false)}>
          <DialogTitle>💡 Indice</DialogTitle>
          <DialogContent>
            <Typography>
              {activity.interactions.hints?.[currentHintIndex]?.[currentLanguage]}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowHint(false)}>
              Compris !
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

  if (gameState === 'completed') {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            🎉
          </Typography>
          <Typography variant="h4" sx={{ mb: 2, color: '#4CAF50' }}>
            Bravo !
          </Typography>
        </motion.div>

        <Typography variant="h6" sx={{ mb: 3 }}>
          {activity.interactions.onComplete || 'Activité terminée avec succès !'}
        </Typography>

        <Card sx={{ maxWidth: 400, mx: 'auto', mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              📊 Résultats
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Score:</Typography>
              <Typography fontWeight="bold">⭐ {score} points</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Temps:</Typography>
              <Typography fontWeight="bold">
                ⏱️ {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Bonnes réponses:</Typography>
              <Typography fontWeight="bold">✅ {correctAnswers}/{activity.successCriteria.minCorrect}</Typography>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="outlined" onClick={onBack}>
            ← Retour
          </Button>
          <Button 
            variant="contained" 
            onClick={startActivity}
            sx={{ bgcolor: '#667eea' }}
          >
            🔄 Rejouer
          </Button>
        </Box>
      </Box>
    );
  }

  return null;
};

export default InteractiveActivityPlayer;