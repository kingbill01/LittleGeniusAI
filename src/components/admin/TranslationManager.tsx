import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Paper,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Translate as TranslateIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslationService, SupportedLanguage } from '../../services/translationService';
import ScrollableContainer from '../ScrollableContainer';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAdminLabel } from '../../utils/adminTranslations';

interface TranslationManagerProps {
  onNotification: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
}

export const TranslationManager: React.FC<TranslationManagerProps> = ({ onNotification }) => {
  const { currentLanguage } = useLanguage();
  const translationService = useTranslationService();
  const [sourceLang, setSourceLang] = useState<SupportedLanguage>('fr');
  const [sourceText, setSourceText] = useState('');
  const [translations, setTranslations] = useState<{ [key in SupportedLanguage]: string }>({
    fr: '',
    en: '',
    cs: '',
  });
  const [customKey, setCustomKey] = useState('');
  const [detectedLang, setDetectedLang] = useState<SupportedLanguage>('fr');

  const languages = [
    { code: 'fr' as SupportedLanguage, name: 'Français', flag: '🇫🇷' },
    { code: 'en' as SupportedLanguage, name: 'English', flag: '🇬🇧' },
    { code: 'cs' as SupportedLanguage, name: 'Čeština', flag: '🇨🇿' },
  ];

  const handleAutoTranslate = () => {
    if (!sourceText.trim()) {
      onNotification('Veuillez saisir du texte à traduire', 'warning');
      return;
    }

    const detected = translationService.detectLanguage(sourceText);
    setDetectedLang(detected);

    const autoTranslations = translationService.translateToAll(sourceText, sourceLang);
    setTranslations(autoTranslations);

    onNotification(`Traduction automatique effectuée (langue détectée: ${detected})`, 'success');
  };

  const handleSaveTranslation = () => {
    if (!customKey.trim()) {
      onNotification('Veuillez spécifier une clé pour cette traduction', 'warning');
      return;
    }

    if (!translations.fr && !translations.en && !translations.cs) {
      onNotification('Veuillez saisir au moins une traduction', 'warning');
      return;
    }

    translationService.addCustomTranslation(customKey, translations);
    
    // Reset form
    setSourceText('');
    setTranslations({ fr: '', en: '', cs: '' });
    setCustomKey('');

    onNotification('Traduction personnalisée ajoutée avec succès!', 'success');
  };

  const stats = translationService.getStats();

  return (
    <ScrollableContainer>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TranslateIcon color="primary" />
          {getAdminLabel('translationManager', currentLanguage)}
        </Typography>

        {/* Statistiques */}
        <Paper sx={{ p: 2, mb: 3, bgcolor: '#f8f9fa' }}>
          <Typography variant="h6" gutterBottom>
            📊 {getAdminLabel('translationServiceStats', currentLanguage)}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary">
                  {stats.baseDictionarySize}
                </Typography>
                <Typography variant="caption">
                  {getAdminLabel('baseTranslations', currentLanguage)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="secondary">
                  {stats.customTranslationsSize}
                </Typography>
                <Typography variant="caption">
                  {getAdminLabel('customTranslations', currentLanguage)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="success.main">
                  {stats.supportedLanguages.length}
                </Typography>
                <Typography variant="caption">
                  {getAdminLabel('supportedLanguages', currentLanguage)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {/* Interface de traduction */}
          <Grid item xs={12} md={8}>
            <Card component={motion.div} whileHover={{ scale: 1.02 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LanguageIcon />
                  {getAdminLabel('automaticTranslation', currentLanguage)}
                </Typography>

                <Alert severity="info" sx={{ mb: 2 }}>
                  Le service de traduction fonctionne hors ligne avec un dictionnaire pré-construit.
                  Idéal pour les termes éducatifs courants !
                </Alert>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>Langue source</InputLabel>
                      <Select
                        value={sourceLang}
                        onChange={(e) => setSourceLang(e.target.value as SupportedLanguage)}
                      >
                        {languages.map((lang) => (
                          <MenuItem key={lang.code} value={lang.code}>
                            {lang.flag} {lang.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      label="Texte à traduire"
                      multiline
                      rows={3}
                      value={sourceText}
                      onChange={(e) => setSourceText(e.target.value)}
                      placeholder="Saisissez le texte à traduire..."
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2, mb: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<TranslateIcon />}
                    onClick={handleAutoTranslate}
                    disabled={!sourceText.trim()}
                  >
                    Traduire automatiquement
                  </Button>
                  {detectedLang && (
                    <Chip
                      label={`Langue détectée: ${languages.find(l => l.code === detectedLang)?.name}`}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" gutterBottom>
                  Traductions générées :
                </Typography>

                <Grid container spacing={2}>
                  {languages.map((lang) => (
                    <Grid item xs={12} sm={4} key={lang.code}>
                      <TextField
                        fullWidth
                        label={`${lang.flag} ${lang.name}`}
                        value={translations[lang.code]}
                        onChange={(e) => setTranslations(prev => ({ ...prev, [lang.code]: e.target.value }))}
                        multiline
                        rows={2}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Clé personnalisée (optionnel)"
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    placeholder="ex: nouveau_terme_educatif"
                    sx={{ mb: 2 }}
                  />
                  
                  <Button
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveTranslation}
                    disabled={!translations.fr && !translations.en && !translations.cs}
                  >
                    Sauvegarder cette traduction
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Guide d'utilisation */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📚 Guide d'utilisation
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    🎯 Traduction automatique
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Saisissez votre texte et laissez le service le traduire automatiquement vers les 3 langues supportées.
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    🔧 Traductions personnalisées
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Ajoutez vos propres traductions pour enrichir le dictionnaire avec des termes spécifiques.
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    🌐 Intégration automatique
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Les nouveaux contenus ajoutés dans l'interface admin sont automatiquement traduits.
                  </Typography>
                </Box>

                <Alert severity="success" sx={{ mt: 2 }}>
                  <Typography variant="caption">
                    💡 Astuce: Les traductions sont sauvegardées localement et persistent entre les sessions !
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Exemples de traductions courantes */}
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🎓 Exemples de Traductions Éducatives
            </Typography>
            
            <Grid container spacing={2}>
              {[
                { fr: 'Mathématiques', en: 'Mathematics', cs: 'Matematika' },
                { fr: 'Exercice', en: 'Exercise', cs: 'Cvičení' },
                { fr: 'Bien joué !', en: 'Well done!', cs: 'Skvěle!' },
                { fr: 'Recommencer', en: 'Try again', cs: 'Zkuste znovu' },
              ].map((example, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper sx={{ p: 1, bgcolor: '#f0f8ff' }}>
                    <Typography variant="caption" display="block">🇫🇷 {example.fr}</Typography>
                    <Typography variant="caption" display="block">🇬🇧 {example.en}</Typography>
                    <Typography variant="caption" display="block">🇨🇿 {example.cs}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </ScrollableContainer>
  );
};

export default TranslationManager;