import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Save as SaveIcon,
  RestartAlt as ResetIcon,
  Security as SecurityIcon,
  Palette as ThemeIcon,
  Language as LanguageIcon,
  VolumeUp as SoundIcon,
  Notifications as NotificationIcon,
  CloudSync as BackupIcon,
  Update as UpdateIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ScrollableContainer from '../ScrollableContainer';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../utils/translations';

// Traductions spécifiques pour SystemSettings
const getSystemLabel = (key: string, language: string) => {
  const labels: Record<string, Record<string, string>> = {
    defaultLanguage: {
      fr: "Langue par défaut",
      en: "Default Language", 
      cs: "Výchozí jazyk"
    },
    theme: {
      fr: "Thème",
      en: "Theme",
      cs: "Téma"
    },
    autoSave: {
      fr: "Sauvegarde automatique",
      en: "Auto Save",
      cs: "Automatické Ukládání"
    },
    welcomeScreen: {
      fr: "Afficher l'écran de bienvenue",
      en: "Show Welcome Screen",
      cs: "Zobrazit Uvítací Obrazovku"
    },
    light: {
      fr: "Clair",
      en: "Light",
      cs: "Světlý"
    },
    dark: {
      fr: "Sombre", 
      en: "Dark",
      cs: "Tmavý"
    },
    auto: {
      fr: "Automatique",
      en: "Automatic",
      cs: "Automatický"
    },
    educationalSettings: {
      fr: "Paramètres Éducatifs",
      en: "Educational Settings",
      cs: "Vzdělávací Parametry"
    },
    defaultAgeGroup: {
      fr: "Groupe d'âge par défaut",
      en: "Default Age Group",
      cs: "Výchozí věková skupina"
    },
    allAges: {
      fr: "Tous âges",
      en: "All Ages",
      cs: "Všechny věky"
    },
    age3to5: {
      fr: "3-5 ans",
      en: "3-5 years",
      cs: "3-5 let"
    },
    age6to8: {
      fr: "6-8 ans",
      en: "6-8 years", 
      cs: "6-8 let"
    },
    age9to12: {
      fr: "9-12 ans",
      en: "9-12 years",
      cs: "9-12 let"
    },
    maxAttempts: {
      fr: "Nombre max de tentatives",
      en: "Max Attempts",
      cs: "Maximální počet pokusů"
    },
    timePerQuestion: {
      fr: "Temps par question (secondes)",
      en: "Time per question (seconds)",
      cs: "Čas na otázku (sekundy)"
    },
    animationSpeed: {
      fr: "Vitesse des animations",
      en: "Animation Speed",
      cs: "Rychlost animací"
    },
    slow: {
      fr: "Lente",
      en: "Slow",
      cs: "Pomalá"
    },
    normal: {
      fr: "Normale",
      en: "Normal", 
      cs: "Normální"
    },
    fast: {
      fr: "Rapide",
      en: "Fast",
      cs: "Rychlá"
    },
    soundVolume: {
      fr: "Volume sonore",
      en: "Sound Volume",
      cs: "Hlasitost zvuku"
    },
    autoProgressDifficulty: {
      fr: "Progression automatique de la difficulté",
      en: "Automatic difficulty progression",
      cs: "Automatické zvyšování obtížnosti"
    },
    showHints: {
      fr: "Afficher les indices",
      en: "Show Hints",
      cs: "Zobrazit nápovědy"
    },
    rewardSystem: {
      fr: "Système de récompenses",
      en: "Reward System",
      cs: "Systém odměn"
    },
    animations: {
      fr: "Animations",
      en: "Animations",
      cs: "Animace"
    },
    sessionTimeout: {
      fr: "Timeout de session (minutes)",
      en: "Session timeout (minutes)",
      cs: "Časový limit relace (minuty)"
    },
    autoLock: {
      fr: "Verrouillage automatique (minutes)",
      en: "Auto lock (minutes)",
      cs: "Automatické uzamčení (minuty)"
    },
    allowDataCollection: {
      fr: "Autoriser la collecte de données anonymes",
      en: "Allow anonymous data collection",
      cs: "Povolit anonymní sběr dat"
    },
    dataEncryption: {
      fr: "Chiffrement des données",
      en: "Data encryption",
      cs: "Šifrování dat"
    },
    backupFrequency: {
      fr: "Fréquence de sauvegarde",
      en: "Backup frequency",
      cs: "Frekvence zálohování"
    },
    maxBackups: {
      fr: "Nombre max de sauvegardes",
      en: "Max backups",
      cs: "Maximální počet záloh"
    },
    backupLocation: {
      fr: "Emplacement des sauvegardes",
      en: "Backup location",
      cs: "Umístění záloh"
    },
    maxCacheSize: {
      fr: "Taille max du cache (MB)",
      en: "Max cache size (MB)",
      cs: "Maximální velikost cache (MB)"
    },
    logLevel: {
      fr: "Niveau de journalisation",
      en: "Log level",
      cs: "Úroveň protokolování"
    },
    caching: {
      fr: "Mise en cache",
      en: "Caching",
      cs: "Ukládání do cache"
    },
    contentPreload: {
      fr: "Préchargement du contenu",
      en: "Content preload",
      cs: "Předběžné načítání obsahu"
    },
    performanceAnalytics: {
      fr: "Analytics de performance",
      en: "Performance analytics",
      cs: "Analýza výkonu"
    },
    newPassword: {
      fr: "Nouveau mot de passe",
      en: "New password",
      cs: "Nové heslo"
    },
    confirmPassword: {
      fr: "Confirmer le mot de passe",
      en: "Confirm password",
      cs: "Potvrdit heslo"
    }
  };
  
  return labels[key]?.[language] || labels[key]?.['fr'] || key;
};

