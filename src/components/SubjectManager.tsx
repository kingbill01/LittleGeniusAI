import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Divider,
  Chip,
  Alert,
} from '@mui/material';
import { User } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../utils/translations';

interface SubjectManagerProps {
  open: boolean;
  onClose: () => void;
  user: User;
  onSave: (updatedSubjects: string[]) => void;
}

export const SubjectManager: React.FC<SubjectManagerProps> = ({
  open,
  onClose,
  user,
  onSave,
}) => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    user.parentalControls.allowedSubjects
  );

  const allSubjects = [
    { id: 'math', name: t('subjects.math'), icon: '🔢', recommended: true },
    { id: 'language', name: t('subjects.language'), icon: '📖', recommended: true },
    { id: 'science', name: t('subjects.science'), icon: '🔬', recommended: true },
    { id: 'art', name: t('subjects.art'), icon: '🎨', recommended: true },
    { id: 'computing', name: t('subjects.computing'), icon: '💻', recommended: false },
    { id: 'anatomy', name: t('subjects.anatomy'), icon: '🧠', recommended: false },
    { id: 'civic', name: t('subjects.civic'), icon: '🏛️', recommended: false },
    { id: 'hygiene', name: t('subjects.hygiene'), icon: '🫧', recommended: false },
  ];

  const getSubjectsByAge = () => {
    if (user.age <= 5) {
      return allSubjects.filter(s => ['math', 'language', 'art', 'hygiene'].includes(s.id));
    } else if (user.age <= 8) {
      return allSubjects.filter(s => !['anatomy', 'civic'].includes(s.id));
    }
    return allSubjects; // Toutes les matières pour 9-12 ans
  };

  const availableSubjects = getSubjectsByAge();

  const handleSubjectChange = (subjectId: string, checked: boolean) => {
    if (checked) {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    } else {
      setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
    }
  };

  const handleSave = () => {
    onSave(selectedSubjects);
    onClose();
  };

  const recommendedSubjects = availableSubjects.filter(s => s.recommended);
  const advancedSubjects = availableSubjects.filter(s => !s.recommended);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5" sx={{ fontFamily: '"Fredoka One", cursive' }}>
          📚 Gérer les matières pour {user.name}
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ 
        maxHeight: '70vh', 
        overflowY: 'auto',
        pr: 1,
      }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Âge: {user.age} ans - Sélectionnez les matières adaptées à votre enfant
        </Alert>

        {/* Matières recommandées */}
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          ⭐ Matières recommandées
        </Typography>
        <FormGroup sx={{ mb: 3 }}>
          {recommendedSubjects.map((subject) => (
            <FormControlLabel
              key={subject.id}
              control={
                <Checkbox
                  checked={selectedSubjects.includes(subject.id)}
                  onChange={(e) => handleSubjectChange(subject.id, e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span style={{ fontSize: '1.2rem' }}>{subject.icon}</span>
                  <Typography>{subject.name}</Typography>
                  <Chip label="Recommandé" size="small" color="primary" />
                </Box>
              }
            />
          ))}
        </FormGroup>

        <Divider sx={{ my: 2 }} />

        {/* Matières avancées */}
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          🚀 Matières avancées
        </Typography>
        <FormGroup>
          {advancedSubjects.map((subject) => (
            <FormControlLabel
              key={subject.id}
              control={
                <Checkbox
                  checked={selectedSubjects.includes(subject.id)}
                  onChange={(e) => handleSubjectChange(subject.id, e.target.checked)}
                  color="secondary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span style={{ fontSize: '1.2rem' }}>{subject.icon}</span>
                  <Typography>{subject.name}</Typography>
                  <Chip label="Avancé" size="small" color="secondary" />
                </Box>
              }
            />
          ))}
        </FormGroup>

        {selectedSubjects.length === 0 && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Veuillez sélectionner au moins une matière pour votre enfant.
          </Alert>
        )}

        {/* Aperçu des matières sélectionnées */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Matières sélectionnées ({selectedSubjects.length}) :
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {selectedSubjects.map((subjectId) => {
              const subject = allSubjects.find(s => s.id === subjectId);
              return subject ? (
                <Chip
                  key={subjectId}
                  label={`${subject.icon} ${subject.name}`}
                  color="primary"
                  onDelete={() => handleSubjectChange(subjectId, false)}
                />
              ) : null;
            })}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Annuler
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          disabled={selectedSubjects.length === 0}
        >
          Sauvegarder les matières
        </Button>
      </DialogActions>
    </Dialog>
  );
};