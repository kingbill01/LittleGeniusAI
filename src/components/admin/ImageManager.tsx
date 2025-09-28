import React, { useState, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  LinearProgress,
  Alert,
  Tooltip,
  Badge,
  Fab,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  Visibility as PreviewIcon,
  Add as AddIcon,
  Folder as FolderIcon,
  Image as ImageIcon,
  VideoLibrary as VideoIcon,
  AudioFile as AudioIcon,
  InsertDriveFile as FileIcon,
  FilterList as FilterIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ScrollableContainer from '../ScrollableContainer';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAdminLabel } from '../../utils/adminTranslations';

interface ImageManagerProps {
  onNotification: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
}

interface MediaFile {
  id: string;
  name: string;
  originalName: string;
  type: 'image' | 'video' | 'audio' | 'document';
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploadDate: string;
  lastModified: string;
  tags: string[];
  description: string;
  subject: 'math' | 'language' | 'science' | 'art' | 'computing' | 'civic' | 'hygiene' | 'anatomy' | 'general';
  ageGroup: '3-5' | '6-8' | '9-12' | 'all';
  usage: {
    timesUsed: number;
    activities: string[];
  };
  alt: { fr: string; en: string; cs: string };
  resolution?: { width: number; height: number };
  duration?: number; // pour vidéos/audio en secondes
}

const MOCK_MEDIA_FILES: MediaFile[] = [
  {
    id: 'img-001',
    name: 'addition-illustration.png',
    originalName: 'Addition avec pommes.png',
    type: 'image',
    mimeType: 'image/png',
    size: 245760, // 240KB
    url: '/assets/images/math/addition-illustration.png',
    thumbnailUrl: '/assets/images/math/addition-illustration-thumb.png',
    uploadDate: '2024-01-15T10:30:00Z',
    lastModified: '2024-01-15T10:30:00Z',
    tags: ['addition', 'pommes', 'mathématiques', 'illustration'],
    description: 'Illustration d\'addition avec des pommes pour les jeunes enfants',
    subject: 'math',
    ageGroup: '3-5',
    usage: {
      timesUsed: 25,
      activities: ['math-addition-basic', 'counting-fruits'],
    },
    alt: {
      fr: 'Illustration montrant 2 pommes + 3 pommes = 5 pommes',
      en: 'Illustration showing 2 apples + 3 apples = 5 apples',
      cs: 'Ilustrace ukazující 2 jablka + 3 jablka = 5 jablek',
    },
    resolution: { width: 800, height: 600 },
  },
  {
    id: 'vid-001',
    name: 'water-cycle-animation.mp4',
    originalName: 'Cycle de l\'eau - animation.mp4',
    type: 'video',
    mimeType: 'video/mp4',
    size: 15728640, // 15MB
    url: '/assets/videos/science/water-cycle-animation.mp4',
    thumbnailUrl: '/assets/videos/science/water-cycle-thumb.jpg',
    uploadDate: '2024-01-10T14:20:00Z',
    lastModified: '2024-01-10T14:20:00Z',
    tags: ['eau', 'cycle', 'évaporation', 'précipitation', 'sciences'],
    description: 'Animation expliquant le cycle de l\'eau de manière simple',
    subject: 'science',
    ageGroup: '6-8',
    usage: {
      timesUsed: 18,
      activities: ['water-cycle-quiz', 'weather-learning'],
    },
    alt: {
      fr: 'Animation du cycle de l\'eau montrant évaporation, condensation et précipitation',
      en: 'Water cycle animation showing evaporation, condensation and precipitation',
      cs: 'Animace koloběhu vody ukazující odpařování, kondenzaci a srážky',
    },
    resolution: { width: 1280, height: 720 },
    duration: 120, // 2 minutes
  },
  {
    id: 'audio-001',
    name: 'french-pronunciation.mp3',
    originalName: 'Prononciation française - alphabet.mp3',
    type: 'audio',
    mimeType: 'audio/mpeg',
    size: 2097152, // 2MB
    url: '/assets/audio/language/french-pronunciation.mp3',
    uploadDate: '2024-01-12T09:15:00Z',
    lastModified: '2024-01-12T09:15:00Z',
    tags: ['français', 'prononciation', 'alphabet', 'langue'],
    description: 'Enregistrement de la prononciation correcte de l\'alphabet français',
    subject: 'language',
    ageGroup: 'all',
    usage: {
      timesUsed: 42,
      activities: ['french-alphabet', 'pronunciation-practice'],
    },
    alt: {
      fr: 'Enregistrement audio de l\'alphabet français',
      en: 'French alphabet audio recording',
      cs: 'Francouzská abeceda - zvukový záznam',
    },
    duration: 45, // 45 secondes
  },
];

export const ImageManager: React.FC<ImageManagerProps> = ({ onNotification }) => {
  const { currentLanguage } = useLanguage();
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(MOCK_MEDIA_FILES);
  const [filteredFiles, setFilteredFiles] = useState<MediaFile[]>(MOCK_MEDIA_FILES);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingFile, setEditingFile] = useState<MediaFile | null>(null);
  const [previewFile, setPreviewFile] = useState<MediaFile | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [filters, setFilters] = useState({
    type: '',
    subject: '',
    ageGroup: '',
    search: '',
  });

  const [uploadForm, setUploadForm] = useState({
    description: '',
    subject: 'general' as MediaFile['subject'],
    ageGroup: 'all' as MediaFile['ageGroup'],
    tags: '',
    alt: { fr: '', en: '', cs: '' },
  });

  React.useEffect(() => {
    applyFilters();
  }, [mediaFiles, filters]);

  const applyFilters = () => {
    let filtered = [...mediaFiles];

    if (filters.type) {
      filtered = filtered.filter(file => file.type === filters.type);
    }
    if (filters.subject) {
      filtered = filtered.filter(file => file.subject === filters.subject);
    }
    if (filters.ageGroup) {
      filtered = filtered.filter(file => file.ageGroup === filters.ageGroup || file.ageGroup === 'all');
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(file =>
        file.name.toLowerCase().includes(searchLower) ||
        file.description.toLowerCase().includes(searchLower) ||
        file.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    setFilteredFiles(filtered);
  };

  const handleFileUpload = useCallback(async (files: FileList) => {
    if (!files || files.length === 0) return;

    setIsUploadOpen(true);
    setUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Simulation de l'upload
        for (let progress = 0; progress <= 100; progress += 10) {
          setUploadProgress(progress);
          await new Promise(resolve => setTimeout(resolve, 50));
        }

        const newMediaFile: MediaFile = {
          id: `file-${Date.now()}-${i}`,
          name: file.name.toLowerCase().replace(/\s+/g, '-'),
          originalName: file.name,
          type: getFileType(file.type),
          mimeType: file.type,
          size: file.size,
          url: URL.createObjectURL(file), // En prod, ce serait l'URL du serveur
          uploadDate: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          description: uploadForm.description,
          subject: uploadForm.subject,
          ageGroup: uploadForm.ageGroup,
          usage: {
            timesUsed: 0,
            activities: [],
          },
          alt: uploadForm.alt,
        };

        // Ajouter les métadonnées spécifiques au type
        if (file.type.startsWith('image/')) {
          // En production, on extrairait les vraies dimensions
          newMediaFile.resolution = { width: 800, height: 600 };
        }

        setMediaFiles(prev => [...prev, newMediaFile]);
      }

      onNotification(`${files.length} fichier(s) téléchargé(s) avec succès`, 'success');
      setUploadForm({
        description: '',
        subject: 'general',
        ageGroup: 'all',
        tags: '',
        alt: { fr: '', en: '', cs: '' },
      });
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      onNotification('Erreur lors du téléchargement', 'error');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setIsUploadOpen(false);
    }
  }, [uploadForm, onNotification]);

  const getFileType = (mimeType: string): MediaFile['type'] => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    return 'document';
  };

  const handleDeleteFile = (fileId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      setMediaFiles(prev => prev.filter(file => file.id !== fileId));
      onNotification('Fichier supprimé avec succès', 'success');
    }
  };

  const openEditDialog = (file: MediaFile) => {
    setEditingFile(file);
    setUploadForm({
      description: file.description,
      subject: file.subject,
      ageGroup: file.ageGroup,
      tags: file.tags.join(', '),
      alt: file.alt,
    });
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingFile) return;

    const updatedFile: MediaFile = {
      ...editingFile,
      description: uploadForm.description,
      subject: uploadForm.subject,
      ageGroup: uploadForm.ageGroup,
      tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      alt: uploadForm.alt,
      lastModified: new Date().toISOString(),
    };

    setMediaFiles(prev => prev.map(file => 
      file.id === editingFile.id ? updatedFile : file
    ));

    onNotification('Fichier mis à jour avec succès', 'success');
    setIsEditOpen(false);
    setEditingFile(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getFileIcon = (type: MediaFile['type']) => {
    switch (type) {
      case 'image': return <ImageIcon />;
      case 'video': return <VideoIcon />;
      case 'audio': return <AudioIcon />;
      default: return <FileIcon />;
    }
  };

  const getTotalUsage = () => mediaFiles.reduce((acc, file) => acc + file.usage.timesUsed, 0);
  const getTotalSize = () => mediaFiles.reduce((acc, file) => acc + file.size, 0);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#667eea' }}>
        🖼️ Gestionnaire d'Images et Médias
      </Typography>

      {/* Statistiques rapides */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#4CAF50', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4">{mediaFiles.filter(f => f.type === 'image').length}</Typography>
              <Typography variant="body2">Images</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#2196F3', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4">{mediaFiles.filter(f => f.type === 'video').length}</Typography>
              <Typography variant="body2">Vidéos</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#FF9800', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4">{getTotalUsage()}</Typography>
              <Typography variant="body2">Utilisations</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#9C27B0', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4">{formatFileSize(getTotalSize())}</Typography>
              <Typography variant="body2">Espace utilisé</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Barre d'outils et filtres */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              startIcon={<UploadIcon />}
              onClick={() => fileInputRef.current?.click()}
              fullWidth
              sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              Télécharger
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              multiple
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
              style={{ display: 'none' }}
            />
          </Grid>
          
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label={getAdminLabel('search', currentLanguage)}
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Type</InputLabel>
              <Select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                label={getAdminLabel('type', currentLanguage)}
              >
                <MenuItem value="">Tous</MenuItem>
                <MenuItem value="image">Images</MenuItem>
                <MenuItem value="video">Vidéos</MenuItem>
                <MenuItem value="audio">Audio</MenuItem>
                <MenuItem value="document">Documents</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Matière</InputLabel>
              <Select
                value={filters.subject}
                onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                label={getAdminLabel('subject', currentLanguage)}
              >
                <MenuItem value="">Toutes</MenuItem>
                <MenuItem value="math">Math</MenuItem>
                <MenuItem value="language">Langues</MenuItem>
                <MenuItem value="science">Sciences</MenuItem>
                <MenuItem value="art">Art</MenuItem>
                <MenuItem value="computing">Info</MenuItem>
                <MenuItem value="general">Général</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Âge</InputLabel>
              <Select
                value={filters.ageGroup}
                onChange={(e) => setFilters({ ...filters, ageGroup: e.target.value })}
                label={getAdminLabel('age', currentLanguage)}
              >
                <MenuItem value="">Tous</MenuItem>
                <MenuItem value="3-5">3-5 ans</MenuItem>
                <MenuItem value="6-8">6-8 ans</MenuItem>
                <MenuItem value="9-12">9-12 ans</MenuItem>
                <MenuItem value="all">Tous âges</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                {filteredFiles.length} fichier(s)
              </Typography>
              <Box>
                <IconButton
                  onClick={() => setViewMode('grid')}
                  color={viewMode === 'grid' ? 'primary' : 'default'}
                  size="small"
                >
                  <GridViewIcon />
                </IconButton>
                <IconButton
                  onClick={() => setViewMode('list')}
                  color={viewMode === 'list' ? 'primary' : 'default'}
                  size="small"
                >
                  <ViewListIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Liste des fichiers */}
      <ScrollableContainer maxHeight="65vh" showScrollToTop={true}>
        {viewMode === 'grid' ? (
          <ImageList variant="masonry" cols={4} gap={16}>
            {filteredFiles.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index }}
              >
                <ImageListItem>
                  <Card
                    sx={{
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <CardMedia
                      sx={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#f5f5f5',
                        position: 'relative',
                      }}
                    >
                      {file.type === 'image' ? (
                        <img
                          src={file.thumbnailUrl || file.url}
                          alt={file.alt.fr}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <Box sx={{ textAlign: 'center' }}>
                          {getFileIcon(file.type)}
                          <Typography variant="h4" color="text.secondary" sx={{ mt: 1 }}>
                            {file.type.toUpperCase()}
                          </Typography>
                        </Box>
                      )}
                      <Badge
                        badgeContent={file.usage.timesUsed}
                        color="primary"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                        }}
                      />
                    </CardMedia>

                    <CardContent sx={{ pb: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 'bold',
                          mb: 1,
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                        }}
                      >
                        {file.originalName}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 1,
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                        }}
                      >
                        {file.description}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                        <Chip label={file.subject} size="small" variant="outlined" />
                        <Chip label={file.ageGroup} size="small" variant="outlined" />
                        <Chip label={formatFileSize(file.size)} size="small" variant="outlined" />
                        {file.duration && (
                          <Chip label={formatDuration(file.duration)} size="small" variant="outlined" />
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {file.tags.slice(0, 3).map(tag => (
                          <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
                        ))}
                        {file.tags.length > 3 && (
                          <Chip label={`+${file.tags.length - 3}`} size="small" variant="outlined" />
                        )}
                      </Box>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                      <Box>
                        <Tooltip title="Prévisualiser">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setPreviewFile(file);
                              setIsPreviewOpen(true);
                            }}
                            sx={{ color: '#2196F3' }}
                          >
                            <PreviewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Modifier">
                          <IconButton
                            size="small"
                            onClick={() => openEditDialog(file)}
                            sx={{ color: '#FF9800' }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Télécharger">
                          <IconButton
                            size="small"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = file.url;
                              link.download = file.originalName;
                              link.click();
                            }}
                            sx={{ color: '#4CAF50' }}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Supprimer">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteFile(file.id)}
                            sx={{ color: '#f44336' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </CardActions>
                  </Card>
                </ImageListItem>
              </motion.div>
            ))}
          </ImageList>
        ) : (
          // Vue liste
          <Grid container spacing={1}>
            {filteredFiles.map((file, index) => (
              <Grid item xs={12} key={file.id}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.02 * index }}
                >
                  <Card
                    sx={{
                      '&:hover': {
                        boxShadow: 2,
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <CardContent sx={{ py: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={1}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {getFileIcon(file.type)}
                          </Box>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                            {file.originalName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {file.mimeType}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant="body2">
                            {file.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            <Chip label={file.subject} size="small" variant="outlined" />
                            <Chip label={file.ageGroup} size="small" variant="outlined" />
                          </Box>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant="body2">
                            {formatFileSize(file.size)}
                          </Typography>
                          {file.duration && (
                            <Typography variant="caption" color="text.secondary">
                              {formatDuration(file.duration)}
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="body2" color="text.secondary">
                            {file.usage.timesUsed} utilisations
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton
                              size="small"
                              onClick={() => {
                                setPreviewFile(file);
                                setIsPreviewOpen(true);
                              }}
                              sx={{ color: '#2196F3' }}
                            >
                              <PreviewIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => openEditDialog(file)}
                              sx={{ color: '#FF9800' }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteFile(file.id)}
                              sx={{ color: '#f44336' }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        {filteredFiles.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Aucun fichier trouvé
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Essayez de modifier vos filtres ou téléchargez de nouveaux fichiers
            </Typography>
          </Box>
        )}
      </ScrollableContainer>

      {/* Dialog d'upload avec progress */}
      <Dialog open={isUploadOpen} maxWidth="sm" fullWidth>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Téléchargement en cours...
            </Typography>
            <LinearProgress variant="determinate" value={uploadProgress} sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              {uploadProgress}% terminé
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Dialog d'édition */}
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Modifier le fichier</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={getAdminLabel('description', currentLanguage)}
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Matière</InputLabel>
                  <Select
                    value={uploadForm.subject}
                    onChange={(e) => setUploadForm({ ...uploadForm, subject: e.target.value as any })}
                    label={getAdminLabel('subject', currentLanguage)}
                  >
                    <MenuItem value="general">Général</MenuItem>
                    <MenuItem value="math">Mathématiques</MenuItem>
                    <MenuItem value="language">Langues</MenuItem>
                    <MenuItem value="science">Sciences</MenuItem>
                    <MenuItem value="art">Art</MenuItem>
                    <MenuItem value="computing">Informatique</MenuItem>
                    <MenuItem value="civic">Civique</MenuItem>
                    <MenuItem value="hygiene">Hygiène</MenuItem>
                    <MenuItem value="anatomy">Anatomie</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Groupe d'âge</InputLabel>
                  <Select
                    value={uploadForm.ageGroup}
                    onChange={(e) => setUploadForm({ ...uploadForm, ageGroup: e.target.value as any })}
                    label={getAdminLabel('ageGroup', currentLanguage)}
                  >
                    <MenuItem value="all">Tous âges</MenuItem>
                    <MenuItem value="3-5">3-5 ans</MenuItem>
                    <MenuItem value="6-8">6-8 ans</MenuItem>
                    <MenuItem value="9-12">9-12 ans</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tags (séparés par des virgules)"
                  value={uploadForm.tags}
                  onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                  placeholder="mathématiques, addition, illustration"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2 }}>Texte alternatif</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Alt (Français)"
                      value={uploadForm.alt.fr}
                      onChange={(e) => setUploadForm({
                        ...uploadForm,
                        alt: { ...uploadForm.alt, fr: e.target.value }
                      })}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Alt (English)"
                      value={uploadForm.alt.en}
                      onChange={(e) => setUploadForm({
                        ...uploadForm,
                        alt: { ...uploadForm.alt, en: e.target.value }
                      })}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Alt (Čeština)"
                      value={uploadForm.alt.cs}
                      onChange={(e) => setUploadForm({
                        ...uploadForm,
                        alt: { ...uploadForm.alt, cs: e.target.value }
                      })}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditOpen(false)}>Annuler</Button>
          <Button onClick={handleSaveEdit} variant="contained">Sauvegarder</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de prévisualisation */}
      <Dialog
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Prévisualisation - {previewFile?.originalName}</DialogTitle>
        <DialogContent>
          {previewFile && (
            <Box>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                {previewFile.type === 'image' ? (
                  <img
                    src={previewFile.url}
                    alt={previewFile.alt.fr}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '400px',
                      objectFit: 'contain',
                    }}
                  />
                ) : previewFile.type === 'video' ? (
                  <video
                    src={previewFile.url}
                    controls
                    style={{
                      maxWidth: '100%',
                      maxHeight: '400px',
                    }}
                  />
                ) : previewFile.type === 'audio' ? (
                  <audio src={previewFile.url} controls style={{ width: '100%' }} />
                ) : (
                  <Box sx={{ p: 4, textAlign: 'center' }}>
                    {getFileIcon(previewFile.type)}
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      Aperçu non disponible pour ce type de fichier
                    </Typography>
                  </Box>
                )}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Description:</strong> {previewFile.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Taille:</strong> {formatFileSize(previewFile.size)}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Type:</strong> {previewFile.mimeType}
                  </Typography>
                  {previewFile.resolution && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Résolution:</strong> {previewFile.resolution.width} × {previewFile.resolution.height}
                    </Typography>
                  )}
                  {previewFile.duration && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Durée:</strong> {formatDuration(previewFile.duration)}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Matière:</strong> {previewFile.subject}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Groupe d'âge:</strong> {previewFile.ageGroup}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Utilisations:</strong> {previewFile.usage.timesUsed}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Téléchargé le:</strong> {new Date(previewFile.uploadDate).toLocaleDateString('fr-FR')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Tags:</strong>
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {previewFile.tags.map(tag => (
                      <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPreviewOpen(false)}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImageManager;