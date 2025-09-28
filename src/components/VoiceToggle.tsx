import React, { useState } from 'react';
import { IconButton, Tooltip, Switch, FormControlLabel, Box, Select, MenuItem, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { speechService } from '../utils/speechService';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../utils/translations';

interface VoiceToggleProps {
  sampleText?: string;
}

const VoiceToggle: React.FC<VoiceToggleProps> = ({ sampleText }) => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  const [enabled, setEnabled] = useState(true);
  const [voiceId, setVoiceId] = useState<string | undefined>(undefined);
  const [speaking, setSpeaking] = useState(false);

  const profiles = speechService.listProfiles(currentLanguage);

  const handleToggle = () => {
    if (enabled) {
      speechService.stop();
      setSpeaking(false);
    }
    setEnabled(!enabled);
  };

  const handleSpeak = () => {
    if (!enabled) return;
    if (speaking) {
      speechService.stop();
      setSpeaking(false);
      return;
    }
    speechService.speak({
      text: sampleText || t('ui.welcome'),
      language: currentLanguage,
      voiceId,
      interrupt: true,
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false),
      onError: () => setSpeaking(false)
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
      <FormControlLabel
        control={<Switch checked={enabled} onChange={handleToggle} />}
        label={enabled ? t('ui.disableVoice') : t('ui.enableVoice')}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title={speaking ? t('ui.stopVoice') : t('ui.listen')}>
          <IconButton onClick={handleSpeak} color={speaking ? 'error' : 'primary'} size="large">
            {speaking ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
        </Tooltip>
        <RecordVoiceOverIcon sx={{ opacity: enabled ? 1 : 0.3 }} />
        <Select
          size="small"
          disabled={!enabled}
          value={voiceId || ''}
          displayEmpty
          onChange={(e) => setVoiceId(e.target.value || undefined)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">
            <em>{t('ui.voice')}</em>
          </MenuItem>
          {profiles.map(p => (
            <MenuItem key={p.id} value={p.id}>{p.displayName}</MenuItem>
          ))}
        </Select>
      </Box>
      <Typography variant="caption" color="text.secondary">
        {t('ui.voiceSettings')}
      </Typography>
    </Box>
  );
};

export default VoiceToggle;
