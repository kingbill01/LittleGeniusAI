import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  Switch,
  FormControlLabel,
  Alert,
  Tooltip,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Settings as ConfigIcon,
  TouchApp as InteractiveIcon,
  Mouse as ClickableIcon,
  SportsEsports as GameIcon,
  ExpandMore as ExpandMoreIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ScrollableContainer from '../ScrollableContainer';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../utils/translations';
import { getAdminLabel } from '../../utils/adminTranslations';
import {
  InteractiveActivityData,
  InteractiveElement,
  getAllInteractiveActivities,
  saveCustomInteractiveActivity,
  deleteCustomInteractiveActivity,
} from '../../data/interactiveActivitiesData';

interface InteractiveActivityManagerProps {
  onNotification: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
}

// Types importés depuis interactiveActivitiesData.ts

// Données de test supprimées - utilisées depuis interactiveActivitiesData.ts

export const InteractiveActivityManager: React.FC<InteractiveActivityManagerProps> = ({ onNotification }) => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  
  const [activities, setActivities] = useState<InteractiveActivityData[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<InteractiveActivityData[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isElementEditorOpen, setIsElementEditorOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<InteractiveActivityData | null>(null);
  const [selectedElement, setSelectedElement] = useState<InteractiveElement | null>(null);
  
  const [filters, setFilters] = useState({
    subject: '',
    ageGroup: '',
    difficulty: '',
    type: '',
    status: '',
    search: '',
  });

  const [formData, setFormData] = useState<Partial<InteractiveActivityData>>({
    title: { fr: '', en: '', cs: '' },
    description: { fr: '', en: '', cs: '' },
    type: 'drag-drop',
    subject: 'math',
    ageGroup: '3-5',
    difficulty: 'easy',
    estimatedTime: 10,
    status: 'inactive',
    elements: [],
    objectives: [{ fr: '', en: '', cs: '' }],
    instructions: { fr: '', en: '', cs: '' },
    successCriteria: {
      minCorrect: 1,
      allowRetries: true
    },
    interactions: {
      hints: []
    }
  });

  useEffect(() => {
    // Charger toutes les activités
    const allActivities = getAllInteractiveActivities();
    setActivities(allActivities);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [activities, filters]);

  const applyFilters = () => {
    let filtered = activities;

    if (filters.subject) {
      filtered = filtered.filter(activity => activity.subject === filters.subject);
    }
    if (filters.ageGroup) {
      filtered = filtered.filter(activity => activity.ageGroup === filters.ageGroup);
    }
    if (filters.difficulty) {
      filtered = filtered.filter(activity => activity.difficulty === filters.difficulty);
    }
    if (filters.type) {
      filtered = filtered.filter(activity => activity.type === filters.type);
    }
    if (filters.status) {
      filtered = filtered.filter(activity => activity.status === filters.status);
    }
    if (filters.search) {
      filtered = filtered.filter(activity =>
        activity.title.fr.toLowerCase().includes(filters.search.toLowerCase()) ||
        activity.description.fr.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredActivities(filtered);
  };

  const resetForm = () => {
    setFormData({
      title: { fr: '', en: '', cs: '' },
      description: { fr: '', en: '', cs: '' },
      type: 'drag-drop',
      subject: 'math',
      ageGroup: '3-5',
      difficulty: 'easy',
      estimatedTime: 10,
      status: 'inactive',
      elements: [],
      objectives: [{ fr: '', en: '', cs: '' }],
      instructions: { fr: '', en: '', cs: '' },
      successCriteria: {
        minCorrect: 1,
        allowRetries: true
      },
      interactions: {
        hints: []
      }
    });
  };

  const openEditForm = (activity: InteractiveActivityData) => {
    setEditingActivity(activity);
    setFormData(activity);
    setIsFormOpen(true);
  };

  const handleSaveActivity = () => {
    if (!formData.title?.fr || !formData.description?.fr) {
      onNotification('Veuillez remplir tous les champs requis', 'error');
      return;
    }

    const activityData: InteractiveActivityData = {
      ...formData as InteractiveActivityData,
      id: editingActivity?.id || `interactive-${Date.now()}`,
    };

    // Sauvegarder dans localStorage
    saveCustomInteractiveActivity(activityData);
    
    if (editingActivity) {
      setActivities(activities.map(a => a.id === editingActivity.id ? activityData : a));
      onNotification('Activité interactive mise à jour avec succès', 'success');
    } else {
      setActivities([...activities, activityData]);
      onNotification(t('interactiveUI.interactiveActivityCreated'), 'success');
    }

    setIsFormOpen(false);
    setEditingActivity(null);
    resetForm();
  };

  const handleDeleteActivity = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) {
      // Supprimer du localStorage si c'est une activité personnalisée
      deleteCustomInteractiveActivity(id);
      setActivities(activities.filter(a => a.id !== id));
      onNotification('Activité supprimée avec succès', 'success');
    }
  };

  const handleToggleStatus = (id: string) => {
    setActivities(activities.map(activity => 
      activity.id === id 
        ? { ...activity, status: activity.status === 'active' ? 'inactive' : 'active' } 
        : activity
    ));
    onNotification('Status de l\'activité mis à jour', 'info');
  };

  const addInteractiveElement = (type: InteractiveElement['type']) => {
    const newElement: InteractiveElement = {
      id: `element-${Date.now()}`,
      type,
      properties: {
        label: `Nouvel élément ${type}`,
        color: '#2196F3',
        size: 'medium',
        position: { x: 100, y: 100 }
      }
    };

    setFormData({
      ...formData,
      elements: [...(formData.elements || []), newElement]
    });
  };

  const editElement = (element: InteractiveElement) => {
    setSelectedElement(element);
    setIsElementEditorOpen(true);
  };

  const updateElement = (updatedElement: InteractiveElement) => {
    setFormData({
      ...formData,
      elements: (formData.elements || []).map(el => 
        el.id === updatedElement.id ? updatedElement : el
      )
    });
    setIsElementEditorOpen(false);
    setSelectedElement(null);
  };

  const removeElement = (elementId: string) => {
    setFormData({
      ...formData,
      elements: (formData.elements || []).filter(el => el.id !== elementId)
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'inactive': return '#757575';
      case 'testing': return '#FF9800';
      default: return '#757575';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'drag-drop': return <DragIcon />;
      case 'click-sequence': return <ClickableIcon />;
      case 'form-interaction': return <InteractiveIcon />;
      case 'puzzle': return <GameIcon />;
      case 'game': return <GameIcon />;
      default: return <InteractiveIcon />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#667eea' }}>
        🎮 {t('admin.interactiveActivities')}
      </Typography>

      {/* Statistiques rapides */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#4CAF50', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4">{activities.filter(a => a.status === 'active').length}</Typography>
              <Typography variant="body2">{getAdminLabel('active', currentLanguage)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#757575', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4">{activities.filter(a => a.status === 'inactive').length}</Typography>
              <Typography variant="body2">{getAdminLabel('inactive', currentLanguage)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#FF9800', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4">{activities.filter(a => a.status === 'testing').length}</Typography>
              <Typography variant="body2">En test</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#2196F3', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4">{activities.length}</Typography>
              <Typography variant="body2">{getAdminLabel('total', currentLanguage)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Barre d'outils et filtres */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                resetForm();
                setEditingActivity(null);
                setIsFormOpen(true);
              }}
              fullWidth
              sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              {t('admin.newInteractiveActivity')}
            </Button>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label={t('admin.search')}
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>{getAdminLabel('type', currentLanguage)}</InputLabel>
              <Select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                label="Type"
              >
                <MenuItem value="">{t('admin.all')}</MenuItem>
                <MenuItem value="drag-drop">Glisser-déposer</MenuItem>
                <MenuItem value="click-sequence">{getAdminLabel('clickSequence', currentLanguage)}</MenuItem>
                <MenuItem value="form-interaction">{getAdminLabel('formInteraction', currentLanguage)}</MenuItem>
                <MenuItem value="puzzle">{getAdminLabel('puzzle', currentLanguage)}</MenuItem>
                <MenuItem value="game">{getAdminLabel('game', currentLanguage)}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>{t('admin.subject')}</InputLabel>
              <Select
                value={filters.subject}
                onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                label={t('admin.subject')}
              >
                <MenuItem value="">{t('admin.all')}</MenuItem>
                <MenuItem value="math">{t('subjects.math')}</MenuItem>
                <MenuItem value="language">{t('subjects.language')}</MenuItem>
                <MenuItem value="science">{t('subjects.science')}</MenuItem>
                <MenuItem value="art">{t('subjects.art')}</MenuItem>
                <MenuItem value="computing">{t('subjects.computing')}</MenuItem>
                <MenuItem value="civic">{t('subjects.civic')}</MenuItem>
                <MenuItem value="hygiene">{t('subjects.hygiene')}</MenuItem>
                <MenuItem value="anatomy">{t('subjects.anatomy')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>{getAdminLabel('status', currentLanguage)}</InputLabel>
              <Select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                label="Status"
              >
                <MenuItem value="">{t('admin.all')}</MenuItem>
                <MenuItem value="active">{getAdminLabel('active', currentLanguage)}</MenuItem>
                <MenuItem value="inactive">{getAdminLabel('inactive', currentLanguage)}</MenuItem>
                <MenuItem value="testing">{getAdminLabel('testing', currentLanguage)}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      {/* Liste des activités interactives */}
      <ScrollableContainer maxHeight="60vh" showScrollToTop={true}>
        <Grid container spacing={2}>
          {filteredActivities.map((activity, index) => (
            <Grid item xs={12} sm={6} md={4} key={activity.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: `2px solid ${getStatusColor(activity.status)}`,
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Chip
                        icon={getTypeIcon(activity.type)}
                        label={activity.type}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Badge
                        badgeContent={activity.elements.length}
                        color="secondary"
                        sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem' } }}
                      >
                        <InteractiveIcon />
                      </Badge>
                    </Box>
                    
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {activity.title[currentLanguage]}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {activity.description[currentLanguage]}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      <Chip label={activity.ageGroup} size="small" />
                      <Chip label={t(`subjects.${activity.subject}`)} size="small" />
                      <Chip label={t(`difficulties.${activity.difficulty}`)} size="small" />
                      <Chip label={`${activity.estimatedTime}min`} size="small" variant="outlined" />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                        Status: {activity.status}
                      </Typography>
                      <Switch
                        size="small"
                        checked={activity.status === 'active'}
                        onChange={() => handleToggleStatus(activity.id)}
                        color="success"
                      />
                    </Box>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <Box>
                      <Tooltip title="Configurer les éléments">
                        <IconButton
                          size="small"
                          onClick={() => openEditForm(activity)}
                          sx={{ color: '#2196F3' }}
                        >
                          <ConfigIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Modifier">
                        <IconButton
                          size="small"
                          onClick={() => openEditForm(activity)}
                          sx={{ color: '#FF9800' }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteActivity(activity.id)}
                          sx={{ color: '#f44336' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {filteredActivities.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              {t('admin.noContentFound')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('admin.tryModifyFilters')}
            </Typography>
          </Box>
        )}
      </ScrollableContainer>

      {/* Dialog de formulaire pour activité interactive */}
      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{ sx: { maxHeight: '90vh' } }}
      >
        <DialogTitle>
          {editingActivity ? t('interactiveUI.editInteractiveActivity') : t('interactiveUI.newInteractiveActivity')}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              {/* Titre multilingue */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2 }}>{t('admin.title')}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Titre (Français)"
                      value={formData.title?.fr || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        title: { ...formData.title!, fr: e.target.value }
                      })}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Title (English)"
                      value={formData.title?.en || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        title: { ...formData.title!, en: e.target.value }
                      })}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Název (Česky)"
                      value={formData.title?.cs || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        title: { ...formData.title!, cs: e.target.value }
                      })}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Description multilingue */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2 }}>{t('admin.description')}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Description (Français)"
                      value={formData.description?.fr || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        description: { ...formData.description!, fr: e.target.value }
                      })}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Description (English)"
                      value={formData.description?.en || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        description: { ...formData.description!, en: e.target.value }
                      })}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Popis (Česky)"
                      value={formData.description?.cs || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        description: { ...formData.description!, cs: e.target.value }
                      })}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Propriétés de base */}
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>{getAdminLabel('type', currentLanguage)}</InputLabel>
                  <Select
                    value={formData.type || 'drag-drop'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    label="Type"
                  >
                    <MenuItem value="drag-drop">Glisser-déposer</MenuItem>
                    <MenuItem value="click-sequence">{getAdminLabel('clickSequence', currentLanguage)}</MenuItem>
                    <MenuItem value="form-interaction">{getAdminLabel('formInteraction', currentLanguage)}</MenuItem>
                    <MenuItem value="puzzle">{getAdminLabel('puzzle', currentLanguage)}</MenuItem>
                    <MenuItem value="game">{getAdminLabel('game', currentLanguage)}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>{t('admin.subject')}</InputLabel>
                  <Select
                    value={formData.subject || 'math'}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value as any })}
                    label={t('admin.subject')}
                  >
                    <MenuItem value="math">{t('subjects.math')}</MenuItem>
                    <MenuItem value="language">{t('subjects.language')}</MenuItem>
                    <MenuItem value="science">{t('subjects.science')}</MenuItem>
                    <MenuItem value="art">{t('subjects.art')}</MenuItem>
                    <MenuItem value="computing">{t('subjects.computing')}</MenuItem>
                    <MenuItem value="civic">{t('subjects.civic')}</MenuItem>
                    <MenuItem value="hygiene">{t('subjects.hygiene')}</MenuItem>
                    <MenuItem value="anatomy">{t('subjects.anatomy')}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>{t('admin.age')}</InputLabel>
                  <Select
                    value={formData.ageGroup || '3-5'}
                    onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value as any })}
                    label={t('admin.age')}
                  >
                    <MenuItem value="3-5">{t('ageGroups.3-5')}</MenuItem>
                    <MenuItem value="6-8">{t('ageGroups.6-8')}</MenuItem>
                    <MenuItem value="9-12">{t('ageGroups.9-12')}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>{t('admin.difficulty')}</InputLabel>
                  <Select
                    value={formData.difficulty || 'easy'}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                    label={t('admin.difficulty')}
                  >
                    <MenuItem value="easy">{t('difficulties.easy')}</MenuItem>
                    <MenuItem value="medium">{t('difficulties.medium')}</MenuItem>
                    <MenuItem value="hard">{t('difficulties.hard')}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Éléments interactifs */}
              <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">
                      Éléments Interactifs ({(formData.elements || []).length})
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Ajouter des éléments cliquables, déplaçables et interactifs:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<ClickableIcon />}
                          onClick={() => addInteractiveElement('button')}
                        >
                          Bouton
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<DragIcon />}
                          onClick={() => addInteractiveElement('draggable')}
                        >
                          Élément déplaçable
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<InteractiveIcon />}
                          onClick={() => addInteractiveElement('clickable-shape')}
                        >
                          Forme cliquable
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => addInteractiveElement('input-field')}
                        >
                          Champ de saisie
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => addInteractiveElement('slider')}
                        >
                          Curseur
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => addInteractiveElement('toggle')}
                        >
                          Interrupteur
                        </Button>
                      </Box>
                    </Box>

                    <List>
                      {(formData.elements || []).map((element, index) => (
                        <React.Fragment key={element.id}>
                          <ListItem>
                            <ListItemText
                              primary={`${element.type}: ${element.properties.label || 'Sans nom'}`}
                              secondary={`Position: (${element.properties.position?.x}, ${element.properties.position?.y}) - Couleur: ${element.properties.color}`}
                            />
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                onClick={() => editElement(element)}
                                sx={{ mr: 1 }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                edge="end"
                                onClick={() => removeElement(element.id)}
                                color="error"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                          {index < (formData.elements || []).length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>

                    {(formData.elements || []).length === 0 && (
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                        Aucun élément interactif ajouté. Utilisez les boutons ci-dessus pour en ajouter.
                      </Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFormOpen(false)} startIcon={<CancelIcon />}>
            {t('admin.cancel')}
          </Button>
          <Button onClick={handleSaveActivity} variant="contained" startIcon={<SaveIcon />}>
            {editingActivity ? t('admin.update') : t('admin.create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog pour éditer un élément */}
      <Dialog
        open={isElementEditorOpen}
        onClose={() => setIsElementEditorOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Modifier l'élément</DialogTitle>
        <DialogContent>
          {selectedElement && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Libellé"
                    value={selectedElement.properties.label || ''}
                    onChange={(e) => setSelectedElement({
                      ...selectedElement,
                      properties: { ...selectedElement.properties, label: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={getAdminLabel('position_x', currentLanguage)}
                    type="number"
                    value={selectedElement.properties.position?.x || 0}
                    onChange={(e) => setSelectedElement({
                      ...selectedElement,
                      properties: {
                        ...selectedElement.properties,
                        position: { ...selectedElement.properties.position!, x: parseInt(e.target.value) }
                      }
                    })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={getAdminLabel('position_y', currentLanguage)}
                    type="number"
                    value={selectedElement.properties.position?.y || 0}
                    onChange={(e) => setSelectedElement({
                      ...selectedElement,
                      properties: {
                        ...selectedElement.properties,
                        position: { ...selectedElement.properties.position!, y: parseInt(e.target.value) }
                      }
                    })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Couleur"
                    type="color"
                    value={selectedElement.properties.color || '#2196F3'}
                    onChange={(e) => setSelectedElement({
                      ...selectedElement,
                      properties: { ...selectedElement.properties, color: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>{getAdminLabel('size', currentLanguage)}</InputLabel>
                    <Select
                      value={selectedElement.properties.size || 'medium'}
                      onChange={(e) => setSelectedElement({
                        ...selectedElement,
                        properties: { ...selectedElement.properties, size: e.target.value as any }
                      })}
                      label="Taille"
                    >
                      <MenuItem value="small">{getAdminLabel('small', currentLanguage)}</MenuItem>
                      <MenuItem value="medium">{getAdminLabel('medium', currentLanguage)}</MenuItem>
                      <MenuItem value="large">{getAdminLabel('large', currentLanguage)}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsElementEditorOpen(false)}>
            Annuler
          </Button>
          <Button 
            onClick={() => selectedElement && updateElement(selectedElement)} 
            variant="contained"
          >
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InteractiveActivityManager;