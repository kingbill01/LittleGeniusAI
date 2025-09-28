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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Visibility as PreviewIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { EducationalContent } from '../../utils/educationalContent';
import ScrollableContainer from '../ScrollableContainer';
import { useTranslationService, SupportedLanguage } from '../../services/translationService';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../utils/translations';
import { getAdminLabel } from '../../utils/adminTranslations';

interface ContentManagerProps {
  onNotification: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
}

interface ContentFormData {
  title: { fr: string; en: string; cs: string };
  description: { fr: string; en: string; cs: string };
  ageGroup: '3-5' | '6-8' | '9-12';
  subject: 'math' | 'language' | 'science' | 'art' | 'computing' | 'civic' | 'hygiene' | 'anatomy';
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'quiz' | 'game' | 'exercise' | 'creative' | 'story' | 'experiment' | 'drawing' | 'music' | 'video' | 'interactive' | 'simulation' | 'puzzle';
  estimatedTime: number;
  instructions: { fr: string; en: string; cs: string };
  objectives: Array<{ fr: string; en: string; cs: string }>;
}

export const ContentManager: React.FC<ContentManagerProps> = ({ onNotification }) => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  const translationService = useTranslationService();
  const [contents, setContents] = useState<EducationalContent[]>([]);
  const [filteredContents, setFilteredContents] = useState<EducationalContent[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<EducationalContent | null>(null);
  const [previewContent, setPreviewContent] = useState<EducationalContent | null>(null);
  const [sourceLang, setSourceLang] = useState<SupportedLanguage>('fr');
  const [autoTranslateEnabled, setAutoTranslateEnabled] = useState(true);
  const [filters, setFilters] = useState({
    subject: '',
    ageGroup: '',
    difficulty: '',
    search: '',
  });

  const [formData, setFormData] = useState<ContentFormData>({
    title: { fr: '', en: '', cs: '' },
    description: { fr: '', en: '', cs: '' },
    ageGroup: '3-5',
    subject: 'math',
    difficulty: 'easy',
    type: 'quiz',
    estimatedTime: 10,
    instructions: { fr: '', en: '', cs: '' },
    objectives: [{ fr: '', en: '', cs: '' }],
  });

  useEffect(() => {
    loadContents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [contents, filters]);

  const loadContents = async () => {
    try {
      // Charger les contenus depuis le système existant
      const { getContentByAgeAndSubject } = await import('../../utils/educationalContent');
      
      const allContents: EducationalContent[] = [];
      const subjects = ['math', 'language', 'science', 'art', 'computing', 'civic', 'hygiene', 'anatomy'] as const;
      const ageGroups = ['3-5', '6-8', '9-12'] as const;

      for (const subject of subjects) {
        for (const ageGroup of ageGroups) {
          try {
            const subjectContents = getContentByAgeAndSubject(ageGroup, subject);
            allContents.push(...subjectContents);
          } catch (error) {
            console.warn(`Erreur lors du chargement ${subject} ${ageGroup}:`, error);
          }
        }
      }

      setContents(allContents);
      onNotification(`${allContents.length} contenus chargés`, 'success');
    } catch (error) {
      console.error('Erreur lors du chargement des contenus:', error);
      onNotification('Erreur lors du chargement des contenus', 'error');
    }
  };

  const applyFilters = () => {
    let filtered = [...contents];

    if (filters.subject) {
      filtered = filtered.filter(content => content.subject === filters.subject);
    }
    if (filters.ageGroup) {
      filtered = filtered.filter(content => content.ageGroup === filters.ageGroup);
    }
    if (filters.difficulty) {
      filtered = filtered.filter(content => content.difficulty === filters.difficulty);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(content =>
        content.title.fr.toLowerCase().includes(searchLower) ||
        content.title.en.toLowerCase().includes(searchLower) ||
        content.description.fr.toLowerCase().includes(searchLower) ||
        content.description.en.toLowerCase().includes(searchLower)
      );
    }

    setFilteredContents(filtered);
  };

  const handleSaveContent = () => {
    try {
      const newContent: EducationalContent = {
        id: editingContent?.id || `content-${Date.now()}`,
        ...formData,
        content: editingContent?.content || {},
      };

      if (editingContent) {
        // Mise à jour
        const updatedContents = contents.map(content =>
          content.id === editingContent.id ? newContent : content
        );
        setContents(updatedContents);
        onNotification('Contenu mis à jour avec succès', 'success');
      } else {
        // Nouveau contenu
        setContents([...contents, newContent]);
        onNotification('Nouveau contenu créé avec succès', 'success');
      }

      setIsFormOpen(false);
      setEditingContent(null);
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      onNotification('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleDeleteContent = (contentId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contenu ?')) {
      const updatedContents = contents.filter(content => content.id !== contentId);
      setContents(updatedContents);
      onNotification('Contenu supprimé avec succès', 'success');
    }
  };

  const openEditForm = (content: EducationalContent) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      description: content.description,
      ageGroup: content.ageGroup,
      subject: content.subject,
      difficulty: content.difficulty,
      type: content.type,
      estimatedTime: content.estimatedTime,
      instructions: content.instructions,
      objectives: content.objectives,
    });
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: { fr: '', en: '', cs: '' },
      description: { fr: '', en: '', cs: '' },
      ageGroup: '3-5',
      subject: 'math',
      difficulty: 'easy',
      type: 'quiz',
      estimatedTime: 10,
      instructions: { fr: '', en: '', cs: '' },
      objectives: [{ fr: '', en: '', cs: '' }],
    });
  };

  // Fonction de traduction automatique
  const handleAutoTranslate = (field: 'title' | 'description' | 'instructions', text: string, sourceLang: SupportedLanguage) => {
    if (!autoTranslateEnabled || !text.trim()) return;

    const translations = translationService.translateToAll(text, sourceLang);
    
    setFormData(prev => ({
      ...prev,
      [field]: translations
    }));

    onNotification(`Traduction automatique appliquée pour ${field}`, 'success');
  };

  // Fonction pour traduire un objectif spécifique
  const handleTranslateObjective = (index: number, text: string, sourceLang: SupportedLanguage) => {
    if (!autoTranslateEnabled || !text.trim()) return;

    const translations = translationService.translateToAll(text, sourceLang);
    
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => 
        i === index ? translations : obj
      )
    }));
  };

  // Fonction pour ajouter un objectif
  const addObjective = () => {
    setFormData(prev => ({
      ...prev,
      objectives: [...prev.objectives, { fr: '', en: '', cs: '' }]
    }));
  };

  // Fonction pour supprimer un objectif
  const removeObjective = (index: number) => {
    if (formData.objectives.length > 1) {
      setFormData(prev => ({
        ...prev,
        objectives: prev.objectives.filter((_, i) => i !== index)
      }));
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

  const getSubjectIcon = (subject: string) => {
    const icons: { [key: string]: string } = {
      math: '🔢',
      language: '📖',
      science: '🔬',
      art: '🎨',
      computing: '💻',
      civic: '🏛️',
      hygiene: '🫧',
      anatomy: '🧠',
    };
    return icons[subject] || '📚';
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#667eea' }}>
        📚 {t('admin.contentManager')}
      </Typography>

      {/* Barre d'outils et filtres */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                resetForm();
                setEditingContent(null);
                setIsFormOpen(true);
              }}
              fullWidth
              sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              {t('admin.newContent')}
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
              <InputLabel>{t('admin.age')}</InputLabel>
              <Select
                value={filters.ageGroup}
                onChange={(e) => setFilters({ ...filters, ageGroup: e.target.value })}
                label={t('admin.age')}
              >
                <MenuItem value="">{t('admin.all')}</MenuItem>
                <MenuItem value="3-5">{t('ageGroups.3-5')}</MenuItem>
                <MenuItem value="6-8">{t('ageGroups.6-8')}</MenuItem>
                <MenuItem value="9-12">{t('ageGroups.9-12')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>{t('admin.difficulty')}</InputLabel>
              <Select
                value={filters.difficulty}
                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                label={t('admin.difficulty')}
              >
                <MenuItem value="">{t('admin.all')}</MenuItem>
                <MenuItem value="easy">{t('difficulties.easy')}</MenuItem>
                <MenuItem value="medium">{t('difficulties.medium')}</MenuItem>
                <MenuItem value="hard">{t('difficulties.hard')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={1}>
            <Typography variant="body2" color="text.secondary">
              {filteredContents.length} résultat(s)
            </Typography>
          </Grid>
        </Grid>
      </Card>

      {/* Liste des contenus */}
      <Box sx={{ height: '65vh', overflow: 'auto', backgroundColor: '#f5f5f5', borderRadius: 2, p: 2 }}>
        <Grid container spacing={2}>
          {filteredContents.map((content, index) => (
            <Grid item xs={12} sm={6} md={4} key={content.id}>
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
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h5" sx={{ mr: 1 }}>
                        {getSubjectIcon(content.subject)}
                      </Typography>
                      <Chip
                        label={content.difficulty}
                        size="small"
                        sx={{
                          bgcolor: getDifficultyColor(content.difficulty),
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      />
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
                      {content.title.fr}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                      }}
                    >
                      {content.description.fr}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip label={content.ageGroup} size="small" variant="outlined" />
                      <Chip label={content.subject} size="small" variant="outlined" />
                      <Chip label={`${content.estimatedTime}min`} size="small" variant="outlined" />
                    </Box>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => setPreviewContent(content)}
                        sx={{ color: '#2196F3' }}
                      >
                        <PreviewIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => openEditForm(content)}
                        sx={{ color: '#FF9800' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteContent(content.id)}
                        sx={{ color: '#f44336' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {filteredContents.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              {t('admin.noContentFound')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('admin.tryModifyFilters')}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Dialog de formulaire */}
      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { maxHeight: '90vh' } }}
      >
        <DialogTitle>
          {editingContent ? t('admin.editContent') : t('admin.newContent')}
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
                      value={formData.title.fr}
                      onChange={(e) => setFormData({
                        ...formData,
                        title: { ...formData.title, fr: e.target.value }
                      })}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Title (English)"
                      value={formData.title.en}
                      onChange={(e) => setFormData({
                        ...formData,
                        title: { ...formData.title, en: e.target.value }
                      })}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Název (Čeština)"
                      value={formData.title.cs}
                      onChange={(e) => setFormData({
                        ...formData,
                        title: { ...formData.title, cs: e.target.value }
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
                      value={formData.description.fr}
                      onChange={(e) => setFormData({
                        ...formData,
                        description: { ...formData.description, fr: e.target.value }
                      })}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Description (English)"
                      value={formData.description.en}
                      onChange={(e) => setFormData({
                        ...formData,
                        description: { ...formData.description, en: e.target.value }
                      })}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Popis (Čeština)"
                      value={formData.description.cs}
                      onChange={(e) => setFormData({
                        ...formData,
                        description: { ...formData.description, cs: e.target.value }
                      })}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Paramètres */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel>Groupe d'âge</InputLabel>
                      <Select
                        value={formData.ageGroup}
                        onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value as any })}
                        label={getAdminLabel('ageGroup', currentLanguage)}
                      >
                        <MenuItem value="3-5">3-5 ans</MenuItem>
                        <MenuItem value="6-8">6-8 ans</MenuItem>
                        <MenuItem value="9-12">9-12 ans</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel>{getAdminLabel('subject', currentLanguage)}</InputLabel>
                      <Select
                        value={formData.subject}
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
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel>{getAdminLabel('difficulty', currentLanguage)}</InputLabel>
                      <Select
                        value={formData.difficulty}
                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                        label={getAdminLabel('difficulty', currentLanguage)}
                      >
                        <MenuItem value="easy">{getAdminLabel('easy', currentLanguage)}</MenuItem>
                        <MenuItem value="medium">{getAdminLabel('medium', currentLanguage)}</MenuItem>
                        <MenuItem value="hard">{getAdminLabel('hard', currentLanguage)}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Temps estimé (min)"
                      value={formData.estimatedTime}
                      onChange={(e) => setFormData({ ...formData, estimatedTime: parseInt(e.target.value) || 10 })}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFormOpen(false)} startIcon={<CancelIcon />}>
            {t('admin.cancel')}
          </Button>
          <Button onClick={handleSaveContent} variant="contained" startIcon={<SaveIcon />}>
            {editingContent ? t('admin.update') : t('admin.create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de prévisualisation */}
      <Dialog
        open={!!previewContent}
        onClose={() => setPreviewContent(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{t('admin.contentPreview')}</DialogTitle>
        <DialogContent>
          {previewContent && (
            <Box>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {previewContent.title.fr}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {previewContent.description.fr}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label={previewContent.ageGroup} />
                <Chip label={previewContent.subject} />
                <Chip label={previewContent.difficulty} />
                <Chip label={`${previewContent.estimatedTime}min`} />
              </Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Instructions:</strong> {previewContent.instructions.fr}
              </Typography>
              <Typography variant="body2">
                <strong>Objectifs:</strong>
              </Typography>
              <ul>
                {previewContent.objectives.map((objective, index) => (
                  <li key={index}>{objective.fr}</li>
                ))}
              </ul>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewContent(null)}>{getAdminLabel('close', currentLanguage)}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContentManager;