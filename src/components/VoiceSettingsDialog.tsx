import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../utils/translations';
import { speechService } from '../utils/speechService';
import { User } from '../App';

interface VoiceSettingsDialogProps {
  open: boolean;
  onClose: () => void;
  user: User;
  onSave: (voicePreferences: { enabled: boolean; voiceId?: string }) => void;
}

export const VoiceSettingsDialog: React.FC<VoiceSettingsDialogProps> = ({
  open,
  onClose,
  user,
  onSave,
}) => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  
  const [voiceEnabled, setVoiceEnabled] = useState(user.voicePreferences?.enabled ?? true);
  const [selectedVoiceId, setSelectedVoiceId] = useState(user.voicePreferences?.voiceId || '');

  const femaleVoices = speechService.listProfiles(currentLanguage as any);

  const handleTest = () => {
    if (voiceEnabled && selectedVoiceId) {
      const testMessage = currentLanguage === 'fr' ? 'Bonjour ! Je suis votre assistante vocale.' :
                         currentLanguage === 'en' ? 'Hello! I am your voice assistant.' :
                         'Ahoj! Jsem váš hlasový asistent.';
      speechService.speak({
        text: testMessage,
        language: currentLanguage as any,
        voiceId: selectedVoiceId,
      });
    }
  };

  const handleSave = () => {
    onSave({
      enabled: voiceEnabled,
      voiceId: selectedVoiceId || undefined,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" sx={{ fontFamily: '"Fredoka One", cursive' }}>
          🎤 {t('voice.settings')}
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={voiceEnabled}
                onChange={(e) => setVoiceEnabled(e.target.checked)}
                color="primary"
              />
            }
            label={t('voice.enable')}
          />
        </Box>

        {voiceEnabled && (
          <>
            <Divider sx={{ mb: 3 }} />
            
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" sx={{ mb: 2 }}>
                {t('voice.selectVoice')}
              </FormLabel>
              
              <RadioGroup
                value={selectedVoiceId}
                onChange={(e) => setSelectedVoiceId(e.target.value)}
              >
                {femaleVoices.length > 0 ? (
                  femaleVoices.map((voice) => (
                    <FormControlLabel
                      key={voice.id}
                      value={voice.id}
                      control={<Radio />}
                      label={`${voice.displayName} (${voice.language})`}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Aucune voix féminine disponible pour cette langue
                  </Typography>
                )}
              </RadioGroup>
            </FormControl>

            {selectedVoiceId && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button
                  variant="outlined"
                  onClick={handleTest}
                  size="small"
                >
                  🔊 Tester cette voix
                </Button>
              </Box>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          {t('ui.cancel')}
        </Button>
        <Button onClick={handleSave} variant="contained">
          {t('ui.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};