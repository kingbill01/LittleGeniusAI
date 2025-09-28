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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  BugReport as BugIcon,
  CheckCircle as ActiveIcon,
  Error as InactiveIcon,
  Settings as ConfigIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ScrollableContainer from '../ScrollableContainer';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../utils/translations';
import { getAdminLabel } from '../../utils/adminTranslations';

interface ActivityManagerProps {
  onNotification: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
}

interface Activity {
  id: string;
  name: string;
  type: 'quiz' | 'game' | 'exercise' | 'creative' | 'story' | 'experiment' | 'drawing' | 'music' | 'video' | 'interactive' | 'simulation' | 'puzzle';
  subject: 'math' | 'language' | 'science' | 'art' | 'computing' | 'civic' | 'hygiene' | 'anatomy';
  ageGroup: '3-5' | '6-8' | '9-12';
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'active' | 'inactive' | 'maintenance' | 'broken';
  description: string;
  estimatedTime: number;
  isWorking: boolean;
  lastTested: string;
  errorCount: number;
  successRate: number;
  popularity: number;
  config: {
    maxAttempts: number;
    showHints: boolean;
    allowSkip: boolean;
    autoProgress: boolean;
    soundEnabled: boolean;
    animationsEnabled: boolean;
  };
}

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'math-addition-basic',
    name: 'Addition Simple',
    type: 'quiz',
    subject: 'math',
    ageGroup: '3-5',
    difficulty: 'easy',
    status: 'active',
    description: 'Apprendre les additions de base avec des nombres de 1 à 10',
    estimatedTime: 15,
    isWorking: true,
    lastTested: '2024-01-15',
    errorCount: 0,
    successRate: 98,
    popularity: 85,
    config: {
      maxAttempts: 3,
      showHints: true,
      allowSkip: false,
      autoProgress: false,
      soundEnabled: true,
      animationsEnabled: true,
    },
  },
  {
    id: 'language-reading-story',
    name: 'Histoire Interactive',
    type: 'story',
    subject: 'language',
    ageGroup: '6-8',
    difficulty: 'medium',
    status: 'broken',
    description: 'Lecture interactive avec questions de compréhension',
    estimatedTime: 20,
    isWorking: false,
    lastTested: '2024-01-10',
    errorCount: 5,
    successRate: 45,
    popularity: 70,
    config: {
      maxAttempts: 2,
      showHints: true,
      allowSkip: true,
      autoProgress: true,
      soundEnabled: true,
      animationsEnabled: false,
    },
  },
  {
    id: 'science-experiment-water',
    name: 'Expérience Eau',
    type: 'experiment',
    subject: 'science',
    ageGroup: '9-12',
    difficulty: 'hard',
    status: 'maintenance',
    description: 'Expérience virtuelle sur les états de l\'eau',
    estimatedTime: 30,
    isWorking: false,
    lastTested: '2024-01-08',
    errorCount: 2,
    successRate: 78,
    popularity: 92,
    config: {
      maxAttempts: 5,
      showHints: false,
      allowSkip: false,
      autoProgress: false,
      soundEnabled: true,
      animationsEnabled: true,
    },
  },
];

