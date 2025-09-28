import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import { Add as AddIcon, PlayArrow as PlayIcon, Save as SaveIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../utils/translations';

interface DragDropElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  draggable: boolean;
  droppable: boolean;
  style: {
    backgroundColor: string;
    color: string;
    fontSize: string;
    borderRadius: string;
    border: string;
  };
}

interface DragDropActivity {
  id: string;
  title: string;
  description: string;
  elements: DragDropElement[];
  category: 'educational' | 'creative' | 'games' | 'interactive';
  ageGroup: '3-5' | '6-8' | '9-12';
  subject: 'math' | 'language' | 'science' | 'art' | 'computing' | 'civic' | 'hygiene' | 'anatomy';
}

const DragDropCreatorSimple: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  const [activities, setActivities] = useState<DragDropActivity[]>([]);
  const [currentActivity, setCurrentActivity] = useState<DragDropActivity | null>(null);
  const [selectedElement, setSelectedElement] = useState<DragDropElement | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [showElementDialog, setShowElementDialog] = useState(false);
  const [newElementType, setNewElementType] = useState<'text' | 'image' | 'shape'>('text');

  const createNewActivity = () => {
    const newActivity: DragDropActivity = {
      id: Date.now().toString(),
      title: t('interactiveUI.newActivity'),
      description: 'Description de l\'activité',
      elements: [],
      category: 'educational',
      ageGroup: '6-8',
      subject: 'math',
    };
    setCurrentActivity(newActivity);
  };

  const createElement = () => {
    if (!currentActivity) return;

    const newElement: DragDropElement = {
      id: Date.now().toString(),
      type: newElementType,
      content: newElementType === 'text' ? 'Nouveau texte' : newElementType === 'image' ? 'Image' : 'Forme',
      x: 100,
      y: 100,
      width: 120,
      height: 60,
      draggable: true,
      droppable: false,
      style: {
        backgroundColor: '#e3f2fd',
        color: '#1976d2',
        fontSize: '14px',
        borderRadius: '8px',
        border: '2px solid #2196f3',
      },
    };

    setCurrentActivity({
      ...currentActivity,
      elements: [...currentActivity.elements, newElement],
    });
    setShowElementDialog(false);
  };

  const handleElementDragStart = (e: React.DragEvent, element: DragDropElement) => {
    e.dataTransfer.setData('text/plain', element.id);
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!currentActivity || !previewMode) return;

    const elementId = e.dataTransfer.getData('text/plain');
    const element = currentActivity.elements.find(el => el.id === elementId);
    if (!element) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentActivity({
      ...currentActivity,
      elements: currentActivity.elements.map(el =>
        el.id === elementId ? { ...el, x, y } : el
      ),
    });
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const saveActivity = () => {
    if (!currentActivity) return;
    
    const existingIndex = activities.findIndex(a => a.id === currentActivity.id);
    if (existingIndex >= 0) {
      setActivities(activities.map((a, index) => 
        index === existingIndex ? currentActivity : a
      ));
    } else {
      setActivities([...activities, currentActivity]);
    }
    
    alert('Activité sauvegardée !');
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* En-tête */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Créateur d'activités Drag & Drop
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button 
            variant="contained" 
            onClick={createNewActivity}
            startIcon={<AddIcon />}
          >
            {t('interactiveUI.newActivity')}
          </Button>
          {currentActivity && (
            <>
              <Button
                variant="outlined"
                onClick={() => setPreviewMode(!previewMode)}
                startIcon={<PlayIcon />}
              >
                {previewMode ? 'Mode édition' : 'Mode aperçu'}
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={saveActivity}
                startIcon={<SaveIcon />}
              >
                Sauvegarder
              </Button>
            </>
          )}
        </Box>
      </Paper>

      {!currentActivity ? (
        // Page d'accueil
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" color="text.secondary" mb={2}>
            Créez votre première activité drag & drop
          </Typography>
          <Button variant="contained" onClick={createNewActivity} size="large">
            Commencer
          </Button>
          
          {activities.length > 0 && (
            <Box sx={{ mt: 4, width: '100%', maxWidth: 800 }}>
              <Typography variant="h6" mb={2}>Activités existantes:</Typography>
              <Grid container spacing={2}>
                {activities.map((activity) => (
                  <Grid item xs={12} md={6} key={activity.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{activity.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {activity.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                          <Chip label={activity.category === 'educational' ? 'Éducatives' : 
                                      activity.category === 'creative' ? 'Créatives' : 
                                      activity.category === 'games' ? 'Jeux' : 'Interactives'} 
                                size="small" 
                                color="primary" />
                          <Chip label={activity.ageGroup} size="small" variant="outlined" />
                          <Chip label={activity.subject === 'math' ? 'Math' : 
                                      activity.subject === 'language' ? 'Langue' : 
                                      activity.subject === 'science' ? 'Science' : 
                                      activity.subject === 'art' ? 'Art' : 
                                      activity.subject === 'computing' ? 'Info' : 
                                      activity.subject === 'anatomy' ? 'Anatomie' : 
                                      activity.subject === 'civic' ? 'Civique' : 'Hygiène'} 
                                size="small" 
                                color="secondary" />
                        </Box>
                        
                        <Typography variant="caption" display="block" color="text.secondary">
                          {activity.elements.length} éléments
                        </Typography>
                        
                        <Button 
                          size="small" 
                          onClick={() => setCurrentActivity(activity)}
                          sx={{ mt: 1 }}
                          variant="outlined"
                        >
                          Éditer
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      ) : (
        // Interface d'édition
        <Box sx={{ flex: 1, display: 'flex' }}>
          {/* Panneau latéral */}
          {!previewMode && (
            <Paper sx={{ width: 300, p: 2, mr: 2, maxHeight: '80vh', overflow: 'auto' }}>
              <Typography variant="h6" gutterBottom>
                Propriétés
              </Typography>
              
              <TextField
                fullWidth
                label="Titre de l'activité"
                value={currentActivity.title}
                onChange={(e) => setCurrentActivity({
                  ...currentActivity,
                  title: e.target.value
                })}
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Description"
                value={currentActivity.description}
                onChange={(e) => setCurrentActivity({
                  ...currentActivity,
                  description: e.target.value
                })}
                sx={{ mb: 2 }}
              />

              {/* Catégorisation */}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Catégorie</InputLabel>
                <Select
                  value={currentActivity.category}
                  onChange={(e) => setCurrentActivity({
                    ...currentActivity,
                    category: e.target.value as any
                  })}
                >
                  <MenuItem value="educational">Éducatives</MenuItem>
                  <MenuItem value="creative">Créatives</MenuItem>
                  <MenuItem value="games">Jeux</MenuItem>
                  <MenuItem value="interactive">Interactives</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Tranche d'âge</InputLabel>
                <Select
                  value={currentActivity.ageGroup}
                  onChange={(e) => setCurrentActivity({
                    ...currentActivity,
                    ageGroup: e.target.value as any
                  })}
                >
                  <MenuItem value="3-5">3-5 ans</MenuItem>
                  <MenuItem value="6-8">6-8 ans</MenuItem>
                  <MenuItem value="9-12">9-12 ans</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Matière</InputLabel>
                <Select
                  value={currentActivity.subject}
                  onChange={(e) => setCurrentActivity({
                    ...currentActivity,
                    subject: e.target.value as any
                  })}
                >
                  <MenuItem value="math">Mathématiques</MenuItem>
                  <MenuItem value="language">Langues</MenuItem>
                  <MenuItem value="science">Sciences</MenuItem>
                  <MenuItem value="art">Art & Créativité</MenuItem>
                  <MenuItem value="computing">Informatique</MenuItem>
                  <MenuItem value="anatomy">Anatomie</MenuItem>
                  <MenuItem value="civic">Éducation Civique</MenuItem>
                  <MenuItem value="hygiene">Hygiène & Santé</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="subtitle1" gutterBottom>
                Éléments ({currentActivity.elements.length})
              </Typography>
              
              {currentActivity.elements.map((element) => (
                <Card 
                  key={element.id} 
                  sx={{ 
                    mb: 1, 
                    cursor: 'pointer',
                    border: selectedElement?.id === element.id ? '2px solid #2196f3' : '1px solid #e0e0e0'
                  }}
                  onClick={() => setSelectedElement(element)}
                >
                  <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                    <Typography variant="body2">
                      {element.type}: {element.content}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          )}

          {/* Zone de création */}
          <Box sx={{ flex: 1, position: 'relative' }}>
            <Paper
              sx={{
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#fafafa',
              }}
              onDrop={handleCanvasDrop}
              onDragOver={handleCanvasDragOver}
            >
              {/* Éléments */}
              {currentActivity.elements.map((element) => (
                <motion.div
                  key={element.id}
                  drag={!previewMode}
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    if (!previewMode) {
                      setCurrentActivity({
                        ...currentActivity,
                        elements: currentActivity.elements.map(el =>
                          el.id === element.id 
                            ? { ...el, x: element.x + info.offset.x, y: element.y + info.offset.y }
                            : el
                        ),
                      });
                    }
                  }}
                  style={{
                    position: 'absolute',
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    backgroundColor: element.style.backgroundColor,
                    color: element.style.color,
                    border: element.style.border,
                    borderRadius: element.style.borderRadius,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: previewMode && element.draggable ? 'grab' : !previewMode ? 'move' : 'default',
                    userSelect: 'none',
                    fontSize: element.style.fontSize,
                  }}
                  draggable={previewMode && element.draggable}
                  onDragStart={previewMode ? (e: any) => handleElementDragStart(e, element) : undefined}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {element.content}
                </motion.div>
              ))}

              {/* Instructions */}
              {currentActivity.elements.length === 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  <Typography variant="h6">
                    {previewMode ? 'Mode aperçu actif' : 'Cliquez sur + pour ajouter des éléments'}
                  </Typography>
                </Box>
              )}
            </Paper>

            {/* Bouton flottant pour ajouter des éléments */}
            {!previewMode && (
              <Fab
                color="primary"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                onClick={() => setShowElementDialog(true)}
              >
                <AddIcon />
              </Fab>
            )}
          </Box>
        </Box>
      )}

      {/* Dialog pour créer un élément */}
      <Dialog open={showElementDialog} onClose={() => setShowElementDialog(false)}>
        <DialogTitle>Ajouter un élément</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Type d'élément</InputLabel>
            <Select
              value={newElementType}
              onChange={(e) => setNewElementType(e.target.value as 'text' | 'image' | 'shape')}
            >
              <MenuItem value="text">Texte</MenuItem>
              <MenuItem value="image">Image</MenuItem>
              <MenuItem value="shape">Forme</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowElementDialog(false)}>Annuler</Button>
          <Button onClick={createElement} variant="contained">Ajouter</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DragDropCreatorSimple;