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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Alert,
  Tooltip,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CheckCircle as CorrectIcon,
  Error as IncorrectIcon,
  QuestionAnswer as QuestionIcon,
  Quiz as QuizIcon,
  AddCircle as AddAnswerIcon,
  RemoveCircle as RemoveAnswerIcon,
  Visibility as PreviewIcon,
  CheckBox as ValidateIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ScrollableContainer from '../ScrollableContainer';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../utils/translations';
import { getAdminLabel } from '../../utils/adminTranslations';

interface QuestionManagerProps {
  onNotification: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
}

interface Answer {
  id: string;
  text: { fr: string; en: string; cs: string };
  isCorrect: boolean;
  explanation?: { fr: string; en: string; cs: string };
}

interface Question {
  id: string;
  text: { fr: string; en: string; cs: string };
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'matching' | 'ordering';
  subject: 'math' | 'language' | 'science' | 'art' | 'computing' | 'civic' | 'hygiene' | 'anatomy';
  ageGroup: '3-5' | '6-8' | '9-12';
  difficulty: 'easy' | 'medium' | 'hard';
  answers: Answer[];
  hint?: { fr: string; en: string; cs: string };
  explanation?: { fr: string; en: string; cs: string };
  points: number;
  timeLimit?: number;
  tags: string[];
  isValidated: boolean;
  validationNotes?: string;
  usage: {
    timesUsed: number;
    correctRate: number;
    avgTimeToAnswer: number;
  };
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: 'math-add-q1',
    text: {
      fr: 'Combien font 2 + 3 ?',
      en: 'What is 2 + 3?',
      cs: 'Kolik je 2 + 3?',
    },
    type: 'multiple-choice',
    subject: 'math',
    ageGroup: '3-5',
    difficulty: 'easy',
    answers: [
      {
        id: 'a1',
        text: { fr: '5', en: '5', cs: '5' },
        isCorrect: true,
        explanation: { fr: '2 + 3 = 5', en: '2 + 3 = 5', cs: '2 + 3 = 5' },
      },
      {
        id: 'a2',
        text: { fr: '4', en: '4', cs: '4' },
        isCorrect: false,
      },
      {
        id: 'a3',
        text: { fr: '6', en: '6', cs: '6' },
        isCorrect: false,
      },
    ],
    hint: {
      fr: 'Compte sur tes doigts !',
      en: 'Count on your fingers!',
      cs: 'Počítej na prstech!',
    },
    points: 10,
    timeLimit: 30,
    tags: ['addition', 'basic', 'numbers'],
    isValidated: true,
    usage: {
      timesUsed: 150,
      correctRate: 85,
      avgTimeToAnswer: 12,
    },
  },
  {
    id: 'lang-grammar-q1',
    text: {
      fr: 'Quel est le genre du mot "maison" ?',
      en: 'What is the gender of the word "house" in French?',
      cs: 'Jaký je rod slova "maison" ve francouzštině?',
    },
    type: 'multiple-choice',
    subject: 'language',
    ageGroup: '6-8',
    difficulty: 'medium',
    answers: [
      {
        id: 'a1',
        text: { fr: 'Féminin', en: 'Feminine', cs: 'Ženský' },
        isCorrect: true,
        explanation: {
          fr: 'On dit "une maison", donc c\'est féminin',
          en: 'We say "une maison", so it\'s feminine',
          cs: 'Říkáme "une maison", takže je to ženský rod',
        },
      },
      {
        id: 'a2',
        text: { fr: 'Masculin', en: 'Masculine', cs: 'Mužský' },
        isCorrect: false,
      },
    ],
    points: 15,
    tags: ['grammar', 'gender', 'french'],
    isValidated: false,
    validationNotes: 'Vérifier la formulation de la question',
    usage: {
      timesUsed: 45,
      correctRate: 65,
      avgTimeToAnswer: 25,
    },
  },
];

