import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
} from '@mui/material';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAdminLabel } from '../../utils/adminTranslations';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  School as SchoolIcon,
  Quiz as QuizIcon,
  Timer as TimerIcon,
  Star as StarIcon,
  Group as GroupIcon,
  Assessment as AssessmentIcon,
  PlayArrow as PlayIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ScrollableContainer from '../ScrollableContainer';

interface AnalyticsProps {
  onNotification: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
}

interface ActivityStats {
  id: string;
  name: string;
  subject: string;
  totalSessions: number;
  averageScore: number;
  averageTime: number;
  completionRate: number;
  difficulty: string;
  ageGroup: string;
  trend: 'up' | 'down' | 'stable';
  lastWeekSessions: number;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  averageSessionTime: number;
  totalSessions: number;
  byAgeGroup: {
    '3-5': number;
    '6-8': number;
    '9-12': number;
  };
}

interface SubjectStats {
  subject: string;
  name: string;
  totalQuestions: number;
  averageScore: number;
  totalSessions: number;
  popularActivities: string[];
  weakPoints: string[];
}

interface SystemStats {
  totalActivities: number;
  activeActivities: number;
  totalQuestions: number;
  totalImages: number;
  systemUptime: string;
  errorRate: number;
  averageLoadTime: number;
}

const MOCK_ACTIVITY_STATS: ActivityStats[] = [
  {
    id: 'math-addition-basic',
    name: 'Addition Simple',
    subject: 'math',
    totalSessions: 156,
    averageScore: 85,
    averageTime: 120,
    completionRate: 92,
    difficulty: 'easy',
    ageGroup: '3-5',
    trend: 'up',
    lastWeekSessions: 45,
  },
  {
    id: 'lang-reading-story',
    name: 'Histoire Interactive',
    subject: 'language',
    totalSessions: 89,
    averageScore: 45,
    averageTime: 180,
    completionRate: 65,
    difficulty: 'medium',
    ageGroup: '6-8',
    trend: 'down',
    lastWeekSessions: 12,
  },
  {
    id: 'science-experiment-water',
    name: 'Expérience Eau',
    subject: 'science',
    totalSessions: 134,
    averageScore: 78,
    averageTime: 240,
    completionRate: 88,
    difficulty: 'hard',
    ageGroup: '9-12',
    trend: 'up',
    lastWeekSessions: 38,
  },
];

const MOCK_USER_STATS: UserStats = {
  totalUsers: 245,
  activeUsers: 78,
  newUsers: 12,
  averageSessionTime: 180,
  totalSessions: 1547,
  byAgeGroup: {
    '3-5': 89,
    '6-8': 95,
    '9-12': 61,
  },
};

const MOCK_SUBJECT_STATS: SubjectStats[] = [
  {
    subject: 'math',
    name: 'Mathématiques',
    totalQuestions: 245,
    averageScore: 82,
    totalSessions: 567,
    popularActivities: ['Addition Simple', 'Soustraction', 'Multiplication'],
    weakPoints: ['Division', 'Fractions'],
  },
  {
    subject: 'language',
    name: 'Langues',
    totalQuestions: 189,
    averageScore: 75,
    totalSessions: 423,
    popularActivities: ['Alphabet', 'Lecture', 'Vocabulaire'],
    weakPoints: ['Grammaire', 'Conjugaison'],
  },
  {
    subject: 'science',
    name: 'Sciences',
    totalQuestions: 167,
    averageScore: 78,
    totalSessions: 334,
    popularActivities: ['Expériences', 'Corps humain', 'Nature'],
    weakPoints: ['Physique', 'Chimie'],
  },
];

const MOCK_SYSTEM_STATS: SystemStats = {
  totalActivities: 45,
  activeActivities: 38,
  totalQuestions: 601,
  totalImages: 234,
  systemUptime: '99.8%',
  errorRate: 0.2,
  averageLoadTime: 1.2,
};

export const Analytics: React.FC<AnalyticsProps> = ({ onNotification }) => {
  const { currentLanguage } = useLanguage();
  const [activityStats] = useState<ActivityStats[]>(MOCK_ACTIVITY_STATS);
  const [userStats] = useState<UserStats>(MOCK_USER_STATS);
  const [subjectStats] = useState<SubjectStats[]>(MOCK_SUBJECT_STATS);
  const [systemStats] = useState<SystemStats>(MOCK_SYSTEM_STATS);
  const [timeFilter, setTimeFilter] = useState('7d');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#f44336';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUpIcon sx={{ color: '#4CAF50' }} />;
      case 'down': return <TrendingDownIcon sx={{ color: '#f44336' }} />;
      default: return <div>—</div>;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#f44336';
      default: return '#2196F3';
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#667eea' }}>
        📊 {getAdminLabel('analyticalDashboard', currentLanguage)}
      </Typography>

      {/* Filtres */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>{getAdminLabel('period', currentLanguage)}</InputLabel>
              <Select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                label="Période"
              >
                <MenuItem value="1d">Dernières 24h</MenuItem>
                <MenuItem value="7d">7 derniers jours</MenuItem>
                <MenuItem value="30d">30 derniers jours</MenuItem>
                <MenuItem value="90d">3 derniers mois</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>{getAdminLabel('subject', currentLanguage)}</InputLabel>
              <Select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                label={getAdminLabel('subject', currentLanguage)}
              >
                <MenuItem value="all">{getAdminLabel('allSubjects', currentLanguage)}</MenuItem>
                <MenuItem value="math">{getAdminLabel('mathematics', currentLanguage)}</MenuItem>
                <MenuItem value="language">{getAdminLabel('languages', currentLanguage)}</MenuItem>
                <MenuItem value="science">{getAdminLabel('sciences', currentLanguage)}</MenuItem>
                <MenuItem value="art">{getAdminLabel('art', currentLanguage)}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      <ScrollableContainer maxHeight="75vh" showScrollToTop={true}>
        {/* Statistiques générales */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card sx={{ bgcolor: '#4CAF50', color: 'white' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <GroupIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{userStats.activeUsers}</Typography>
                  <Typography variant="body2">{getAdminLabel('activeUsers', currentLanguage)}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    +{userStats.newUsers} nouveaux
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card sx={{ bgcolor: '#2196F3', color: 'white' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <PlayIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{userStats.totalSessions}</Typography>
                  <Typography variant="body2">{getAdminLabel('totalSessions', currentLanguage)}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {formatTime(userStats.averageSessionTime)} en moyenne
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card sx={{ bgcolor: '#FF9800', color: 'white' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <QuizIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{systemStats.totalQuestions}</Typography>
                  <Typography variant="body2">Questions</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {systemStats.totalActivities} activités
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card sx={{ bgcolor: '#9C27B0', color: 'white' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <AssessmentIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{systemStats.systemUptime}</Typography>
                  <Typography variant="body2">Disponibilité</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {systemStats.errorRate}% d'erreurs
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Répartition par groupe d'âge */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <SchoolIcon sx={{ mr: 1 }} />
                  Répartition par Âge
                </Typography>
                {Object.entries(userStats.byAgeGroup).map(([ageGroup, count]) => (
                  <Box key={ageGroup} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{ageGroup} ans</Typography>
                      <Typography variant="body2">{count} utilisateurs</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(count / userStats.totalUsers) * 100}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <StarIcon sx={{ mr: 1 }} />
                  Performance par Matière
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Matière</TableCell>
                        <TableCell align="right">Questions</TableCell>
                        <TableCell align="right">Sessions</TableCell>
                        <TableCell align="right">Score Moyen</TableCell>
                        <TableCell align="right">Progression</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subjectStats.map((subject) => (
                        <TableRow key={subject.subject}>
                          <TableCell component="th" scope="row">
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {subject.name}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">{subject.totalQuestions}</TableCell>
                          <TableCell align="right">{subject.totalSessions}</TableCell>
                          <TableCell align="right">
                            <Chip
                              label={`${subject.averageScore}%`}
                              size="small"
                              sx={{
                                bgcolor: getScoreColor(subject.averageScore),
                                color: 'white',
                                fontWeight: 'bold',
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TrendingUpIcon sx={{ color: '#4CAF50' }} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Top activités et points faibles */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <SuccessIcon sx={{ mr: 1, color: '#4CAF50' }} />
                  Activités Populaires
                </Typography>
                <List>
                  {activityStats
                    .sort((a, b) => b.totalSessions - a.totalSessions)
                    .slice(0, 5)
                    .map((activity, index) => (
                      <React.Fragment key={activity.id}>
                        <ListItem>
                          <ListItemIcon>
                            <Typography
                              variant="h6"
                              sx={{
                                bgcolor: '#4CAF50',
                                color: 'white',
                                borderRadius: '50%',
                                width: 24,
                                height: 24,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                              }}
                            >
                              {index + 1}
                            </Typography>
                          </ListItemIcon>
                          <ListItemText
                            primary={activity.name}
                            secondary={
                              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                <Chip label={`${activity.totalSessions} sessions`} size="small" />
                                <Chip
                                  label={activity.difficulty}
                                  size="small"
                                  sx={{
                                    bgcolor: getDifficultyColor(activity.difficulty),
                                    color: 'white',
                                  }}
                                />
                                <Chip label={activity.ageGroup} size="small" variant="outlined" />
                              </Box>
                            }
                          />
                          <Box sx={{ textAlign: 'right' }}>
                            {getTrendIcon(activity.trend)}
                            <Typography variant="body2" color="text.secondary">
                              {activity.averageScore}%
                            </Typography>
                          </Box>
                        </ListItem>
                        {index < 4 && <Divider />}
                      </React.Fragment>
                    ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <ErrorIcon sx={{ mr: 1, color: '#FF9800' }} />
                  Points d'Amélioration
                </Typography>
                <List>
                  {subjectStats.map((subject, index) => (
                    <React.Fragment key={subject.subject}>
                      <ListItem>
                        <ListItemText
                          primary={subject.name}
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Difficultés identifiées:
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                {subject.weakPoints.map((point) => (
                                  <Chip
                                    key={point}
                                    label={point}
                                    size="small"
                                    color="warning"
                                    variant="outlined"
                                  />
                                ))}
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < subjectStats.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Performances détaillées des activités */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <TimerIcon sx={{ mr: 1 }} />
              Performance Détaillée des Activités
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Activité</TableCell>
                    <TableCell>Matière</TableCell>
                    <TableCell align="right">Sessions</TableCell>
                    <TableCell align="right">Score Moyen</TableCell>
                    <TableCell align="right">Temps Moyen</TableCell>
                    <TableCell align="right">Taux de Réussite</TableCell>
                    <TableCell align="right">Tendance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activityStats.map((activity) => (
                    <TableRow key={activity.id} hover>
                      <TableCell component="th" scope="row">
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {activity.name}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                            <Chip
                              label={activity.difficulty}
                              size="small"
                              sx={{
                                bgcolor: getDifficultyColor(activity.difficulty),
                                color: 'white',
                                fontSize: '0.7rem',
                              }}
                            />
                            <Chip label={activity.ageGroup} size="small" variant="outlined" />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={activity.subject} variant="outlined" size="small" />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {activity.totalSessions}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          (+{activity.lastWeekSessions} cette semaine)
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${activity.averageScore}%`}
                          size="small"
                          sx={{
                            bgcolor: getScoreColor(activity.averageScore),
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">
                          {formatTime(activity.averageTime)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <LinearProgress
                            variant="determinate"
                            value={activity.completionRate}
                            sx={{ width: 60, mr: 1 }}
                          />
                          <Typography variant="body2">
                            {activity.completionRate}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {getTrendIcon(activity.trend)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Alertes et recommendations */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <ScheduleIcon sx={{ mr: 1 }} />
              {getAdminLabel('recommendations', currentLanguage)}
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              {getAdminLabel('interactive_story_low_success', currentLanguage)}
            </Alert>
            <Alert severity="success" sx={{ mb: 2 }}>
              {getAdminLabel('simple_addition_excellent', currentLanguage)}
            </Alert>
            <Alert severity="warning">
              {getAdminLabel('load_time_warning', currentLanguage).replace('{loadTime}', systemStats.averageLoadTime.toString())}
            </Alert>
          </CardContent>
        </Card>
      </ScrollableContainer>
    </Box>
  );
};

export default Analytics;