interface SystemSettingsProps {
  onNotification: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
}

interface SettingsData {
  // Paramètres généraux
  general: {
    appName: string;
    appVersion: string;
    language: 'fr' | 'en' | 'cs';
    theme: 'light' | 'dark' | 'auto';
    autoSave: boolean;
    showWelcomeScreen: boolean;
  };
  
  // Paramètres éducatifs
  educational: {
    defaultAgeGroup: '3-5' | '6-8' | '9-12' | 'all';
    difficultyProgression: boolean;
    maxAttempts: number;
    showHints: boolean;
    enableRewards: boolean;
    timePerQuestion: number;
    enableSound: boolean;
    soundVolume: number;
    enableAnimations: boolean;
    animationSpeed: 'slow' | 'normal' | 'fast';
  };
  
  // Paramètres de sécurité
  security: {
    adminPassword: string;
    sessionTimeout: number;
    enableParentalControls: boolean;
    allowDataCollection: boolean;
    encryptData: boolean;
    autoLockTime: number;
  };
  
  // Paramètres de sauvegarde
  backup: {
    enableAutoBackup: boolean;
    backupFrequency: 'daily' | 'weekly' | 'monthly';
    backupLocation: string;
    maxBackups: number;
    cloudSync: boolean;
  };
  
  // Paramètres de performance
  performance: {
    maxCacheSize: number;
    enableCaching: boolean;
    preloadContent: boolean;
    enableAnalytics: boolean;
    logLevel: 'error' | 'warn' | 'info' | 'debug';
  };
}

const DEFAULT_SETTINGS: SettingsData = {
  general: {
    appName: 'LittleGenius AI',
    appVersion: '1.0.0',
    language: 'fr',
    theme: 'light',
    autoSave: true,
    showWelcomeScreen: true,
  },
  educational: {
    defaultAgeGroup: 'all',
    difficultyProgression: true,
    maxAttempts: 3,
    showHints: true,
    enableRewards: true,
    timePerQuestion: 60,
    enableSound: true,
    soundVolume: 70,
    enableAnimations: true,
    animationSpeed: 'normal',
  },
  security: {
    adminPassword: 'admin123',
    sessionTimeout: 30,
    enableParentalControls: true,
    allowDataCollection: false,
    encryptData: true,
    autoLockTime: 15,
  },
  backup: {
    enableAutoBackup: true,
    backupFrequency: 'weekly',
    backupLocation: './backups',
    maxBackups: 10,
    cloudSync: false,
  },
  performance: {
    maxCacheSize: 100,
    enableCaching: true,
    preloadContent: true,
    enableAnalytics: true,
    logLevel: 'info',
  },
};

