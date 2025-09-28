import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  LinearProgress,
  Chip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface EcoSortingGameProps {
  items: Array<{
    id: string;
    name: { fr: string; en: string; cs: string };
    category: string;
    emoji: string;
  }>;
  bins: Array<{
    id: string;
    name: { fr: string; en: string; cs: string };
    color: string;
    emoji: string;
  }>;
  onComplete: (score: number) => void;
}

export const EcoSortingGame: React.FC<EcoSortingGameProps> = ({
  items,
  bins,
  onComplete,
}) => {
  const { currentLanguage } = useLanguage();
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [sortedItems, setSortedItems] = useState<{ [key: string]: string[] }>({});
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [correctItems, setCorrectItems] = useState<Set<string>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);

  // Initialiser les bacs vides
  useEffect(() => {
    const initialBins: { [key: string]: string[] } = {};
    bins.forEach(bin => {
      initialBins[bin.id] = [];
    });
    setSortedItems(initialBins);
  }, [bins]);

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId);
  };

  const handleDrop = (binId: string) => {
    if (!draggedItem) return;

    const item = items.find(i => i.id === draggedItem);
    if (!item) return;

    // Vérifier si l'item est déjà dans un bac
    const currentBin = Object.keys(sortedItems).find(binKey =>
      sortedItems[binKey].includes(draggedItem)
    );

    // Retirer l'item de son bac actuel s'il y en a un
    if (currentBin) {
      setSortedItems(prev => ({
        ...prev,
        [currentBin]: prev[currentBin].filter(id => id !== draggedItem)
      }));
    }

    // Ajouter l'item au nouveau bac
    setSortedItems(prev => ({
      ...prev,
      [binId]: [...prev[binId], draggedItem]
    }));

    // Vérifier si c'est correct
    const isCorrect = item.category === binId;
    setAttempts(prev => prev + 1);

    if (isCorrect) {
      setScore(prev => prev + 10);
      setCorrectItems(prev => new Set(Array.from(prev).concat(draggedItem)));
      setFeedback('Excellent ! 🎉✨');
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1000);
    } else {
      setFeedback('Presque ! Essaie encore ! 💪🌟');
    }

    setTimeout(() => setFeedback(''), 3000);
    setDraggedItem(null);

    // Vérifier si le jeu est terminé
    const totalSorted = Object.values(sortedItems).flat().length + 1; // +1 pour l'item qu'on vient d'ajouter
    if (totalSorted >= items.length) {
      setTimeout(() => {
        setCompleted(true);
        const finalScore = Math.max(0, 100 - (attempts - items.length) * 10);
        onComplete(finalScore);
      }, 1000);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const remainingItems = items.filter(item =>
    !Object.values(sortedItems).flat().includes(item.id)
  );

  const progress = ((items.length - remainingItems.length) / items.length) * 100;

  if (completed) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={4} sx={{ p: 4, textAlign: 'center', bgcolor: '#e8f5e8' }}>
          <Typography variant="h4" sx={{ mb: 2, color: '#4caf50' }}>
            🌟 Bravo ! 🌟
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Tu as bien trié tous les déchets !
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Score: {score} points sur {items.length * 10}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Chip label="🌱 Ami de la Nature" color="success" />
            <Chip label="♻️ Expert Recyclage" color="primary" />
          </Box>
        </Paper>
      </motion.div>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* Barre de progression */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Progression: {Math.round(progress)}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            bgcolor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
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
              severity={feedback.includes('Excellent') ? 'success' : 'info'}
              sx={{ mb: 2 }}
            >
              {feedback}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Grid container spacing={3}>
        {/* Zone des objets à trier */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            📦 Objets à trier
          </Typography>
          <Box
            sx={{
              minHeight: 300,
              border: '2px dashed #ccc',
              borderRadius: 2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {remainingItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  transition: { duration: 0.2 }
                }}
                whileDrag={{ 
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: '0 15px 35px rgba(0,0,0,0.25)',
                  zIndex: 1000
                }}
                drag
                dragSnapToOrigin
                onDragStart={() => handleDragStart(item.id)}
                dragElastic={0.2}
              >
                <Card
                  sx={{
                    cursor: 'grab',
                    bgcolor: correctItems.has(item.id) ? '#e8f5e8' : '#f5f5f5',
                    border: correctItems.has(item.id) ? '2px solid #4caf50' : '2px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: correctItems.has(item.id) ? '#d4edda' : '#e0e0e0',
                      transform: 'translateY(-2px)',
                    },
                    '&:active': {
                      cursor: 'grabbing',
                    }
                  }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <motion.div
                        animate={showCelebration && correctItems.has(item.id) ? { 
                          scale: [1, 1.3, 1],
                          rotate: [0, 10, -10, 0]
                        } : {}}
                        transition={{ duration: 0.6 }}
                      >
                        <Typography variant="h4" sx={{ fontSize: '2rem' }}>
                          {item.emoji}
                        </Typography>
                      </motion.div>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {item.name[currentLanguage]}
                      </Typography>
                      {correctItems.has(item.id) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Typography variant="h6" sx={{ color: '#4caf50' }}>
                            ✅
                          </Typography>
                        </motion.div>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Grid>

        {/* Bacs de tri */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            🗑️ Bacs de tri
          </Typography>
          <Grid container spacing={2}>
            {bins.map((bin, index) => (
              <Grid item xs={12} sm={6} md={4} key={bin.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: draggedItem && items.find(i => i.id === draggedItem)?.category === bin.id ? 1.05 : 1,
                    boxShadow: draggedItem && items.find(i => i.id === draggedItem)?.category === bin.id 
                      ? '0 15px 40px rgba(76, 175, 80, 0.4)' 
                      : '0 5px 20px rgba(0,0,0,0.1)'
                  }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                  }}
                >
                  <Paper
                    sx={{
                      minHeight: 180,
                      p: 3,
                      bgcolor: bin.color,
                      color: 'white',
                      textAlign: 'center',
                      border: draggedItem && items.find(i => i.id === draggedItem)?.category === bin.id
                        ? '4px solid #fff'
                        : '2px solid rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      borderRadius: 3,
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': draggedItem && items.find(i => i.id === draggedItem)?.category === bin.id ? {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3))',
                        animation: 'pulse 1s infinite'
                      } : {}
                    }}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(bin.id)}
                  >
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {bin.emoji}
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {bin.name[currentLanguage]}
                    </Typography>

                    {/* Objets dans ce bac */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      {sortedItems[bin.id]?.map((itemId) => {
                        const item = items.find(i => i.id === itemId);
                        return item ? (
                          <Chip
                            key={itemId}
                            label={`${item.emoji} ${item.name[currentLanguage]}`}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(255,255,255,0.2)',
                              color: 'white',
                            }}
                          />
                        ) : null;
                      })}
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Score actuel */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="h6">
          Score actuel: {score} points
        </Typography>
      </Box>
    </Box>
  );
};