export const QuestionManager: React.FC<QuestionManagerProps> = ({ onNotification }) => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(MOCK_QUESTIONS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [previewQuestion, setPreviewQuestion] = useState<Question | null>(null);
  
  const [filters, setFilters] = useState({
    subject: '',
    ageGroup: '',
    difficulty: '',
    type: '',
    validated: '',
    search: '',
  });

  const [formData, setFormData] = useState<Partial<Question>>({
    text: { fr: '', en: '', cs: '' },
    type: 'multiple-choice',
    subject: 'math',
    ageGroup: '3-5',
    difficulty: 'easy',
    answers: [
      { id: 'a1', text: { fr: '', en: '', cs: '' }, isCorrect: false },
      { id: 'a2', text: { fr: '', en: '', cs: '' }, isCorrect: false },
    ],
    hint: { fr: '', en: '', cs: '' },
    explanation: { fr: '', en: '', cs: '' },
    points: 10,
    timeLimit: 60,
    tags: [],
    isValidated: false,
  });

  useEffect(() => {
    applyFilters();
  }, [questions, filters]);

  const applyFilters = () => {
    let filtered = [...questions];

    if (filters.subject) {
      filtered = filtered.filter(q => q.subject === filters.subject);
    }
    if (filters.ageGroup) {
      filtered = filtered.filter(q => q.ageGroup === filters.ageGroup);
    }
    if (filters.difficulty) {
      filtered = filtered.filter(q => q.difficulty === filters.difficulty);
    }
    if (filters.type) {
      filtered = filtered.filter(q => q.type === filters.type);
    }
    if (filters.validated !== '') {
      const isValidated = filters.validated === 'true';
      filtered = filtered.filter(q => q.isValidated === isValidated);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(q =>
        q.text.fr.toLowerCase().includes(searchLower) ||
        q.text.en.toLowerCase().includes(searchLower) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    setFilteredQuestions(filtered);
  };

  const handleSaveQuestion = () => {
    try {
      // Validation
      if (!formData.text?.fr?.trim()) {
        onNotification('Le texte de la question en français est requis', 'error');
        return;
      }

      if (!formData.answers || formData.answers.length === 0) {
        onNotification('Au moins une réponse est requise', 'error');
        return;
      }

      const hasCorrectAnswer = formData.answers.some(answer => answer.isCorrect);
      if (!hasCorrectAnswer) {
        onNotification('Au moins une réponse correcte est requise', 'error');
        return;
      }

      const newQuestion: Question = {
        ...formData,
        id: editingQuestion?.id || `question-${Date.now()}`,
        usage: editingQuestion?.usage || {
          timesUsed: 0,
          correctRate: 0,
          avgTimeToAnswer: 0,
        },
      } as Question;

      if (editingQuestion) {
        const updatedQuestions = questions.map(q =>
          q.id === editingQuestion.id ? newQuestion : q
        );
        setQuestions(updatedQuestions);
        onNotification('Question mise à jour avec succès', 'success');
      } else {
        setQuestions([...questions, newQuestion]);
        onNotification(t('interactiveUI.questionCreated'), 'success');
      }

      setIsFormOpen(false);
      setEditingQuestion(null);
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      onNotification('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette question ?')) {
      const updatedQuestions = questions.filter(q => q.id !== questionId);
      setQuestions(updatedQuestions);
      onNotification('Question supprimée avec succès', 'success');
    }
  };

  const handleToggleValidation = (questionId: string) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        return { ...q, isValidated: !q.isValidated };
      }
      return q;
    });
    setQuestions(updatedQuestions);
    onNotification('Statut de validation modifié', 'success');
  };

  const openEditForm = (question: Question) => {
    setEditingQuestion(question);
    setFormData(question);
    setIsFormOpen(true);
  };

  const openPreview = (question: Question) => {
    setPreviewQuestion(question);
    setIsPreviewOpen(true);
  };

  const resetForm = () => {
    setFormData({
      text: { fr: '', en: '', cs: '' },
      type: 'multiple-choice',
      subject: 'math',
      ageGroup: '3-5',
      difficulty: 'easy',
      answers: [
        { id: 'a1', text: { fr: '', en: '', cs: '' }, isCorrect: false },
        { id: 'a2', text: { fr: '', en: '', cs: '' }, isCorrect: false },
      ],
      hint: { fr: '', en: '', cs: '' },
      explanation: { fr: '', en: '', cs: '' },
      points: 10,
      timeLimit: 60,
      tags: [],
      isValidated: false,
    });
  };

  const addAnswer = () => {
    if (formData.answers && formData.answers.length < 6) {
      const newAnswer: Answer = {
        id: `a${formData.answers.length + 1}`,
        text: { fr: '', en: '', cs: '' },
        isCorrect: false,
      };
      setFormData({
        ...formData,
        answers: [...formData.answers, newAnswer],
      });
    }
  };

  const removeAnswer = (answerId: string) => {
    if (formData.answers && formData.answers.length > 2) {
      setFormData({
        ...formData,
        answers: formData.answers.filter(a => a.id !== answerId),
      });
    }
  };

  const updateAnswer = (answerId: string, field: keyof Answer, value: any) => {
    if (formData.answers) {
      const updatedAnswers = formData.answers.map(answer => {
        if (answer.id === answerId) {
          return { ...answer, [field]: value };
        }
        return answer;
      });
      setFormData({ ...formData, answers: updatedAnswers });
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

  const getTypeIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      'multiple-choice': '🔘',
      'true-false': '✓❌',
      'fill-blank': '📝',
      'matching': '🔗',
      'ordering': '📋',
    };
    return icons[type] || '❓';
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#667eea' }}>
        ❓ Gestionnaire de Questions
      </Typography>

      {/* Statistiques rapides */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#4CAF50', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4">{questions.filter(q => q.isValidated).length}</Typography>
              <Typography variant="body2">Validées</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#FF9800', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4">{questions.filter(q => !q.isValidated).length}</Typography>
              <Typography variant="body2">En attente</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#2196F3', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4">
                {Math.round(questions.reduce((acc, q) => acc + q.usage.correctRate, 0) / questions.length)}%
              </Typography>
              <Typography variant="body2">Taux de réussite</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#9C27B0', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4">
                {questions.reduce((acc, q) => acc + q.usage.timesUsed, 0)}
              </Typography>
              <Typography variant="body2">Utilisations</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Barre d'outils et filtres */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                resetForm();
                setEditingQuestion(null);
                setIsFormOpen(true);
              }}
              fullWidth
              sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              {t('interactiveUI.newQuestion')}
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

          <Grid item xs={12} md={1.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Type</InputLabel>
              <Select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                label={getAdminLabel('type', currentLanguage)}
              >
                <MenuItem value="">Tous</MenuItem>
                <MenuItem value="multiple-choice">QCM</MenuItem>
                <MenuItem value="true-false">Vrai/Faux</MenuItem>
                <MenuItem value="fill-blank">Texte à trous</MenuItem>
                <MenuItem value="matching">Appariement</MenuItem>
                <MenuItem value="ordering">Classement</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={1.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Matière</InputLabel>
              <Select
                value={filters.subject}
                onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                label={getAdminLabel('subject', currentLanguage)}
              >
                <MenuItem value="">Toutes</MenuItem>
                <MenuItem value="math">Math</MenuItem>
                <MenuItem value="language">Langues</MenuItem>
                <MenuItem value="science">Sciences</MenuItem>
                <MenuItem value="art">Art</MenuItem>
                <MenuItem value="computing">Info</MenuItem>
                <MenuItem value="civic">Civique</MenuItem>
                <MenuItem value="hygiene">Hygiène</MenuItem>
                <MenuItem value="anatomy">Anatomie</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={1.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Âge</InputLabel>
              <Select
                value={filters.ageGroup}
                onChange={(e) => setFilters({ ...filters, ageGroup: e.target.value })}
                label={getAdminLabel('age', currentLanguage)}
              >
                <MenuItem value="">Tous</MenuItem>
                <MenuItem value="3-5">3-5 ans</MenuItem>
                <MenuItem value="6-8">6-8 ans</MenuItem>
                <MenuItem value="9-12">9-12 ans</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={1.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Validation</InputLabel>
              <Select
                value={filters.validated}
                onChange={(e) => setFilters({ ...filters, validated: e.target.value })}
                label="Validation"
              >
                <MenuItem value="">Toutes</MenuItem>
                <MenuItem value="true">Validées</MenuItem>
                <MenuItem value="false">En attente</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={1}>
            <Typography variant="body2" color="text.secondary">
              {filteredQuestions.length} résultat(s)
            </Typography>
          </Grid>
        </Grid>
      </Card>

      {/* Liste des questions */}
      <ScrollableContainer maxHeight="60vh" showScrollToTop={true}>
        <Grid container spacing={2}>
          {filteredQuestions.map((question, index) => (
            <Grid item xs={12} key={question.id}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.02 * index }}
              >
                <Card
                  sx={{
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease',
                    border: question.isValidated ? '1px solid #4CAF50' : '1px solid #FF9800',
                  }}
                >
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={8}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" sx={{ mr: 1 }}>
                            {getTypeIcon(question.type)}
                          </Typography>
                          <Chip
                            label={question.difficulty}
                            size="small"
                            sx={{
                              bgcolor: getDifficultyColor(question.difficulty),
                              color: 'white',
                              fontWeight: 'bold',
                              mr: 1,
                            }}
                          />
                          {question.isValidated ? (
                            <Tooltip title={getAdminLabel('validated_question', currentLanguage)}>
                              <CorrectIcon sx={{ color: '#4CAF50', mr: 1 }} />
                            </Tooltip>
                          ) : (
                            <Tooltip title={getAdminLabel('pending_validation', currentLanguage)}>
                              <IncorrectIcon sx={{ color: '#FF9800', mr: 1 }} />
                            </Tooltip>
                          )}
                          <Typography variant="body2" color="text.secondary">
                            #{question.id}
                          </Typography>
                        </Box>

                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 'medium',
                            mb: 2,
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                          }}
                        >
                          {question.text.fr}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                          <Chip label={question.ageGroup} size="small" variant="outlined" />
                          <Chip label={question.subject} size="small" variant="outlined" />
                          <Chip label={question.type} size="small" variant="outlined" />
                          <Chip label={`${question.points} pts`} size="small" variant="outlined" />
                          {question.timeLimit && (
                            <Chip label={`${question.timeLimit}s`} size="small" variant="outlined" />
                          )}
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {question.tags.map(tag => (
                            <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
                          ))}
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Utilisée {question.usage.timesUsed} fois
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Réussite: {question.usage.correctRate}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Temps moyen: {question.usage.avgTimeToAnswer}s
                          </Typography>

                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <Tooltip title="Prévisualiser">
                              <IconButton
                                size="small"
                                onClick={() => openPreview(question)}
                                sx={{ color: '#2196F3' }}
                              >
                                <PreviewIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Modifier">
                              <IconButton
                                size="small"
                                onClick={() => openEditForm(question)}
                                sx={{ color: '#FF9800' }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Supprimer">
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteQuestion(question.id)}
                                sx={{ color: '#f44336' }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={question.isValidated ? 'Invalider' : 'Valider'}>
                              <IconButton
                                size="small"
                                onClick={() => handleToggleValidation(question.id)}
                                sx={{ color: question.isValidated ? '#4CAF50' : '#FF9800' }}
                              >
                                {question.isValidated ? <CorrectIcon /> : <IncorrectIcon />}
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>

                    {question.validationNotes && (
                      <Alert severity="warning" sx={{ mt: 2 }}>
                        <strong>Notes de validation:</strong> {question.validationNotes}
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {filteredQuestions.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Aucune question trouvée
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('interactiveUI.modifyFiltersQuestion')}
            </Typography>
          </Box>
        )}
      </ScrollableContainer>

      {/* Dialog de formulaire */}
      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{ sx: { maxHeight: '90vh' } }}
      >
        <DialogTitle>
          {editingQuestion ? t('interactiveUI.editQuestion') : t('interactiveUI.newQuestion')}
        </DialogTitle>
        <DialogContent>
          <ScrollableContainer maxHeight="70vh">
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                {/* Texte de la question */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Question</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Question (Français)"
                        value={formData.text?.fr || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          text: { ...formData.text!, fr: e.target.value }
                        })}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Question (English)"
                        value={formData.text?.en || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          text: { ...formData.text!, en: e.target.value }
                        })}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Otázka (Čeština)"
                        value={formData.text?.cs || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          text: { ...formData.text!, cs: e.target.value }
                        })}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Paramètres */}
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                          value={formData.type || 'multiple-choice'}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                          label={getAdminLabel('type', currentLanguage)}
                        >
                          <MenuItem value="multiple-choice">QCM</MenuItem>
                          <MenuItem value="true-false">Vrai/Faux</MenuItem>
                          <MenuItem value="fill-blank">Texte à trous</MenuItem>
                          <MenuItem value="matching">Appariement</MenuItem>
                          <MenuItem value="ordering">Classement</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl fullWidth>
                        <InputLabel>Matière</InputLabel>
                        <Select
                          value={formData.subject || 'math'}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value as any })}
                          label={getAdminLabel('subject', currentLanguage)}
                        >
                          <MenuItem value="math">Mathématiques</MenuItem>
                          <MenuItem value="language">Langues</MenuItem>
                          <MenuItem value="science">Sciences</MenuItem>
                          <MenuItem value="art">Art</MenuItem>
                          <MenuItem value="computing">Informatique</MenuItem>
                          <MenuItem value="civic">Civique</MenuItem>
                          <MenuItem value="hygiene">Hygiène</MenuItem>
                          <MenuItem value="anatomy">Anatomie</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl fullWidth>
                        <InputLabel>Âge</InputLabel>
                        <Select
                          value={formData.ageGroup || '3-5'}
                          onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value as any })}
                          label={getAdminLabel('age', currentLanguage)}
                        >
                          <MenuItem value="3-5">3-5 ans</MenuItem>
                          <MenuItem value="6-8">6-8 ans</MenuItem>
                          <MenuItem value="9-12">9-12 ans</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl fullWidth>
                        <InputLabel>Difficulté</InputLabel>
                        <Select
                          value={formData.difficulty || 'easy'}
                          onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                          label={getAdminLabel('difficulty', currentLanguage)}
                        >
                          <MenuItem value="easy">Facile</MenuItem>
                          <MenuItem value="medium">Moyen</MenuItem>
                          <MenuItem value="hard">Difficile</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Points"
                        value={formData.points || 10}
                        onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 10 })}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Temps limite (s)"
                        value={formData.timeLimit || ''}
                        onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) || undefined })}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Réponses */}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Réponses</Typography>
                    <Button
                      startIcon={<AddAnswerIcon />}
                      onClick={addAnswer}
                      disabled={!formData.answers || formData.answers.length >= 6}
                      size="small"
                    >
                      Ajouter une réponse
                    </Button>
                  </Box>

                  {formData.answers?.map((answer, index) => (
                    <Card key={answer.id} sx={{ mb: 2, p: 2, bgcolor: answer.isCorrect ? '#f0f8ff' : 'inherit' }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={1}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={answer.isCorrect}
                                onChange={(e) => updateAnswer(answer.id, 'isCorrect', e.target.checked)}
                                color="success"
                              />
                            }
                            label=""
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            label={`Réponse ${index + 1} (FR)`}
                            value={answer.text.fr}
                            onChange={(e) => updateAnswer(answer.id, 'text', { ...answer.text, fr: e.target.value })}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            label={`Answer ${index + 1} (EN)`}
                            value={answer.text.en}
                            onChange={(e) => updateAnswer(answer.id, 'text', { ...answer.text, en: e.target.value })}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            label={`Odpověď ${index + 1} (CS)`}
                            value={answer.text.cs}
                            onChange={(e) => updateAnswer(answer.id, 'text', { ...answer.text, cs: e.target.value })}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <IconButton
                            onClick={() => removeAnswer(answer.id)}
                            disabled={!formData.answers || formData.answers.length <= 2}
                            color="error"
                            size="small"
                          >
                            <RemoveAnswerIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                </Grid>

                {/* Indice et explication */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Indice (optionnel)</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        label="Indice (Français)"
                        value={formData.hint?.fr || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          hint: { ...formData.hint!, fr: e.target.value }
                        })}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        label="Hint (English)"
                        value={formData.hint?.en || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          hint: { ...formData.hint!, en: e.target.value }
                        })}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        label="Nápověda (Čeština)"
                        value={formData.hint?.cs || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          hint: { ...formData.hint!, cs: e.target.value }
                        })}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isValidated || false}
                        onChange={(e) => setFormData({ ...formData, isValidated: e.target.checked })}
                      />
                    }
                    label="Marquer comme validée"
                  />
                </Grid>
              </Grid>
            </Box>
          </ScrollableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFormOpen(false)} startIcon={<CancelIcon />}>
            Annuler
          </Button>
          <Button onClick={handleSaveQuestion} variant="contained" startIcon={<SaveIcon />}>
            {editingQuestion ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de prévisualisation */}
      <Dialog
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Prévisualisation de la Question</DialogTitle>
        <DialogContent>
          {previewQuestion && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                {previewQuestion.text.fr}
              </Typography>

              <Box sx={{ mb: 3 }}>
                {previewQuestion.answers.map((answer, index) => (
                  <Box
                    key={answer.id}
                    sx={{
                      p: 2,
                      mb: 1,
                      border: 1,
                      borderColor: answer.isCorrect ? '#4CAF50' : '#e0e0e0',
                      borderRadius: 1,
                      bgcolor: answer.isCorrect ? '#f0f8ff' : 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Radio checked={answer.isCorrect} color="success" />
                    <Typography sx={{ ml: 1 }}>
                      {answer.text.fr}
                    </Typography>
                    {answer.isCorrect && (
                      <CorrectIcon sx={{ ml: 'auto', color: '#4CAF50' }} />
                    )}
                  </Box>
                ))}
              </Box>

              {previewQuestion.hint?.fr && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  <strong>Indice:</strong> {previewQuestion.hint.fr}
                </Alert>
              )}

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label={previewQuestion.ageGroup} />
                <Chip label={previewQuestion.subject} />
                <Chip label={previewQuestion.difficulty} />
                <Chip label={`${previewQuestion.points} points`} />
                {previewQuestion.timeLimit && (
                  <Chip label={`${previewQuestion.timeLimit} secondes`} />
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPreviewOpen(false)}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuestionManager;