import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Collapse,
} from '@mui/material';
import {  
  Send as SendIcon,
  Close as CloseIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../App';

interface AICompanionProps {
  user: User;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AICompanion: React.FC<AICompanionProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Salut ${user.name} ! 👋 Je suis Génie, ton assistant d'apprentissage. Comment puis-je t'aider aujourd'hui ?`,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      let aiResponse = '';
      
      if (window.electron) {
        aiResponse = await window.electron.aiChat(inputMessage, {
          name: user.name,
          age: user.age,
          currentSubject: 'general',
          difficulty: user.parentalControls.difficultyLevel,
        });
      } else {
        // Réponse de fallback si Electron n'est pas disponible
        aiResponse = `C'est intéressant ${user.name} ! Continue à être curieux ! 🌟`;
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erreur AI:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Oh non ! J\'ai un petit problème. Peux-tu réessayer ? 😅',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Paper
              elevation={8}
              sx={{
                width: 350,
                height: 450,
                borderRadius: 4,
                overflow: 'hidden',
                mb: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      mr: 2,
                    }}
                  >
                    🧠
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontFamily: '"Fredoka One", cursive' }}>
                      Génie AI
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      Ton assistant d'apprentissage
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={() => setIsOpen(false)}
                  sx={{ color: 'white' }}
                  size="small"
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Messages */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  p: 1,
                  bgcolor: '#f8f9ff',
                }}
              >
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                        mb: 1,
                      }}
                    >
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          maxWidth: '80%',
                          borderRadius: message.role === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                          bgcolor: message.role === 'user' ? '#667eea' : 'white',
                          color: message.role === 'user' ? 'white' : 'black',
                        }}
                      >
                        <Typography variant="body2">
                          {message.content}
                        </Typography>
                      </Paper>
                    </Box>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        borderRadius: '20px 20px 20px 5px',
                        bgcolor: 'white',
                      }}
                    >
                      <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        Génie réfléchit... 🤔
                      </Typography>
                    </Paper>
                  </Box>
                )}
              </Box>

              {/* Input */}
              <Box
                sx={{
                  p: 2,
                  borderTop: '1px solid #eee',
                  bgcolor: 'white',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Pose-moi une question..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isTyping}
                    size="small"
                    sx={{
                      mr: 1,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                      },
                    }}
                  />
                  <IconButton
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    sx={{
                      bgcolor: '#667eea',
                      color: 'white',
                      '&:hover': {
                        bgcolor: '#5a6fd8',
                      },
                      '&:disabled': {
                        bgcolor: '#ccc',
                      },
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            width: 60,
            height: 60,
            bgcolor: '#667eea',
            color: 'white',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
            '&:hover': {
              bgcolor: '#5a6fd8',
              boxShadow: '0 6px 25px rgba(102, 126, 234, 0.6)',
            },
          }}
        >
          <ChatIcon sx={{ fontSize: '1.5rem' }} />
        </IconButton>
      </motion.div>

      {/* Notification badge */}
      {!isOpen && (
        <Box
          sx={{
            position: 'absolute',
            top: -5,
            right: -5,
            width: 20,
            height: 20,
            borderRadius: '50%',
            bgcolor: '#ff6b6b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" sx={{ color: 'white', fontSize: '0.7rem' }}>
            !
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AICompanion;