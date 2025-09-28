import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Slider,
  Chip,
  Paper,
  Fab,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeIcon,
  Palette as PaletteIcon,
  Science as ScienceIcon,
  Calculate as CalculateIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { EducationalContent } from '../utils/educationalContent';

interface EnrichedActivityRendererProps {
  activity: EducationalContent;
  onAnswer: (answer: any) => void;
  selectedAnswer: any;
  isCorrect: boolean | null;
  disabled: boolean;
}

export const EnrichedActivityRenderer: React.FC<EnrichedActivityRendererProps> = ({
  activity,
  onAnswer,
  selectedAnswer,
  isCorrect,
  disabled,
}) => {
  const { currentLanguage } = useLanguage();
  const [calculatorDisplay, setCalculatorDisplay] = useState('0');
  const [calculatorHistory, setCalculatorHistory] = useState<string[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [canvasStrokes, setCanvasStrokes] = useState<any[]>([]);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedBrush, setSelectedBrush] = useState('brush');
  const [musicNotes, setMusicNotes] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Calculatrice interactive
  const renderCalculator = () => {
    const buttons = [
      ['7', '8', '9', '+'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '×'],
      ['C', '0', '=', '÷']
    ];

    const handleCalculatorClick = (value: string) => {
      if (value === 'C') {
        setCalculatorDisplay('0');
      } else if (value === '=') {
        try {
          const result = eval(calculatorDisplay.replace('×', '*').replace('÷', '/'));
          setCalculatorDisplay(result.toString());
          setCalculatorHistory([...calculatorHistory, `${calculatorDisplay} = ${result}`]);
        } catch {
          setCalculatorDisplay('Erreur');
        }
      } else {
        setCalculatorDisplay(prev => prev === '0' ? value : prev + value);
      }
    };

    return (
      <Box sx={{ maxWidth: 400, mx: 'auto' }}>
        <Paper elevation={3} sx={{ p: 2, mb: 2, bgcolor: '#1e1e1e', color: 'white' }}>
          <Typography variant="h4" align="right" sx={{ minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            {calculatorDisplay}
          </Typography>
        </Paper>
        
        <Grid container spacing={1}>
          {buttons.flat().map((btn) => (
            <Grid item xs={3} key={btn}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => handleCalculatorClick(btn)}
                sx={{
                  height: 60,
                  fontSize: '1.2rem',
                  bgcolor: ['+', '-', '×', '÷', '='].includes(btn) ? '#ff9800' : '#2196f3',
                  '&:hover': {
                    bgcolor: ['+', '-', '×', '÷', '='].includes(btn) ? '#f57c00' : '#1976d2',
                  }
                }}
              >
                {btn}
              </Button>
            </Grid>
          ))}
        </Grid>

        {calculatorHistory.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Historique:</Typography>
            {calculatorHistory.slice(-3).map((calc, idx) => (
              <Typography key={idx} variant="body2" color="text.secondary">
                {calc}
              </Typography>
            ))}
          </Box>
        )}

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => onAnswer({ type: 'calculator', history: calculatorHistory })}
            disabled={disabled || calculatorHistory.length === 0}
          >
            Terminer l'exercice
          </Button>
        </Box>
      </Box>
    );
  };

  // Constructeur de formes
  const renderShapeBuilder = () => {
    const shapes = ['triangle', 'square', 'circle', 'rectangle'];
    const shapeEmojis = {
      triangle: '🔺',
      square: '⬜',
      circle: '⭕',
      rectangle: '▭'
    };

    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>Formes disponibles:</Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {shapes.map((shape) => (
            <Grid item key={shape}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  size="large"
                  onClick={() => {
                    setSelectedShapes([...selectedShapes, shape]);
                  }}
                  sx={{
                    fontSize: '2rem',
                    border: '2px solid #ddd',
                    borderRadius: 2,
                    p: 2
                  }}
                >
                  {shapeEmojis[shape as keyof typeof shapeEmojis]}
                </IconButton>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6">Ta construction:</Typography>
        <Box
          sx={{
            minHeight: 200,
            border: '2px dashed #ccc',
            borderRadius: 2,
            p: 2,
            mb: 2,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            alignItems: 'center'
          }}
        >
          {selectedShapes.map((shape, idx) => (
            <Chip
              key={idx}
              label={shapeEmojis[shape as keyof typeof shapeEmojis]}
              onDelete={() => {
                setSelectedShapes(selectedShapes.filter((_, i) => i !== idx));
              }}
              sx={{ fontSize: '1.5rem' }}
            />
          ))}
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => setSelectedShapes([])}
            sx={{ mr: 2 }}
          >
            Recommencer
          </Button>
          <Button
            variant="contained"
            onClick={() => onAnswer({ type: 'shapes', construction: selectedShapes })}
            disabled={disabled || selectedShapes.length === 0}
          >
            Sauvegarder ma création
          </Button>
        </Box>
      </Box>
    );
  };

  // Toile de peinture numérique
  const renderDigitalCanvas = () => {
    const colors = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const brushes = ['brush', 'pencil', 'eraser'];

    useEffect(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    }, []);

    const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (ctx) {
        ctx.fillStyle = selectedColor;
        ctx.beginPath();
        ctx.arc(x, y, selectedBrush === 'brush' ? 10 : 5, 0, 2 * Math.PI);
        ctx.fill();
      }
    };

    return (
      <Box>
        <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="h6">Couleurs:</Typography>
          {colors.map((color) => (
            <IconButton
              key={color}
              onClick={() => setSelectedColor(color)}
              sx={{
                width: 40,
                height: 40,
                bgcolor: color,
                border: selectedColor === color ? '3px solid #333' : '1px solid #ccc',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            />
          ))}
        </Box>

        <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
          <Typography variant="h6" sx={{ mr: 2 }}>Outils:</Typography>
          {brushes.map((brush) => (
            <Button
              key={brush}
              variant={selectedBrush === brush ? 'contained' : 'outlined'}
              onClick={() => setSelectedBrush(brush)}
              size="small"
            >
              {brush === 'brush' ? '🖌️' : brush === 'pencil' ? '✏️' : '🧽'} {brush}
            </Button>
          ))}
        </Box>

        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          onClick={handleCanvasClick}
          style={{
            border: '2px solid #ddd',
            borderRadius: 8,
            cursor: 'crosshair',
            maxWidth: '100%'
          }}
        />

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => {
              if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) {
                  ctx.fillStyle = 'white';
                  ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                }
              }
            }}
            sx={{ mr: 2 }}
          >
            Effacer tout
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (canvasRef.current) {
                const dataURL = canvasRef.current.toDataURL();
                onAnswer({ type: 'drawing', artwork: dataURL });
              }
            }}
            disabled={disabled}
          >
            Sauvegarder mon dessin
          </Button>
        </Box>
      </Box>
    );
  };

  // Compositeur de musique
  const renderMusicComposer = () => {
    const notes = ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
    const instruments = ['🎹 Piano', '🎸 Guitare', '🥁 Batterie', '🎺 Trompette'];

    const playNote = (note: string) => {
      setMusicNotes([...musicNotes, note]);
      // Ici on pourrait ajouter la synthèse audio
    };

    const playMelody = () => {
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), musicNotes.length * 500);
    };

    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>Choisir un instrument:</Typography>
        <Grid container spacing={1} sx={{ mb: 3 }}>
          {instruments.map((instrument) => (
            <Grid item key={instrument}>
              <Button variant="outlined" size="small">
                {instrument}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" sx={{ mb: 2 }}>Notes de musique:</Typography>
        <Grid container spacing={1} sx={{ mb: 3 }}>
          {notes.map((note) => (
            <Grid item key={note}>
              <Button
                variant="contained"
                size="large"
                onClick={() => playNote(note)}
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  fontSize: '0.9rem'
                }}
              >
                {note}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6">Ta mélodie:</Typography>
        <Box
          sx={{
            minHeight: 60,
            border: '2px solid #ddd',
            borderRadius: 2,
            p: 2,
            mb: 2,
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          {musicNotes.map((note, idx) => (
            <Chip
              key={idx}
              label={note}
              color="primary"
              onDelete={() => {
                setMusicNotes(musicNotes.filter((_, i) => i !== idx));
              }}
            />
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            startIcon={isPlaying ? <PauseIcon /> : <PlayIcon />}
            onClick={playMelody}
            disabled={musicNotes.length === 0}
          >
            {isPlaying ? 'En cours...' : 'Jouer ma mélodie'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => setMusicNotes([])}
          >
            Effacer
          </Button>
          <Button
            variant="contained"
            onClick={() => onAnswer({ type: 'music', melody: musicNotes })}
            disabled={disabled || musicNotes.length === 0}
          >
            Sauvegarder ma mélodie
          </Button>
        </Box>
      </Box>
    );
  };

  // Sélection du bon renderer selon le type d'activité
  if (activity.content?.interactive?.type === 'calculator') {
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
          <CalculateIcon sx={{ mr: 1 }} />
          {activity.title[currentLanguage]}
        </Typography>
        {renderCalculator()}
      </Box>
    );
  }

  if (activity.content?.creative?.type === 'shape-builder') {
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
          🔷 {activity.title[currentLanguage]}
        </Typography>
        {renderShapeBuilder()}
      </Box>
    );
  }

  if (activity.content?.drawing?.type === 'digital-canvas') {
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
          <PaletteIcon sx={{ mr: 1 }} />
          {activity.title[currentLanguage]}
        </Typography>
        {renderDigitalCanvas()}
      </Box>
    );
  }

  if (activity.content?.music?.type === 'composer') {
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
          🎵 {activity.title[currentLanguage]}
        </Typography>
        {renderMusicComposer()}
      </Box>
    );
  }

  // Fallback pour les autres types
  return (
    <Box sx={{ textAlign: 'center', p: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {activity.title[currentLanguage]}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {activity.description[currentLanguage]}
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => onAnswer('completed')}
        disabled={disabled}
      >
        Activité terminée
      </Button>
    </Box>
  );
};