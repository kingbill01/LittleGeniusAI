import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  ManageAccounts as AdminIcon,
  School as SchoolIcon,
  Quiz as QuizIcon,
  Image as ImageIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  Translate as TranslateIcon,
  TouchApp as TouchAppIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../utils/translations';

// Import des sous-composants d'administration
import ContentManager from './admin/ContentManager';
import ActivityManager from './admin/ActivityManager';
import QuestionManager from './admin/QuestionManager';
import ImageManager from './admin/ImageManager';
import SystemSettings from './admin/SystemSettings';
import Analytics from './admin/Analytics';
import DragDropCreatorSimple from './admin/DragDropCreatorSimple';
import TranslationManager from './admin/TranslationManager';
import InteractiveActivityManager from './admin/InteractiveActivityManager';

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
  isAuthorized: boolean;
  onAuthorize: (password: string) => boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export const AdminPanel: React.FC<AdminPanelProps> = ({
  open,
  onClose,
  isAuthorized,
  onAuthorize,
}) => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  
  const [currentTab, setCurrentTab] = useState(0);
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

  useEffect(() => {
    if (open && !isAuthorized) {
      setPasswordDialog(true);
    }
  }, [open, isAuthorized]);

  const handlePasswordSubmit = () => {
    const success = onAuthorize(password);
    if (success) {
      setPasswordDialog(false);
      setPassword('');
      showNotification(t('admin.accessGranted'), 'success');
    } else {
      showNotification(t('admin.incorrectPassword'), 'error');
      setPassword('');
    }
  };

  const showNotification = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setNotification({ open: true, message, severity });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const adminTabs = [
    {
      label: t('admin.contentManager'),
      icon: <SchoolIcon />,
      description: t('admin.contentManager'),
    },
    {
      label: t('admin.activityManager'),
      icon: <QuizIcon />,
      description: t('admin.activityManager'),
    },
    {
      label: t('admin.questionManager'),
      icon: <QuizIcon />,
      description: t('admin.questionManager'),
    },
    {
      label: t('admin.images'),
      icon: <ImageIcon />,
      description: t('admin.imageManagement'),
    },
    {
      label: t('admin.systemSettings'),
      icon: <SettingsIcon />,
      description: t('admin.configuration'),
    },
    {
      label: t('admin.analytics'),
      icon: <AnalyticsIcon />,
      description: t('admin.analytics'),
    },
    {
      label: t('admin.translations'),
      icon: <TranslateIcon />,
      description: t('admin.translations'),
    },
    {
      label: t('admin.dragDrop'),
      icon: <TouchAppIcon />,
      description: t('admin.dragDrop'),
    },
    {
      label: t('admin.interactiveManager'),
      icon: <TouchAppIcon />,
      description: t('admin.interactiveManagement'),
    },
  ];

  if (!open) return null;

  return (
    <>
      {/* Dialog d'authentification */}
      <Dialog
        open={passwordDialog}
        onClose={() => {
          setPasswordDialog(false);
          onClose();
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AdminIcon sx={{ color: '#667eea' }} />
            <Typography variant="h6">
              {t('admin.adminAccess')}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {t('admin.enterPassword')}
          </Typography>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
            placeholder={t('admin.adminPassword')}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '2px solid #667eea',
              borderRadius: '8px',
              outline: 'none',
            }}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setPasswordDialog(false);
            onClose();
          }}>
            {t('action.cancel')}
          </Button>
          <Button
            onClick={handlePasswordSubmit}
            variant="contained"
            disabled={!password.trim()}
          >
            {t('admin.access')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Panel d'administration principal */}
      {isAuthorized && (
        <Dialog
          open={true}
          onClose={onClose}
          maxWidth="xl"
          fullWidth
          PaperProps={{
            sx: {
              height: '90vh',
              maxHeight: '90vh',
            },
          }}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AdminIcon sx={{ color: '#667eea', fontSize: '2rem' }} />
                <Box>
                  <Typography variant="h4" sx={{ fontFamily: '"Fredoka One", cursive', color: '#667eea' }}>
                    🔧 {t('admin.title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('admin.adminTitle')} - {t('admin.contentManager')}
                  </Typography>
                </Box>
              </Box>
              <Button
                onClick={onClose}
                variant="outlined"
                sx={{ minWidth: 120 }}
              >
                {t('action.back')}
              </Button>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', height: '100%' }}>
              {/* Sidebar avec onglets */}
              <Paper
                elevation={0}
                sx={{
                  width: 280,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: 0,
                  maxHeight: '80vh',
                  overflow: 'auto',
                }}
              >
                <Tabs
                  orientation="vertical"
                  value={currentTab}
                  onChange={handleTabChange}
                  sx={{
                    '& .MuiTab-root': {
                      alignItems: 'flex-start',
                      textAlign: 'left',
                      minHeight: 80,
                      color: 'rgba(255,255,255,0.7)',
                      '&.Mui-selected': {
                        color: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                      },
                    },
                  }}
                >
                  {adminTabs.map((tab, index) => (
                    <Tab
                      key={index}
                      icon={tab.icon}
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {tab.label}
                          </Typography>
                          <Typography variant="caption" sx={{ opacity: 0.8 }}>
                            {tab.description}
                          </Typography>
                        </Box>
                      }
                      iconPosition="start"
                    />
                  ))}
                </Tabs>
              </Paper>

              {/* Contenu principal */}
              <Box sx={{ flex: 1, overflow: 'auto', bgcolor: '#f8f9ff' }}>
                <TabPanel value={currentTab} index={0}>
                  <ContentManager onNotification={showNotification} />
                </TabPanel>
                <TabPanel value={currentTab} index={1}>
                  <ActivityManager onNotification={showNotification} />
                </TabPanel>
                <TabPanel value={currentTab} index={2}>
                  <QuestionManager onNotification={showNotification} />
                </TabPanel>
                <TabPanel value={currentTab} index={3}>
                  <ImageManager onNotification={showNotification} />
                </TabPanel>
                <TabPanel value={currentTab} index={4}>
                  <SystemSettings onNotification={showNotification} />
                </TabPanel>
                <TabPanel value={currentTab} index={5}>
                  <Analytics onNotification={showNotification} />
                </TabPanel>
                <TabPanel value={currentTab} index={6}>
                  <TranslationManager onNotification={showNotification} />
                </TabPanel>
                <TabPanel value={currentTab} index={7}>
                  <DragDropCreatorSimple />
                </TabPanel>
                <TabPanel value={currentTab} index={8}>
                  <InteractiveActivityManager onNotification={showNotification} />
                </TabPanel>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      )}

      {/* Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AdminPanel;