export const SystemSettings: React.FC<SystemSettingsProps> = ({ onNotification }) => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  const [settings, setSettings] = useState<SettingsData>(DEFAULT_SETTINGS);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const handleSaveSettings = () => {
    try {
      // En production, on sauvegarderait dans un fichier de configuration
      localStorage.setItem('littlegenius-settings', JSON.stringify(settings));
      onNotification(t('interactiveUI.settingsSaved'), 'success');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      onNotification('Erreur lors de la sauvegarde des paramètres', 'error');
    }
  };

  const handleResetSettings = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      setSettings(DEFAULT_SETTINGS);
      onNotification('Paramètres réinitialisés aux valeurs par défaut', 'info');
    }
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      onNotification('Les mots de passe ne correspondent pas', 'error');
      return;
    }
    if (newPassword.length < 6) {
      onNotification('Le mot de passe doit contenir au moins 6 caractères', 'error');
      return;
    }

    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        adminPassword: newPassword,
      },
    }));

    setNewPassword('');
    setConfirmPassword('');
    setIsPasswordDialogOpen(false);
    onNotification(t('interactiveUI.passwordChanged'), 'success');
  };

  const updateSetting = (category: keyof SettingsData, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const settingSections = [
    {
      title: t('interactiveUI.generalParameters'),
      icon: <InfoIcon />,
      category: 'general' as keyof SettingsData,
    },
    {
      title: t('interactiveUI.educationalParameters'),
      icon: <LanguageIcon />,
      category: 'educational' as keyof SettingsData,
    },
    {
      title: t('interactiveUI.security'),
      icon: <SecurityIcon />,
      category: 'security' as keyof SettingsData,
    },
    {
      title: t('interactiveUI.backup'),
      icon: <BackupIcon />,
      category: 'backup' as keyof SettingsData,
    },
    {
      title: t('interactiveUI.performance'),
      icon: <UpdateIcon />,
      category: 'performance' as keyof SettingsData,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#667eea' }}>
        ⚙️ {t('interactiveUI.systemParameters')}
      </Typography>

      <Grid container spacing={3}>
        {/* Navigation des sections */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>{t('interactiveUI.sections')}</Typography>
              <List>
                {settingSections.map((section, index) => (
                  <ListItem
                    key={index}
                    button
                    selected={activeTab === index}
                    onClick={() => setActiveTab(index)}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                      },
                    }}
                  >
                    <Box sx={{ mr: 2 }}>{section.icon}</Box>
                    <ListItemText primary={section.title} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>{t('interactiveUI.actions')}</Typography>
              <Button
                fullWidth
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveSettings}
                sx={{ mb: 1 }}
              >
                {t('action.save')}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ResetIcon />}
                onClick={handleResetSettings}
                color="warning"
              >
                Réinitialiser
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Contenu des paramètres */}
        <Grid item xs={12} md={9}>
          <ScrollableContainer maxHeight="75vh" showScrollToTop={true}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Paramètres Généraux */}
              {activeTab === 0 && (
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                      <InfoIcon sx={{ mr: 2 }} />
                      {t('interactiveUI.generalParameters')}
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label={t('interactiveUI.applicationName')}
                          value={settings.general.appName}
                          onChange={(e) => updateSetting('general', 'appName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label={t('interactiveUI.version')}
                          value={settings.general.appVersion}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Langue par défaut</InputLabel>
                          <Select
                            value={settings.general.language}
                            onChange={(e) => updateSetting('general', 'language', e.target.value)}
                            label={getSystemLabel('defaultLanguage', currentLanguage)}
                          >
                            <MenuItem value="fr">Français</MenuItem>
                            <MenuItem value="en">English</MenuItem>
                            <MenuItem value="cs">Čeština</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Thème</InputLabel>
                          <Select
                            value={settings.general.theme}
                            onChange={(e) => updateSetting('general', 'theme', e.target.value)}
                            label={getSystemLabel('theme', currentLanguage)}
                          >
                            <MenuItem value="light">{getSystemLabel('light', currentLanguage)}</MenuItem>
                            <MenuItem value="dark">{getSystemLabel('dark', currentLanguage)}</MenuItem>
                            <MenuItem value="auto">{getSystemLabel('auto', currentLanguage)}</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.general.autoSave}
                              onChange={(e) => updateSetting('general', 'autoSave', e.target.checked)}
                            />
                          }
                          label={getSystemLabel('autoSave', currentLanguage)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.general.showWelcomeScreen}
                              onChange={(e) => updateSetting('general', 'showWelcomeScreen', e.target.checked)}
                            />
                          }
                          label={getSystemLabel('welcomeScreen', currentLanguage)}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}

              {/* Paramètres Éducatifs */}
              {activeTab === 1 && (
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                      <LanguageIcon sx={{ mr: 2 }} />
                      {getSystemLabel('educationalSettings', currentLanguage)}
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>{getSystemLabel('defaultAgeGroup', currentLanguage)}</InputLabel>
                          <Select
                            value={settings.educational.defaultAgeGroup}
                            onChange={(e) => updateSetting('educational', 'defaultAgeGroup', e.target.value)}
                            label={getSystemLabel('defaultAgeGroup', currentLanguage)}
                          >
                            <MenuItem value="all">{getSystemLabel('allAges', currentLanguage)}</MenuItem>
                            <MenuItem value="3-5">{getSystemLabel('age3to5', currentLanguage)}</MenuItem>
                            <MenuItem value="6-8">{getSystemLabel('age6to8', currentLanguage)}</MenuItem>
                            <MenuItem value="9-12">{getSystemLabel('age9to12', currentLanguage)}</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label={getSystemLabel('maxAttempts', currentLanguage)}
                          value={settings.educational.maxAttempts}
                          onChange={(e) => updateSetting('educational', 'maxAttempts', parseInt(e.target.value))}
                          inputProps={{ min: 1, max: 10 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label={getSystemLabel('timePerQuestion', currentLanguage)}
                          value={settings.educational.timePerQuestion}
                          onChange={(e) => updateSetting('educational', 'timePerQuestion', parseInt(e.target.value))}
                          inputProps={{ min: 10, max: 300 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>{getSystemLabel('animationSpeed', currentLanguage)}</InputLabel>
                          <Select
                            value={settings.educational.animationSpeed}
                            onChange={(e) => updateSetting('educational', 'animationSpeed', e.target.value)}
                            label={getSystemLabel('animationSpeed', currentLanguage)}
                          >
                            <MenuItem value="slow">{getSystemLabel('slow', currentLanguage)}</MenuItem>
                            <MenuItem value="normal">{getSystemLabel('normal', currentLanguage)}</MenuItem>
                            <MenuItem value="fast">{getSystemLabel('fast', currentLanguage)}</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {getSystemLabel('soundVolume', currentLanguage)}: {settings.educational.soundVolume}%
                        </Typography>
                        <Slider
                          value={settings.educational.soundVolume}
                          onChange={(_, value) => updateSetting('educational', 'soundVolume', value)}
                          min={0}
                          max={100}
                          step={5}
                          marks
                          valueLabelDisplay="auto"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.educational.difficultyProgression}
                              onChange={(e) => updateSetting('educational', 'difficultyProgression', e.target.checked)}
                            />
                          }
                          label={getSystemLabel('autoProgressDifficulty', currentLanguage)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.educational.showHints}
                              onChange={(e) => updateSetting('educational', 'showHints', e.target.checked)}
                            />
                          }
                          label={getSystemLabel('showHints', currentLanguage)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.educational.enableRewards}
                              onChange={(e) => updateSetting('educational', 'enableRewards', e.target.checked)}
                            />
                          }
                          label={getSystemLabel('rewardSystem', currentLanguage)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.educational.enableSound}
                              onChange={(e) => updateSetting('educational', 'enableSound', e.target.checked)}
                            />
                          }
                          label={getSystemLabel('soundEffects', currentLanguage)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.educational.enableAnimations}
                              onChange={(e) => updateSetting('educational', 'enableAnimations', e.target.checked)}
                            />
                          }
                          label={getSystemLabel('animations', currentLanguage)}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}

              {/* Paramètres de Sécurité */}
              {activeTab === 2 && (
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                      <SecurityIcon sx={{ mr: 2 }} />
                      {getSystemLabel('securitySettings', currentLanguage)}
                    </Typography>

                    <Alert severity="warning" sx={{ mb: 3 }}>
                      Les modifications des paramètres de sécurité nécessitent une attention particulière.
                    </Alert>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="h6">Mot de passe administrateur</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Mot de passe pour accéder à l'interface d'administration
                            </Typography>
                          </Box>
                          <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={() => setIsPasswordDialogOpen(true)}
                          >
                            Modifier
                          </Button>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label={getSystemLabel('sessionTimeout', currentLanguage)}
                          value={settings.security.sessionTimeout}
                          onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                          inputProps={{ min: 5, max: 120 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label={getSystemLabel('autoLock', currentLanguage)}
                          value={settings.security.autoLockTime}
                          onChange={(e) => updateSetting('security', 'autoLockTime', parseInt(e.target.value))}
                          inputProps={{ min: 1, max: 60 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.security.enableParentalControls}
                              onChange={(e) => updateSetting('security', 'enableParentalControls', e.target.checked)}
                            />
                          }
                          label={getSystemLabel('parentalControls', currentLanguage)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.security.allowDataCollection}
                              onChange={(e) => updateSetting('security', 'allowDataCollection', e.target.checked)}
                            />
                          }
                          label={getSystemLabel('allowDataCollection', currentLanguage)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.security.encryptData}
                              onChange={(e) => updateSetting('security', 'encryptData', e.target.checked)}
                            />
                          }
                          label={getSystemLabel('dataEncryption', currentLanguage)}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}

              {/* Paramètres de Sauvegarde */}
              {activeTab === 3 && (
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                      <BackupIcon sx={{ mr: 2 }} />
                      Paramètres de Sauvegarde
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Fréquence de sauvegarde</InputLabel>
                          <Select
                            value={settings.backup.backupFrequency}
                            onChange={(e) => updateSetting('backup', 'backupFrequency', e.target.value)}
                            label={getSystemLabel('backupFrequency', currentLanguage)}
                          >
                            <MenuItem value="daily">Quotidienne</MenuItem>
                            <MenuItem value="weekly">Hebdomadaire</MenuItem>
                            <MenuItem value="monthly">Mensuelle</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label={getSystemLabel('maxBackups', currentLanguage)}
                          value={settings.backup.maxBackups}
                          onChange={(e) => updateSetting('backup', 'maxBackups', parseInt(e.target.value))}
                          inputProps={{ min: 1, max: 50 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label={getSystemLabel('backupLocation', currentLanguage)}
                          value={settings.backup.backupLocation}
                          onChange={(e) => updateSetting('backup', 'backupLocation', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.backup.enableAutoBackup}
                              onChange={(e) => updateSetting('backup', 'enableAutoBackup', e.target.checked)}
                            />
                          }
                          label={t('interactiveUI.autoSave')}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.backup.cloudSync}
                              onChange={(e) => updateSetting('backup', 'cloudSync', e.target.checked)}
                            />
                          }
                          label={getSystemLabel('cloudSync', currentLanguage)}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}

              {/* Paramètres de Performance */}
              {activeTab === 4 && (
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                      <UpdateIcon sx={{ mr: 2 }} />
                      Paramètres de Performance
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label={getSystemLabel('maxCacheSize', currentLanguage)}
                          value={settings.performance.maxCacheSize}
                          onChange={(e) => updateSetting('performance', 'maxCacheSize', parseInt(e.target.value))}
                          inputProps={{ min: 10, max: 1000 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Niveau de journalisation</InputLabel>
                          <Select
                            value={settings.performance.logLevel}
                            onChange={(e) => updateSetting('performance', 'logLevel', e.target.value)}
                            label={getSystemLabel('logLevel', currentLanguage)}
                          >
                            <MenuItem value="error">Erreurs seulement</MenuItem>
                            <MenuItem value="warn">Avertissements</MenuItem>
                            <MenuItem value="info">Informations</MenuItem>
                            <MenuItem value="debug">Debug</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.performance.enableCaching}
                              onChange={(e) => updateSetting('performance', 'enableCaching', e.target.checked)}
                            />
                          }
                          label={getSystemLabel('caching', currentLanguage)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.performance.preloadContent}
                              onChange={(e) => updateSetting('performance', 'preloadContent', e.target.checked)}
                            />
                          }
                          label={getSystemLabel('contentPreload', currentLanguage)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.performance.enableAnalytics}
                              onChange={(e) => updateSetting('performance', 'enableAnalytics', e.target.checked)}
                            />
                          }
                          label={getSystemLabel('performanceAnalytics', currentLanguage)}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </ScrollableContainer>
        </Grid>
      </Grid>

      {/* Dialog de changement de mot de passe */}
      <Dialog open={isPasswordDialogOpen} onClose={() => setIsPasswordDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Modifier le mot de passe administrateur</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              type="password"
              label={getSystemLabel('newPassword', currentLanguage)}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label={getSystemLabel('confirmPassword', currentLanguage)}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {newPassword && newPassword.length < 6 && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                Le mot de passe doit contenir au moins 6 caractères
              </Alert>
            )}
            {newPassword && confirmPassword && newPassword !== confirmPassword && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Les mots de passe ne correspondent pas
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPasswordDialogOpen(false)}>Annuler</Button>
          <Button
            onClick={handlePasswordChange}
            variant="contained"
            disabled={!newPassword || newPassword !== confirmPassword || newPassword.length < 6}
          >
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SystemSettings;