export const ActivityManager: React.FC<ActivityManagerProps> = ({ onNotification }) => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(MOCK_ACTIVITIES);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [testingActivity, setTestingActivity] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    subject: '',
    ageGroup: '',
    status: '',
    search: '',
  });

  const [formData, setFormData] = useState<Partial<Activity>>({
    name: '',
    type: 'quiz',
    subject: 'math',
    ageGroup: '3-5',
    difficulty: 'easy',
    status: 'active',
    description: '',
    estimatedTime: 15,
    config: {
      maxAttempts: 3,
      showHints: true,
      allowSkip: false,
      autoProgress: false,
      soundEnabled: true,
      animationsEnabled: true,
    },
  });

  useEffect(() => {
    applyFilters();
  }, [activities, filters]);

  const applyFilters = () => {
    let filtered = [...activities];

    if (filters.subject) {
      filtered = filtered.filter(activity => activity.subject === filters.subject);
    }
    if (filters.ageGroup) {
      filtered = filtered.filter(activity => activity.ageGroup === filters.ageGroup);
    }
    if (filters.status) {
      filtered = filtered.filter(activity => activity.status === filters.status);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(activity =>
        activity.name.toLowerCase().includes(searchLower) ||
        activity.description.toLowerCase().includes(searchLower)
      );
    }

    setFilteredActivities(filtered);
  };

  const handleSaveActivity = () => {
    try {
      const newActivity: Activity = {
        ...formData,
        id: editingActivity?.id || `activity-${Date.now()}`,
        isWorking: editingActivity?.isWorking ?? true,
        lastTested: new Date().toISOString().split('T')[0],
        errorCount: editingActivity?.errorCount ?? 0,
        successRate: editingActivity?.successRate ?? 100,
        popularity: editingActivity?.popularity ?? 0,
      } as Activity;

      if (editingActivity) {
        const updatedActivities = activities.map(activity =>
          activity.id === editingActivity.id ? newActivity : activity
        );
        setActivities(updatedActivities);
        onNotification('Activité mise à jour avec succès', 'success');
      } else {
        setActivities([...activities, newActivity]);
        onNotification(t('interactiveUI.activityCreated'), 'success');
      }

      setIsFormOpen(false);
      setEditingActivity(null);
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      onNotification('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleDeleteActivity = (activityId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) {
      const updatedActivities = activities.filter(activity => activity.id !== activityId);
      setActivities(updatedActivities);
      onNotification('Activité supprimée avec succès', 'success');
    }
  };

  const handleTestActivity = async (activityId: string) => {
    setTestingActivity(activityId);
    onNotification('Test de l\'activité en cours...', 'info');

    try {
      // Simulation d'un test d'activité
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const randomSuccess = Math.random() > 0.3; // 70% de chance de succès
      
      const updatedActivities = activities.map(activity => {
        if (activity.id === activityId) {
          return {
            ...activity,
            isWorking: randomSuccess,
            status: (randomSuccess ? 'active' : 'broken') as 'active' | 'inactive' | 'maintenance' | 'broken',
            lastTested: new Date().toISOString().split('T')[0],
            errorCount: randomSuccess ? 0 : activity.errorCount + 1,
            successRate: randomSuccess ? Math.min(100, activity.successRate + 5) : Math.max(0, activity.successRate - 10),
          };
        }
        return activity;
      });

      setActivities(updatedActivities);
      onNotification(
        randomSuccess ? 'Test réussi - Activité fonctionnelle' : 'Test échoué - Problème détecté',
        randomSuccess ? 'success' : 'error'
      );
    } catch (error) {
      onNotification('Erreur lors du test', 'error');
    } finally {
      setTestingActivity(null);
    }
  };

  const handleToggleStatus = (activityId: string) => {
    const updatedActivities = activities.map(activity => {
      if (activity.id === activityId) {
        const newStatus = activity.status === 'active' ? 'inactive' : 'active';
        return { ...activity, status: newStatus as 'active' | 'inactive' | 'maintenance' | 'broken' };
      }
      return activity;
    });
    setActivities(updatedActivities);
    onNotification('Statut de l\'activité modifié', 'success');
  };

  const openEditForm = (activity: Activity) => {
    setEditingActivity(activity);
    setFormData(activity);
    setIsFormOpen(true);
  };

  const openConfigDialog = (activity: Activity) => {
    setEditingActivity(activity);
    setFormData(activity);
    setIsConfigOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'quiz',
      subject: 'math',
      ageGroup: '3-5',
      difficulty: 'easy',
      status: 'active',
      description: '',
      estimatedTime: 15,
      config: {
        maxAttempts: 3,
        showHints: true,
        allowSkip: false,
        autoProgress: false,
        soundEnabled: true,
        animationsEnabled: true,
      },
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'inactive': return '#9E9E9E';
      case 'maintenance': return '#FF9800';
      case 'broken': return '#f44336';
      default: return '#2196F3';
    }
  };

  const getStatusIcon = (activity: Activity) => {
    if (testingActivity === activity.id) {
      return <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>⚙️</motion.div>;
    }
    
    switch (activity.status) {
      case 'active': return activity.isWorking ? <ActiveIcon sx={{ color: '#4CAF50' }} /> : <BugIcon sx={{ color: '#FF9800' }} />;
      case 'broken': return <InactiveIcon sx={{ color: '#f44336' }} />;
      case 'maintenance': return <BugIcon sx={{ color: '#FF9800' }} />;
      default: return <InactiveIcon sx={{ color: '#9E9E9E' }} />;
    }
  };

  const getTypeIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      quiz: '❓',
      game: '🎮',
      exercise: '📝',
      creative: '🎨',
      story: '📚',
      experiment: '🧪',
      drawing: '✏️',
      music: '🎵',
      video: '🎬',
      interactive: '📱',
      simulation: '🔬',
      puzzle: '🧩',
    };
    return icons[type] || '📚';
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#667eea' }}>
        🎮 Gestionnaire d'Activités
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
          <Card sx={{ bgcolor: '#f44336', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4">{activities.filter(a => a.status === 'broken').length}</Typography>
              <Typography variant="body2">{getAdminLabel('outOfOrder', currentLanguage)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#FF9800', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4">{activities.filter(a => a.status === 'maintenance').length}</Typography>
              <Typography variant="body2">{getAdminLabel('maintenance', currentLanguage)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#2196F3', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4">{Math.round(activities.reduce((acc, a) => acc + a.successRate, 0) / activities.length)}%</Typography>
              <Typography variant="body2">{getAdminLabel('successRate', currentLanguage)}</Typography>
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
              {t('interactiveUI.newActivity')}
            </Button>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label={getAdminLabel('search', currentLanguage)}
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>{getAdminLabel('status', currentLanguage)}</InputLabel>
              <Select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                label={getAdminLabel('status', currentLanguage)}
              >
                <MenuItem value="">{getAdminLabel('all', currentLanguage)}</MenuItem>
                <MenuItem value="active">{getAdminLabel('active', currentLanguage)}</MenuItem>
                <MenuItem value="inactive">{getAdminLabel('inactive', currentLanguage)}</MenuItem>
                <MenuItem value="maintenance">{getAdminLabel('maintenance', currentLanguage)}</MenuItem>
                <MenuItem value="broken">{getAdminLabel('broken', currentLanguage)}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>{getAdminLabel('subject', currentLanguage)}</InputLabel>
              <Select
                value={filters.subject}
                onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                label={getAdminLabel('subject', currentLanguage)}
              >
                <MenuItem value="">{getAdminLabel('all', currentLanguage)}</MenuItem>
                <MenuItem value="math">{getAdminLabel('mathematics', currentLanguage)}</MenuItem>
                <MenuItem value="language">{getAdminLabel('languages', currentLanguage)}</MenuItem>
                <MenuItem value="science">{getAdminLabel('sciences', currentLanguage)}</MenuItem>
                <MenuItem value="art">{getAdminLabel('art', currentLanguage)}</MenuItem>
                <MenuItem value="computing">{getAdminLabel('computing', currentLanguage)}</MenuItem>
                <MenuItem value="civic">{getAdminLabel('civic', currentLanguage)}</MenuItem>
                <MenuItem value="hygiene">{getAdminLabel('hygiene', currentLanguage)}</MenuItem>
                <MenuItem value="anatomy">{getAdminLabel('anatomy', currentLanguage)}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>{getAdminLabel('age', currentLanguage)}</InputLabel>
              <Select
                value={filters.ageGroup}
                onChange={(e) => setFilters({ ...filters, ageGroup: e.target.value })}
                label={getAdminLabel('age', currentLanguage)}
              >
                <MenuItem value="">{getAdminLabel('all', currentLanguage)}</MenuItem>
                <MenuItem value="3-5">3-5 ans</MenuItem>
                <MenuItem value="6-8">6-8 ans</MenuItem>
                <MenuItem value="9-12">9-12 ans</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={1}>
            <Typography variant="body2" color="text.secondary">
              {filteredActivities.length} résultat(s)
            </Typography>
          </Grid>
        </Grid>
      </Card>

      {/* Liste des activités */}
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
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ mr: 1 }}>
                          {getTypeIcon(activity.type)}
                        </Typography>
                        {getStatusIcon(activity)}
                      </Box>
                      <Badge badgeContent={activity.errorCount} color="error">
                        <Chip
                          label={activity.status}
                          size="small"
                          sx={{
                            bgcolor: getStatusColor(activity.status),
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        />
                      </Badge>
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                      }}
                    >
                      {activity.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                      }}
                    >
                      {activity.description}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      <Chip label={activity.ageGroup} size="small" variant="outlined" />
                      <Chip label={activity.subject} size="small" variant="outlined" />
                      <Chip label={`${activity.estimatedTime}min`} size="small" variant="outlined" />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Succès: {activity.successRate}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pop: {activity.popularity}%
                      </Typography>
                    </Box>

                    <Typography variant="caption" color="text.secondary">
                      Testé: {activity.lastTested}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <Box>
                      <Tooltip title="Tester l'activité">
                        <IconButton
                          size="small"
                          onClick={() => handleTestActivity(activity.id)}
                          disabled={testingActivity === activity.id}
                          sx={{ color: '#4CAF50' }}
                        >
                          <PlayIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Configuration">
                        <IconButton
                          size="small"
                          onClick={() => openConfigDialog(activity)}
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
                    <FormControlLabel
                      control={
                        <Switch
                          checked={activity.status === 'active'}
                          onChange={() => handleToggleStatus(activity.id)}
                          size="small"
                        />
                      }
                      label=""
                    />
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {filteredActivities.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Aucune activité trouvée
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('interactiveUI.modifyFilters')}
            </Typography>
          </Box>
        )}
      </ScrollableContainer>

      {/* Dialog de formulaire principal */}
      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingActivity ? t('interactiveUI.editActivity') : t('interactiveUI.newActivity')}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={getAdminLabel('activityName', currentLanguage)}
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Type d'activité</InputLabel>
                  <Select
                    value={formData.type || 'quiz'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    label={getAdminLabel('activityType', currentLanguage)}
                  >
                    <MenuItem value="quiz">{getAdminLabel('quiz', currentLanguage)}</MenuItem>
                    <MenuItem value="game">{getAdminLabel('game', currentLanguage)}</MenuItem>
                    <MenuItem value="exercise">{getAdminLabel('exercise', currentLanguage)}</MenuItem>
                    <MenuItem value="creative">{getAdminLabel('creative', currentLanguage)}</MenuItem>
                    <MenuItem value="story">{getAdminLabel('story', currentLanguage)}</MenuItem>
                    <MenuItem value="experiment">{getAdminLabel('experiment', currentLanguage)}</MenuItem>
                    <MenuItem value="drawing">{getAdminLabel('drawing', currentLanguage)}</MenuItem>
                    <MenuItem value="music">{getAdminLabel('music', currentLanguage)}</MenuItem>
                    <MenuItem value="video">{getAdminLabel('video', currentLanguage)}</MenuItem>
                    <MenuItem value="interactive">{getAdminLabel('interactive', currentLanguage)}</MenuItem>
                    <MenuItem value="simulation">{getAdminLabel('simulation', currentLanguage)}</MenuItem>
                    <MenuItem value="puzzle">{getAdminLabel('puzzle', currentLanguage)}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label={getAdminLabel('description', currentLanguage)}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>{getAdminLabel('subject', currentLanguage)}</InputLabel>
                  <Select
                    value={formData.subject || 'math'}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value as any })}
                    label={getAdminLabel('subject', currentLanguage)}
                  >
                    <MenuItem value="math">{getAdminLabel('mathematics', currentLanguage)}</MenuItem>
                    <MenuItem value="language">{getAdminLabel('languages', currentLanguage)}</MenuItem>
                    <MenuItem value="science">{getAdminLabel('sciences', currentLanguage)}</MenuItem>
                    <MenuItem value="art">{getAdminLabel('art', currentLanguage)}</MenuItem>
                    <MenuItem value="computing">{getAdminLabel('computing', currentLanguage)}</MenuItem>
                    <MenuItem value="civic">{getAdminLabel('civic', currentLanguage)}</MenuItem>
                    <MenuItem value="hygiene">{getAdminLabel('hygiene', currentLanguage)}</MenuItem>
                    <MenuItem value="anatomy">{getAdminLabel('anatomy', currentLanguage)}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Groupe d'âge</InputLabel>
                  <Select
                    value={formData.ageGroup || '3-5'}
                    onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value as any })}
                    label={getAdminLabel('ageGroup', currentLanguage)}
                  >
                    <MenuItem value="3-5">3-5 ans</MenuItem>
                    <MenuItem value="6-8">6-8 ans</MenuItem>
                    <MenuItem value="9-12">9-12 ans</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>{getAdminLabel('difficulty', currentLanguage)}</InputLabel>
                  <Select
                    value={formData.difficulty || 'easy'}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                    label={getAdminLabel('difficulty', currentLanguage)}
                  >
                    <MenuItem value="easy">{getAdminLabel('easy', currentLanguage)}</MenuItem>
                    <MenuItem value="medium">{getAdminLabel('medium', currentLanguage)}</MenuItem>
                    <MenuItem value="hard">{getAdminLabel('hard', currentLanguage)}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFormOpen(false)} startIcon={<CancelIcon />}>
            Annuler
          </Button>
          <Button onClick={handleSaveActivity} variant="contained" startIcon={<SaveIcon />}>
            {editingActivity ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de configuration */}
      <Dialog
        open={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Configuration de l'Activité</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label={getAdminLabel('maxAttempts', currentLanguage)}
                  value={formData.config?.maxAttempts || 3}
                  onChange={(e) => setFormData({
                    ...formData,
                    config: {
                      ...formData.config!,
                      maxAttempts: parseInt(e.target.value) || 3
                    }
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.config?.showHints || false}
                      onChange={(e) => setFormData({
                        ...formData,
                        config: {
                          ...formData.config!,
                          showHints: e.target.checked
                        }
                      })}
                    />
                  }
                  label={getAdminLabel('showHints', currentLanguage)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.config?.allowSkip || false}
                      onChange={(e) => setFormData({
                        ...formData,
                        config: {
                          ...formData.config!,
                          allowSkip: e.target.checked
                        }
                      })}
                    />
                  }
                  label={getAdminLabel('allowSkip', currentLanguage)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.config?.autoProgress || false}
                      onChange={(e) => setFormData({
                        ...formData,
                        config: {
                          ...formData.config!,
                          autoProgress: e.target.checked
                        }
                      })}
                    />
                  }
                  label={getAdminLabel('autoProgress', currentLanguage)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.config?.soundEnabled || false}
                      onChange={(e) => setFormData({
                        ...formData,
                        config: {
                          ...formData.config!,
                          soundEnabled: e.target.checked
                        }
                      })}
                    />
                  }
                  label={getAdminLabel('soundsEnabled', currentLanguage)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.config?.animationsEnabled || false}
                      onChange={(e) => setFormData({
                        ...formData,
                        config: {
                          ...formData.config!,
                          animationsEnabled: e.target.checked
                        }
                      })}
                    />
                  }
                  label={getAdminLabel('animationsEnabled', currentLanguage)}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfigOpen(false)} startIcon={<CancelIcon />}>
            Annuler
          </Button>
          <Button onClick={() => {
            handleSaveActivity();
            setIsConfigOpen(false);
          }} variant="contained" startIcon={<SaveIcon />}>
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ActivityManager;