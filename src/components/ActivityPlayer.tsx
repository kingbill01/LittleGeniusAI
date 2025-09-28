import React from 'react';
import { Box, Typography } from '@mui/material';
import { User } from '../App';

interface ActivityPlayerProps {
  user: User;
}

const ActivityPlayer: React.FC<ActivityPlayerProps> = ({ user }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
      }}
    >
      <Typography variant="h4" sx={{ fontFamily: '"Fredoka One", cursive' }}>
        Lecteur d'activités - En cours de développement 🚧
      </Typography>
    </Box>
  );
};

export default ActivityPlayer;