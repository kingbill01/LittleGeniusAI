import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
} from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (languageCode: string) => {
    setLanguage(languageCode as any);
    handleClose();
  };

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.2)',
          },
        }}
      >
        <LanguageIcon sx={{ mr: 1 }} />
        <Typography variant="body2" sx={{ fontSize: '1.2rem' }}>
          {currentLang?.flag}
        </Typography>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            minWidth: 160,
          },
        }}
      >
        {availableLanguages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageSelect(language.code)}
            selected={language.code === currentLanguage}
            sx={{
              py: 1.5,
              '&.Mui-selected': {
                bgcolor: '#667eea20',
                '&:hover': {
                  bgcolor: '#667eea30',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Typography variant="h6">{language.flag}</Typography>
            </ListItemIcon>
            <ListItemText
              primary={language.name}
              primaryTypographyProps={{
                fontWeight: language.code === currentLanguage ? 600 : 400,
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSelector;