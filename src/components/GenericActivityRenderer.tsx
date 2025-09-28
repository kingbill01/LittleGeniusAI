import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { EducationalContent } from '../utils/educationalContent';
import { EnrichedActivityRenderer } from './EnrichedActivityRenderer';
import ScrollableContainer from './ScrollableContainer';

interface GenericActivityRendererProps {
  activity: EducationalContent;
  onAnswer: (answer: any) => void;
  selectedAnswer: any;
  isCorrect: boolean | null;
  disabled: boolean;
}

export const GenericActivityRenderer: React.FC<GenericActivityRendererProps> = ({
  activity,
  onAnswer,
  selectedAnswer,
  isCorrect,
  disabled,
}) => {
  const { currentLanguage } = useLanguage();
  const [textAnswer, setTextAnswer] = useState('');
  const [draggedItems, setDraggedItems] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<{[key: string]: string}>({});

  const renderMathActivity = () => {
    if (activity.content?.exercises) {
      const exercise = activity.content.exercises[0];
      
      // Pour les activités avec objets visuels (comptage)
      if (exercise.objects) {
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ mb: 3, fontSize: '4rem' }}>
              {exercise.objects}
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              {exercise.question[currentLanguage]}
            </Typography>
            
            <Grid container spacing={2} justifyContent="center">
              {[1, 2, 3, 4, 5].map((num) => (
                <Grid item key={num}>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={selectedAnswer === num ? 'contained' : 'outlined'}
                      size="large"
                      onClick={() => onAnswer(num)}
                      disabled={disabled}
                      sx={{
                        width: 80,
                        height: 80,
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        borderRadius: '50%',
                        bgcolor: selectedAnswer === num 
                          ? (isCorrect ? '#4CAF50' : '#f44336') 
                          : undefined,
                      }}
                    >
                      {num}
                    </Button>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      }
      
      // Pour les nouvelles activités avec options de réponse
      if (exercise.options) {
        return (
          <Box>
            <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
              {exercise.question[currentLanguage]}
            </Typography>
            
            {/* Affichage visuel si disponible */}
            {exercise.visual && (
              <Typography variant="h3" sx={{ mb: 3, textAlign: 'center', fontSize: '3rem' }}>
                {exercise.visual}
              </Typography>
            )}
            
            <Grid container spacing={2}>
              {exercise.options.map((option: any, index: number) => (
                <Grid item xs={12} sm={6} key={index}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      sx={{
                        cursor: disabled ? 'default' : 'pointer',
                        border: selectedAnswer === index ? '3px solid #667eea' : '1px solid #e0e0e0',
                        bgcolor: selectedAnswer === index 
                          ? (isCorrect ? '#e8f5e8' : '#ffebee') 
                          : 'white',
                      }}
                      onClick={() => !disabled && onAnswer(index)}
                    >
                      <CardContent>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', textAlign: 'center' }}>
                          {typeof option === 'string' ? option : option[currentLanguage]}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
            
            {/* Affichage de l'explication si répondu */}
            {isCorrect !== null && exercise.explanation && (
              <Box sx={{ mt: 3, p: 2, bgcolor: isCorrect ? '#e8f5e8' : '#ffebee', borderRadius: 2 }}>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  {exercise.explanation[currentLanguage]}
                </Typography>
              </Box>
            )}
          </Box>
        );
      }
    }
    return null;
  };

  const renderQuizActivity = () => {
    if (activity.content?.quiz) {
      const quiz = activity.content.quiz;
      return (
        <Box>
          <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
            {quiz.question[currentLanguage]}
          </Typography>
          
          <Grid container spacing={2}>
            {quiz.options.map((option: any, index: number) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Card
                    sx={{
                      cursor: disabled ? 'default' : 'pointer',
                      border: selectedAnswer === index ? '3px solid #667eea' : '1px solid #e0e0e0',
                      bgcolor: selectedAnswer === index 
                        ? (isCorrect ? '#e8f5e8' : '#ffebee') 
                        : 'white',
                    }}
                    onClick={() => !disabled && onAnswer(index)}
                  >
                    <CardContent>
                      <Typography variant="body1">
                        {option[currentLanguage]}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }
    return null;
  };

  const renderMatchingActivity = () => {
    if (activity.content?.matching) {
      const matching = activity.content.matching;
      return (
        <Box>
          <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
            Associez les éléments correspondants
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>Colonne A</Typography>
              {matching.pairs.map((pair: any, index: number) => (
                <Card key={index} sx={{ mb: 2, p: 2 }}>
                  <Typography>{pair.left[currentLanguage]}</Typography>
                </Card>
              ))}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>Colonne B</Typography>
              {matching.pairs.map((pair: any, index: number) => (
                <Card 
                  key={index} 
                  sx={{ 
                    mb: 2, 
                    p: 2, 
                    cursor: 'pointer',
                    border: matchedPairs[index] ? '2px solid #4CAF50' : '1px solid #e0e0e0'
                  }}
                  onClick={() => {
                    const newMatches = { ...matchedPairs, [index]: pair.right[currentLanguage] };
                    setMatchedPairs(newMatches);
                    if (Object.keys(newMatches).length === matching.pairs.length) {
                      onAnswer(newMatches);
                    }
                  }}
                >
                  <Typography>{pair.right[currentLanguage]}</Typography>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Box>
      );
    }
    return null;
  };

  const renderOrderingActivity = () => {
    if (activity.content?.ordering) {
      const ordering = activity.content.ordering;
      return (
        <Box>
          <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
            {ordering.instruction[currentLanguage]}
          </Typography>
          
          <Grid container spacing={2}>
            {ordering.items.map((item: any, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border: draggedItems.includes(item[currentLanguage]) ? '2px solid #667eea' : '1px solid #e0e0e0',
                  }}
                  onClick={() => {
                    const newOrder = [...draggedItems];
                    if (newOrder.includes(item[currentLanguage])) {
                      newOrder.splice(newOrder.indexOf(item[currentLanguage]), 1);
                    } else {
                      newOrder.push(item[currentLanguage]);
                    }
                    setDraggedItems(newOrder);
                    if (newOrder.length === ordering.items.length) {
                      onAnswer(newOrder);
                    }
                  }}
                >
                  <CardContent>
                    <Typography>{item[currentLanguage]}</Typography>
                    {draggedItems.includes(item[currentLanguage]) && (
                      <Chip 
                        label={draggedItems.indexOf(item[currentLanguage]) + 1} 
                        size="small" 
                        color="primary" 
                        sx={{ mt: 1 }} 
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }
    return null;
  };

  const renderStoryActivity = () => {
    if (activity.content?.story) {
      const story = activity.content.story;
      return (
        <Box>
          <Card sx={{ p: 3, mb: 3, bgcolor: '#f8f9ff' }}>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              {story.text[currentLanguage]}
            </Typography>
          </Card>
          
          {story.questions && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Questions de compréhension:</Typography>
              {story.questions.map((question: any, index: number) => (
                <Card key={index} sx={{ mb: 2, p: 2 }}>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {question.question[currentLanguage]}
                  </Typography>
                  <Grid container spacing={1}>
                    {question.options.map((option: any, optIndex: number) => (
                      <Grid item xs={12} sm={6} key={optIndex}>
                        <Button
                          variant={selectedAnswer === `${index}-${optIndex}` ? 'contained' : 'outlined'}
                          fullWidth
                          onClick={() => onAnswer(`${index}-${optIndex}`)}
                          disabled={disabled}
                        >
                          {option[currentLanguage]}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      );
    }
    return null;
  };

  const renderCreativeActivity = () => {
    if (activity.content?.creative) {
      const creative = activity.content.creative;
      return (
        <Box>
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
            {creative.prompt[currentLanguage]}
          </Typography>
          
          <TextField
            multiline
            rows={6}
            fullWidth
            placeholder="Écrivez votre réponse ici..."
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            sx={{ mb: 3 }}
          />
          
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => onAnswer(textAnswer)}
              disabled={disabled || !textAnswer.trim()}
            >
              Valider ma réponse
            </Button>
          </Box>
        </Box>
      );
    }
    return null;
  };

  const renderInfoActivity = () => {
    if (activity.content?.info) {
      const info = activity.content.info;
      return (
        <Box>
          <Card sx={{ p: 3, mb: 3, bgcolor: '#f0f8ff' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
              📚 Le saviez-vous ?
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              {info.text[currentLanguage]}
            </Typography>
          </Card>
          
          {info.keyPoints && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Points clés à retenir:</Typography>
              <List>
                {info.keyPoints.map((point: any, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={point[currentLanguage]} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => onAnswer('understood')}
              disabled={disabled}
            >
              J'ai compris !
            </Button>
          </Box>
        </Box>
      );
    }
    return null;
  };

  // Check for enriched content types first
  if (activity.content?.interactive || activity.content?.drawing || activity.content?.music || 
      (activity.content?.creative?.type === 'shape-builder')) {
    return (
      <EnrichedActivityRenderer
        activity={activity}
        onAnswer={onAnswer}
        selectedAnswer={selectedAnswer}
        isCorrect={isCorrect}
        disabled={disabled}
      />
    );
  }

  // RENDERER UNIVERSEL pour toutes les activités
  const renderUniversalActivity = () => {
    if (activity.content?.exercises && activity.content.exercises.length > 0) {
      return renderMathActivity(); // Utilise le renderer math amélioré
    }
    
    // Renderer par défaut si pas d'exercises
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, color: '#667eea' }}>
          {activity.title[currentLanguage]}
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, color: '#666' }}>
          {activity.description[currentLanguage]}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: '#888' }}>
          {activity.instructions[currentLanguage]}
        </Typography>
        
        {/* Bouton simple pour compléter l'activité */}
        <Button
          variant="contained"
          size="large"
          onClick={() => onAnswer('completed')}
          disabled={disabled}
          sx={{
            bgcolor: '#667eea',
            px: 4,
            py: 2,
            fontSize: '1.2rem',
            borderRadius: 3,
            '&:hover': {
              bgcolor: '#5a6fd8',
            }
          }}
        >
          {isCorrect !== null ? 
            (isCorrect ? '✅ Activité terminée !' : '🔄 Recommencer') : 
            '🚀 Commencer l\'activité'
          }
        </Button>
        
        {/* Affichage des objectifs */}
        {activity.objectives && (
          <Box sx={{ mt: 4, p: 3, bgcolor: '#f0f4ff', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#667eea' }}>
              🎯 Objectifs d'apprentissage :
            </Typography>
            {activity.objectives.map((objective, index) => (
              <Typography key={index} variant="body2" sx={{ mb: 1, color: '#666' }}>
                • {objective[currentLanguage]}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    );
  };

  // Determine which renderer to use based on content type
  if (activity.content?.exercises) {
    return renderMathActivity(); // Renderer universel amélioré
  }
  if (activity.content?.quiz) return renderQuizActivity();
  if (activity.content?.matching) return renderMatchingActivity();
  if (activity.content?.ordering) return renderOrderingActivity();
  if (activity.content?.story) return renderStoryActivity();
  if (activity.content?.creative) return renderCreativeActivity();
  if (activity.content?.info) return renderInfoActivity();
  
  // Renderer universel pour les activités sans structure spécifique
  return (
    <ScrollableContainer maxHeight="70vh" showScrollToTop={true}>
      {renderUniversalActivity()}
    </ScrollableContainer>
  );

  // Fallback for unknown content types
  return (
    <ScrollableContainer maxHeight="70vh" sx={{ textAlign: 'center', p: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {activity.title[currentLanguage]}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {activity.description[currentLanguage]}
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => onAnswer('completed')}
        disabled={disabled}
      >
        {currentLanguage === 'fr' ? 'Activité terminée' :
         currentLanguage === 'en' ? 'Activity completed' :
         'Aktivita dokončena'}
      </Button>
    </ScrollableContainer>
  );
};