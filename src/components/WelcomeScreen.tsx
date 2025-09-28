import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Avatar,
  Grid,
  Slider,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Select,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Language as LanguageIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { User } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../utils/translations';

interface WelcomeScreenProps {
  onCreateUser: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<User | null>;
  onBack?: () => void;
}

const avatarOptions = ['👶', '🧒', '👧', '🧑', '👦', '🤖', '🦄', '🌟'];

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onCreateUser, onBack }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(5);
  const [selectedAvatar, setSelectedAvatar] = useState('👶');
  const [allowedSubjects, setAllowedSubjects] = useState(['math', 'language', 'science', 'art', 'computing']);
  const [timeLimit, setTimeLimit] = useState(60);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceId, setVoiceId] = useState<string>('');
  
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage();
  const t = useTranslation(currentLanguage);

  const subjects = [
    { id: 'math', label: t.t('subjects.math') },
    { id: 'language', label: t.t('subjects.language') },
    { id: 'science', label: t.t('subjects.science') },
    { id: 'art', label: t.t('subjects.art') },
    { id: 'computing', label: t.t('subjects.computing') },
    { id: 'anatomy', label: t.t('subjects.anatomy') },
    { id: 'civic', label: t.t('subjects.civic') },
    { id: 'hygiene', label: t.t('subjects.hygiene') },
  ];

  const handleCreateProfile = async () => {
    if (!name.trim()) return;

    const userData = {
      name: name.trim(),
      age,
      avatar: selectedAvatar,
      parentalControls: {
        timeLimit,
        allowedSubjects,
        difficultyLevel: age <= 5 ? 'easy' as const : age <= 8 ? 'medium' as const : 'hard' as const,
      },
      voicePreferences: {
        enabled: voiceEnabled,
        voiceId: voiceId || undefined
      }
    };

    await onCreateUser(userData);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2,
        py: 4,
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '600px' }}
      >
        <Card
          sx={{
            width: '100%',
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            maxHeight: '90vh',
            overflow: 'auto',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Bouton Retour */}
            {onBack && (
              <Box sx={{ mb: 2 }}>
                <IconButton
                  onClick={onBack}
                  sx={{
                    bgcolor: 'rgba(102, 126, 234, 0.1)',
                    color: '#667eea',
                    '&:hover': {
                      bgcolor: 'rgba(102, 126, 234, 0.2)',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  title={t.t('ui.back')}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Box>
            )}

            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Fredoka One", cursive',
                  color: '#667eea',
                  mb: 1,
                }}
              >
                {t.t('ui.welcome')} 🎉
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {t.t('ui.createProfile')}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label={t.t('ui.name')}
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 3 }}
                inputProps={{ maxLength: 20 }}
              />

              <Typography gutterBottom sx={{ fontWeight: 600 }}>
                {t.t('ui.age')}: {age} {t.t('ui.years')}
              </Typography>
              <Slider
                value={age}
                onChange={(_, newValue) => setAge(newValue as number)}
                min={3}
                max={12}
                marks
                valueLabelDisplay="auto"
                sx={{ mb: 3 }}
              />

              <Typography gutterBottom sx={{ fontWeight: 600 }}>
                {t.t('ui.chooseAvatar')}
              </Typography>
              <Grid container spacing={1} sx={{ mb: 3 }}>
                {avatarOptions.map((avatar) => (
                  <Grid item xs={3} key={avatar}>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                          fontSize: '2rem',
                          cursor: 'pointer',
                          border: selectedAvatar === avatar ? '3px solid #667eea' : '2px solid transparent',
                          bgcolor: selectedAvatar === avatar ? '#f0f4ff' : '#f5f5f5',
                        }}
                        onClick={() => setSelectedAvatar(avatar)}
                      >
                        {avatar}
                      </Avatar>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              <Typography gutterBottom sx={{ fontWeight: 600 }}>
                {t.t('ui.subjects')}:
              </Typography>
              <FormGroup sx={{ mb: 3 }}>
                {subjects.map((subject) => (
                  <FormControlLabel
                    key={subject.id}
                    control={
                      <Checkbox
                        checked={allowedSubjects.includes(subject.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAllowedSubjects([...allowedSubjects, subject.id]);
                          } else {
                            setAllowedSubjects(allowedSubjects.filter(s => s !== subject.id));
                          }
                        }}
                      />
                    }
                    label={subject.label}
                  />
                ))}
              </FormGroup>

              <Typography gutterBottom sx={{ fontWeight: 600 }}>
                {t.t('ui.timeLimit')}: {timeLimit} {t.t('ui.minutes')}
              </Typography>
              <Slider
                value={timeLimit}
                onChange={(_, newValue) => setTimeLimit(newValue as number)}
                min={15}
                max={120}
                step={15}
                marks={[
                  { value: 15, label: '15min' },
                  { value: 60, label: '1h' },
                  { value: 120, label: '2h' },
                ]}
                valueLabelDisplay="auto"
                sx={{ mb: 4 }}
              />

              <Typography gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                {t.t('voice.voice')}:
              </Typography>
              <FormControlLabel
                control={<Checkbox checked={voiceEnabled} onChange={(e) => setVoiceEnabled(e.target.checked)} />}
                label={voiceEnabled ? t.t('voice.enableVoice') : t.t('voice.disableVoice')}
              />
              {voiceEnabled && (
                <Select
                  fullWidth
                  size="small"
                  displayEmpty
                  value={voiceId}
                  onChange={(e) => setVoiceId(e.target.value as string)}
                  sx={{ mb: 3, mt: 1 }}
                >
                  <MenuItem value=""><em>Auto</em></MenuItem>
                  <MenuItem value="fr-female-1">Élise (FR)</MenuItem>
                  <MenuItem value="en-female-1">Mia (EN)</MenuItem>
                  <MenuItem value="cs-female-1">Lenka (CS)</MenuItem>
                </Select>
              )}
            </Box>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleCreateProfile}
                disabled={!name.trim() || allowedSubjects.length === 0}
                sx={{
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #5a6fd8, #6a419a)',
                  },
                }}
              >
{t.t('ui.startAdventure')} 🚀
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default WelcomeScreen;